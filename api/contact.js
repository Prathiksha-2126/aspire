import nodemailer from "nodemailer";

function buildEmailHtml({ fullName, companyName, email, phone, message }) {
  const SITE_URL = "https://aspirecloud.in";
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
          <p style="margin:0 0 8px;font-size:16px;font-weight:700;color:#111827;">💬 Message</p>
          <p style="margin:0 0 10px;font-size:14px;color:#1f2937;line-height:1.6;">The following message has been submitted by the client:</p>
          <div style="background:#ffffff;border:1px solid #e5e7eb;border-radius:6px;padding:14px 16px;">
            <p style="margin:0;font-size:14px;color:#111827;line-height:1.7;white-space:pre-wrap;">${message}</p>
          </div>
        </td></tr>
        <tr><td style="padding:22px 0 0;">
          <div style="background:#f0faf0;border-left:4px solid #0a9e4a;border-radius:4px;padding:14px 18px;">
            <p style="margin:0 0 8px;font-size:14px;font-weight:700;color:#111827;">⏰ Next Steps:</p>
            <ul style="margin:0;padding-left:20px;font-size:14px;color:#111827;line-height:1.7;">
              <li>Review the enquiry details above</li>
              <li>Reply directly to the client — <strong>${email}</strong></li>
              <li>Verify contact details and requirements</li>
              <li>Follow up within 24 hours for best conversion</li>
            </ul>
          </div>
        </td></tr>
        <tr><td style="padding:18px 0 0;text-align:center;">
          <a href="mailto:${email}?subject=Re:%20Your%20AspiRE%20Enquiry&body=Hi%20${encodeURIComponent(fullName)},%0A%0AThank%20you%20for%20contacting%20AspiRE.%0A%0A" style="font-size:14px;color:#0a58ca;text-decoration:underline;">🔍 Reply to Client</a>
        </td></tr>
        <tr><td style="padding:28px 0 0;">
          <img src="${logoUrl}" alt="AspiRE — Digitising Real Estate" style="height:32px;width:auto;object-fit:contain;display:block;margin-bottom:2px;" />
          <p style="margin:0;font-size:11px;color:#6b7280;">Digitising Real Estate</p>
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

    // SMTP config — set these in Vercel Environment Variables
    // For Gmail: SMTP_HOST=smtp.gmail.com, SMTP_PORT=465, SMTP_USER=uttara.2904@gmail.com, SMTP_PASS=app_password
    // For custom domain (recommended to avoid "via gmail.com"): use your domain SMTP
    const host = process.env.SMTP_HOST || process.env.EMAIL_HOST;
    const user = process.env.SMTP_USER || process.env.EMAIL_USER;
    const pass = process.env.SMTP_PASS || process.env.EMAIL_PASS;
    const to = process.env.CONTACT_TO || "coppercodesconsulting@gmail.com";
    // Fallback: if SMTP not configured, log and return success (for preview) — replace with real credentials in production
    if (!host || !user || !pass) {
      console.log("CONTACT FORM (no SMTP configured) — would send:", { from: `${fullName} <${email}>`, to, subject: `New Contact Enquiry from ${fullName} — AspiRE Website` });
      // Still return success so UI doesn't block; configure SMTP in Vercel to actually deliver
      return res.status(200).json({ ok: true, preview: true, html, text });
    }

    const port = Number(process.env.SMTP_PORT || 465);
    const secure = port === 465;

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });

    // From must be YOUR authenticated Gmail address — Gmail SMTP rejects/rewrites
    // messages where the From header doesn't match the authenticated account.
    // The visitor's name still shows as the display name, and Reply-To routes
    // any reply straight to them.
    const info = await transporter.sendMail({
      from: `"${fullName} (via AspiRE website)" <${user}>`,
      to,
      replyTo: email,
      subject: `New Contact Enquiry from ${fullName} — AspiRE Website`,
      text,
      html,
      headers: {
        "X-Mailer": "AspiRE Contact Form",
        "X-Contact-Email": email,
      },
    });

    return res.status(200).json({ ok: true, id: info.messageId });
  } catch (err) {
    console.error("contact api error", err);
    return res.status(500).json({ error: err.message || "Failed to send email" });
  }
}