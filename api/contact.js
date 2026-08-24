function buildEmailHtml({ fullName, companyName, email, phone, message }) {
  // Uses Vercel's auto-provided production URL, which is always live the moment
  // you deploy — no dependency on aspirecloud.in being connected/verified yet.
  // Falls back to the custom domain once that's confirmed working.
  const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://aspirecloud.in";
  const logoUrl  = `${SITE_URL}/images/Black%20AspiRE%20Logo.png`;
  const year = new Date().getFullYear();
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>New Contact Enquiry — AspiRE</title></head>
<body style="margin:0;padding:0;background:#ffffff;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;padding:24px 16px;">
    <tr><td>
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;width:100%;">
        <tr><td style="padding:12px 0 8px;">
          <p style="margin:0;font-size:22px;font-weight:700;color:#111827;line-height:1.3;">📋 New Contact Enquiry Received</p>
        </td></tr>
        <tr><td style="padding:12px 0 0;">
          <p style="margin:0;font-size:14px;color:#1f2937;line-height:1.6;">A new enquiry has been submitted via the AspiRE website contact form and requires your attention.</p>
        </td></tr>
        <tr><td style="padding:18px 0 0;">
          <p style="margin:0 0 6px;font-size:14px;color:#111827;"><strong>Full Name:</strong> ${fullName}</p>
          <p style="margin:0 0 6px;font-size:14px;color:#111827;"><strong>Company Name:</strong> ${companyName || "—"}</p>
          <p style="margin:0 0 6px;font-size:14px;color:#111827;"><strong>Email:</strong> <a href="mailto:${email}" style="color:#0f5132;text-decoration:none;">${email}</a></p>
          <p style="margin:0;font-size:14px;color:#111827;"><strong>Phone:</strong> ${phone || "—"}</p>
        </td></tr>
        <tr><td style="padding:22px 0 0;">
          <div style="background:#f0faf0;border-left:4px solid #0a9e4a;border-radius:4px;padding:14px 18px;">
            <p style="margin:0 0 10px;font-size:16px;font-weight:700;color:#111827;">💬 Message</p>
            <p style="margin:0;font-size:14px;color:#111827;line-height:1.7;white-space:pre-wrap;">${message}</p>
          </div>
        </td></tr>
        <tr><td style="padding:18px 0 0;text-align:center;">
          <a href="mailto:${email}?subject=Re:%20Your%20AspiRE%20Enquiry&body=Hi%20${encodeURIComponent(fullName)},%0A%0AThank%20you%20for%20contacting%20AspiRE.%0A%0A" style="font-size:14px;color:#0a58ca;text-decoration:underline;">🔍 Reply to Client</a>
        </td></tr>
        <tr><td style="padding:28px 0 0;">
          <img src="${logoUrl}" alt="AspiRE — Digitising Real Estate" style="height:48px;width:auto;object-fit:contain;display:block;" />
        </td></tr>
        <tr><td style="padding:16px 0 0;">
          <p style="margin:0 0 8px;font-size:12px;color:#374151;">© ${year} AspiRE. All rights reserved.</p>
          <p style="margin:0;font-size:12px;color:#6b7280;">This is an automated message. Please do not reply to this email.</p>
          <p style="margin:8px 0 0;font-size:12px;color:#6b7280;">Enquiry sent directly from <strong>${fullName} &lt;${email}&gt;</strong> via the AspiRE Contact Us form.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
  `.trim();
}

export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const { fullName, companyName, email, phone, message } = body || {};

    if (!fullName || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "Invalid email" });
    }

    const html = buildEmailHtml({ fullName, companyName, email, phone, message });
    const text = `New enquiry from ${fullName}

Client Details
Full Name    : ${fullName}
Company      : ${companyName || "—"}
Email        : ${email}
Phone        : ${phone || "—"}

Message
${message}

Reply directly to: ${email}

--
AspiRE — Digitising Real Estate
© ${new Date().getFullYear()} AspiRE. All rights reserved.
This is an automated message. Please do not reply to this email.
Enquiry sent directly from ${fullName} <${email}> via AspiRE Contact Us form.`;

    // ── Resend (HTTPS email API) — replaces SMTP/nodemailer, which Vercel's
    // serverless functions block on the raw SMTP ports (25/465/587). Resend
    // sends over plain HTTPS, so it works reliably from serverless functions.
    //
    // Setup required in Vercel → Settings → Environment Variables:
    //   RESEND_API_KEY   — from https://resend.com/api-keys
    //   RESEND_FROM      — e.g. "AspiRE Website <enquiries@aspirecloud.in>"
    //                      (must be on a domain verified in Resend; use
    //                      "onboarding@resend.dev" only for initial testing)
    //   CONTACT_TO       — inbox that should receive enquiries
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const RESEND_FROM = process.env.RESEND_FROM || "AspiRE Website <onboarding@resend.dev>";
    const to = process.env.CONTACT_TO || "coppercodesconsulting@gmail.com";

    if (!RESEND_API_KEY) {
      console.log("CONTACT FORM (no RESEND_API_KEY configured) — would send:", {
        from: RESEND_FROM,
        to,
        subject: `New Contact Enquiry from ${fullName} — AspiRE Website`,
      });
      return res.status(200).json({ ok: true, preview: true, html, text });
    }

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: RESEND_FROM,
        to: [to],
        reply_to: email,
        subject: `New Contact Enquiry from ${fullName} — AspiRE Website`,
        html,
        text,
      }),
    });

    const resendData = await resendRes.json().catch(() => ({}));

    if (!resendRes.ok) {
      console.error("Resend API error:", resendRes.status, resendData);
      return res.status(500).json({ error: resendData?.message || "Failed to send email" });
    }

    return res.status(200).json({ ok: true, id: resendData?.id });
  } catch (err) {
    console.error("contact api error", err);
    return res.status(500).json({ error: err.message || "Failed to send email" });
  }
}