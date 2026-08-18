import { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import { Phone } from "lucide-react";

emailjs.init("Gho27hYrSo9sPZvqm");

/* ─── HTML email builder ───────────────────────────────────────────────── */
function buildEmailHtml({ fullName, companyName, email, phone, message }) {
  // Absolute URL to the Black AspiRE logo hosted on the live domain.
  // EmailJS strips relative paths, so we use a hosted CDN-friendly URL.
  // Update SITE_URL to your production domain once deployed.
  const SITE_URL = "https://aspirecloud.in";
  const logoUrl  = `${SITE_URL}/images/Black%20AspiRE%20Logo.png`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Contact Form Submission — AspiRE</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);max-width:600px;width:100%;">

        <!-- Header bar -->
        <tr>
          <td style="background:#2C6035;padding:20px 32px;">
            <p style="margin:0;font-size:22px;font-weight:700;color:#ffffff;letter-spacing:0.5px;">
              📋 New Contact Form Submission
            </p>
          </td>
        </tr>

        <!-- Intro -->
        <tr>
          <td style="padding:28px 32px 0;">
            <p style="margin:0;font-size:14px;color:#444444;line-height:1.7;">
              A new enquiry has been submitted via the <strong>AspiRE website contact form</strong>.
              Please find the full client details below and follow up at your earliest convenience.
            </p>
          </td>
        </tr>

        <!-- Client details card -->
        <tr>
          <td style="padding:24px 32px 0;">
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
              <tr style="background:#f9fafb;">
                <td colspan="2" style="padding:12px 18px;border-bottom:1px solid #e5e7eb;">
                  <p style="margin:0;font-size:13px;font-weight:700;color:#2C6035;letter-spacing:0.8px;text-transform:uppercase;">
                    👤 Client Details
                  </p>
                </td>
              </tr>
              <tr>
                <td style="padding:11px 18px;font-size:13px;color:#6b7280;font-weight:600;width:140px;border-bottom:1px solid #f3f4f6;">Full Name</td>
                <td style="padding:11px 18px;font-size:13px;color:#111827;font-weight:500;border-bottom:1px solid #f3f4f6;">${fullName}</td>
              </tr>
              <tr style="background:#fafafa;">
                <td style="padding:11px 18px;font-size:13px;color:#6b7280;font-weight:600;border-bottom:1px solid #f3f4f6;">Company</td>
                <td style="padding:11px 18px;font-size:13px;color:#111827;font-weight:500;border-bottom:1px solid #f3f4f6;">${companyName || "—"}</td>
              </tr>
              <tr>
                <td style="padding:11px 18px;font-size:13px;color:#6b7280;font-weight:600;border-bottom:1px solid #f3f4f6;">Email</td>
                <td style="padding:11px 18px;font-size:13px;border-bottom:1px solid #f3f4f6;">
                  <a href="mailto:${email}" style="color:#2C6035;font-weight:500;text-decoration:none;">${email}</a>
                </td>
              </tr>
              <tr style="background:#fafafa;">
                <td style="padding:11px 18px;font-size:13px;color:#6b7280;font-weight:600;">Phone</td>
                <td style="padding:11px 18px;font-size:13px;color:#111827;font-weight:500;">${phone || "—"}</td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Message block -->
        <tr>
          <td style="padding:24px 32px 0;">
            <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#2C6035;letter-spacing:0.8px;text-transform:uppercase;">
              💬 Message
            </p>
            <div style="background:#f9fafb;border-left:4px solid #2C6035;border-radius:0 8px 8px 0;padding:14px 18px;">
              <p style="margin:0;font-size:14px;color:#374151;line-height:1.75;white-space:pre-wrap;">${message}</p>
            </div>
          </td>
        </tr>

        <!-- Next steps box -->
        <tr>
          <td style="padding:24px 32px 0;">
            <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-left:4px solid #2C6035;border-radius:8px;padding:16px 20px;">
              <p style="margin:0 0 10px;font-size:13px;font-weight:700;color:#15803d;">⏰ Next Steps</p>
              <ul style="margin:0;padding-left:18px;font-size:13px;color:#374151;line-height:1.9;">
                <li>Reply directly to this email — it will go to <strong>${email}</strong></li>
                <li>Review the enquiry details above</li>
                <li>Follow up within 24 hours for best conversion</li>
                <li>Log the lead in your CRM if applicable</li>
              </ul>
            </div>
          </td>
        </tr>

        <!-- Reply CTA -->
        <tr>
          <td style="padding:28px 32px 0;text-align:center;">
            <a href="mailto:${email}?subject=Re: Your AspiRE Enquiry&body=Hi ${encodeURIComponent(fullName)},%0A%0AThank you for reaching out to AspiRE.%0A%0A"
               style="display:inline-block;background:#2C6035;color:#ffffff;font-size:14px;font-weight:600;padding:12px 32px;border-radius:8px;text-decoration:none;letter-spacing:0.3px;">
              🔍 Reply to Client
            </a>
          </td>
        </tr>

        <!-- Divider -->
        <tr>
          <td style="padding:32px 32px 0;">
            <hr style="border:none;border-top:1px solid #e5e7eb;margin:0;" />
          </td>
        </tr>

        <!-- Branded footer — matches screenshot style -->
        <tr>
          <td style="padding:24px 32px 28px;">
            <!-- Logo -->
            <img src="${logoUrl}" alt="AspiRE — Digitising Real Estate"
                 style="height:40px;width:auto;object-fit:contain;display:block;margin-bottom:4px;" />
            <p style="margin:0 0 16px;font-size:11px;color:#9ca3af;">Digitising Real Estate</p>

            <p style="margin:0 0 8px;font-size:12px;color:#6b7280;">
              © ${new Date().getFullYear()} AspiRE. All rights reserved.
            </p>
            <p style="margin:0;font-size:12px;color:#9ca3af;">
              This is an automated message generated by the AspiRE website contact form.
              Please do not reply to this email directly — use the <em>Reply to Client</em> button above.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
  `.trim();
}

export default function ContactForm() {
  const [status, setStatus] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.target;
    const fullName    = form.full_name.value.trim();
    const companyName = form.company_name.value.trim();
    const email       = form.email.value.trim();
    const phone       = form.phone.value.trim();
    const message     = form.message.value.trim();

    // Send via emailjs.send() so we can pass custom template params including html_body.
    // The EmailJS template should have:
    //   To      : inquiry@coppercodes.com
    //   Reply-To: {{reply_to}}
    //   Subject : {{subject}}
    //   Body    : {{{html_body}}}   ← triple-brace for unescaped HTML
    emailjs.send(
      "service_aspire_contactus",
      "template_aspire_contact",
      {
        full_name    : fullName,
        company_name : companyName || "—",
        email        : email,
        phone        : phone || "—",
        // Put formatted text into 'message' so existing template shows clean details
        message      : `New enquiry from ${fullName}

━━━━━━━━━━━━━━━━━━━━━━━━
CLIENT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━
Full Name    : ${fullName}
Company      : ${companyName || "—"}
Email        : ${email}
Phone        : ${phone || "—"}

━━━━━━━━━━━━━━━━━━━━━━━━
MESSAGE
━━━━━━━━━━━━━━━━━━━━━━━━
${message}

━━━━━━━━━━━━━━━━━━━━━━━━
Reply directly to: ${email}`,
        reply_to     : email,
        subject      : `New Enquiry from ${fullName} — AspiRE Website`,
        html_body    : buildEmailHtml({ fullName, companyName, email, phone, message }),
      },
      "Gho27hYrSo9sPZvqm"
    )
      .then(() => {
        setStatus("sent");
        setShowPopup(true);
        form.reset();
        setTimeout(() => { setShowPopup(false); setStatus(""); }, 3000);
      })
      .catch((err) => {
        console.error("EmailJS error:", err);
        setStatus("error");
      });
  };

  return (
    <motion.section
      id="contact"
      className="relative py-14 sm:py-20 px-4 sm:px-8 md:px-16 text-white overflow-hidden"
      style={{ backgroundImage: "url(/images/lets-discuss-bg.jpg)", backgroundSize: "cover", backgroundPosition: "center" }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-start md:items-center">

        {/* Left: info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-[53px] font-bold mb-5 leading-tight md:leading-[65px]">
            Let's Discuss
          </h2>

          <motion.p className="font-semibold leading-relaxed" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
            India
          </motion.p>
          <motion.p className="text-white/80 mb-4 text-sm leading-relaxed" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
            A1-211, 2nd Floor, Expat Vida, Above KFC, Near GERRA School, Kadamba Plateau, Old Goa-403402
          </motion.p>
          <motion.p className="font-semibold leading-relaxed" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
            USA
          </motion.p>
          <motion.p className="text-white/80 mb-4 text-sm leading-relaxed" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}>
            3075 Book Road Ste 103, #9162 Naperville, IL 60567-9162
          </motion.p>

          <motion.div className="flex flex-wrap gap-3 mt-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.5 }}>
            <motion.a href="tel:+919011879123" onClick={(e) => { e.stopPropagation(); window.location.href = "tel:+919011879123"; }}
              className="border border-white rounded-md px-4 py-2 text-sm flex items-center gap-2 cursor-pointer transition-colors hover:bg-[#2C6035]"
              style={{ backgroundColor: "#2C6035", color: "white" }}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}
            >
              <Phone size={15} /> +91 9011879123
            </motion.a>
            <motion.a href="tel:+18155569058" onClick={(e) => { e.stopPropagation(); window.location.href = "tel:+18155569058"; }}
              className="border border-white rounded-md px-4 py-2 text-sm flex items-center gap-2 cursor-pointer hover:bg-white/10"
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}
            >
              <img src="/images/flag.png" alt="USA" className="w-5 h-auto" />
              <Phone size={15} /> +1 815 556 9058
            </motion.a>
          </motion.div>

          <motion.img
            src="/images/arrow.png"
            alt="Arrow doodle"
            className="mt-6 w-full max-w-[340px] sm:max-w-[420px] h-auto object-contain hidden md:block"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          />
        </motion.div>

        {/* Right: form */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white text-gray-900 rounded-xl p-6 sm:p-8 shadow-lg w-full"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-2xl sm:text-3xl font-bold mb-5 text-[#231F20]">Contact Us</h3>

          {/* Hidden reply_to — no longer needed, handled in emailjs.send() params */}

          {/* Name + Company — stacked on mobile, 2-col on sm+ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <motion.input name="full_name" required placeholder="Full Name*"
              className="border-b border-[#F2F2F2] p-2 outline-none text-xs sm:text-[12px] focus:border-[#2C6035] transition-colors w-full"
              whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }} />
            <motion.input name="company_name" placeholder="Company Name*"
              className="border-b border-[#F2F2F2] p-2 outline-none text-xs sm:text-[12px] focus:border-[#2C6035] transition-colors w-full"
              whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }} />
          </div>

          {/* Email + Phone — stacked on mobile, 2-col on sm+ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <motion.input name="email" type="email" required placeholder="Email*"
              className="border-b border-[#F2F2F2] p-2 outline-none text-xs sm:text-[12px] focus:border-[#2C6035] transition-colors w-full"
              whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }} />
            <motion.input name="phone" placeholder="Phone*"
              className="border-b border-[#F2F2F2] p-2 outline-none text-xs sm:text-[12px] focus:border-[#2C6035] transition-colors w-full"
              whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }} />
          </div>

          <motion.textarea name="message" required placeholder="Message*" rows={4}
            className="border-b border-[#F2F2F2] w-full p-2 mb-5 outline-none text-xs sm:text-[12px] focus:border-[#2C6035] transition-colors resize-none"
            whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }} />

          <motion.button type="submit"
            className="transition w-full py-3 rounded-md font-semibold text-white text-sm sm:text-base"
            style={{ backgroundColor: "#2C6035" }}
            whileHover={{ scale: 1.02, backgroundColor: "#245029" }}
            whileTap={{ scale: 0.98 }}
            disabled={status === "sending"}
          >
            {status === "sending" ? "Sending..." : "SUBMIT"}
          </motion.button>

          {status === "error" && (
            <p className="text-red-500 text-xs mt-3 text-center">Something went wrong. Please try again.</p>
          )}
        </motion.form>
      </div>

      {/* Success popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 px-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="bg-white rounded-xl p-8 shadow-2xl max-w-sm w-full"
              initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ duration: 0.3 }}>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Mail/Message Sent Successfully</h3>
                <p className="text-gray-600 text-sm">We'll get back to you soon!</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
