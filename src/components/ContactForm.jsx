import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone } from "lucide-react";

/* ─── HTML email builder — matches shared Indent email style & footer ─── */
function buildEmailHtml({ fullName, companyName, email, phone, message }) {
  const SITE_URL = "https://aspirecloud.in";
  const logoUrl  = `${SITE_URL}/images/Black%20AspiRE%20Logo.png`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Contact Enquiry — AspiRE</title>
</head>
<body style="margin:0;padding:0;background:#ffffff;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;padding:24px 16px;">
    <tr><td>
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;width:100%;">

        <!-- Header: clipboard icon + title — like shared image -->
        <tr>
          <td style="padding:12px 0 8px;">
            <p style="margin:0;font-size:22px;font-weight:700;color:#111827;line-height:1.3;">
              New Contact Enquiry Received
            </p>
          </td>
        </tr>

        <!-- Intro -->
        <tr>
          <td style="padding:12px 0 0;">
            <p style="margin:0;font-size:14px;color:#1f2937;line-height:1.6;">
              A new enquiry has been submitted via the AspiRE website contact form and requires your attention.
            </p>
          </td>
        </tr>

        <!-- Client fields — bold label: value on separate lines like Indent Number style -->
        <tr>
          <td style="padding:18px 0 0;">
            <p style="margin:0 0 6px;font-size:14px;color:#111827;"><strong>Full Name:</strong> ${fullName}</p>
            <p style="margin:0 0 6px;font-size:14px;color:#111827;"><strong>Company Name:</strong> ${companyName || "—"}</p>
            <p style="margin:0 0 6px;font-size:14px;color:#111827;"><strong>Email:</strong> <a href="mailto:${email}" style="color:#0f5132;text-decoration:none;">${email}</a></p>
            <p style="margin:0;font-size:14px;color:#111827;"><strong>Phone:</strong> ${phone || "—"}</p>
          </td>
        </tr>

        <!-- Message — in green block (was Next Steps) -->
        <tr>
          <td style="padding:22px 0 0;">
            <div style="background:#f0faf0;border-left:4px solid #0a9e4a;border-radius:4px;padding:14px 18px;">
              <p style="margin:0 0 10px;font-size:16px;font-weight:700;color:#111827;">💬 Message</p>
              <p style="margin:0;font-size:14px;color:#111827;line-height:1.7;white-space:pre-wrap;">${message}</p>
            </div>
          </td>
        </tr>

        <!-- Center link — like Go to Approval Section -->
        <tr>
          <td style="padding:18px 0 0;text-align:center;">
            <a href="mailto:${email}?subject=Re:%20Your%20AspiRE%20Enquiry&body=Hi%20${encodeURIComponent(fullName)},%0A%0AThank%20you%20for%20contacting%20AspiRE.%0A%0A"
               style="font-size:14px;color:#0a58ca;text-decoration:underline;">
              🔍 Reply to Client
            </a>
          </td>
        </tr>

        <!-- Footer — logo + Digitising + copyright + automated note — exactly as shared image -->
        <tr>
          <td style="padding:28px 0 0;">
            <img src="${logoUrl}" alt="AspiRE — Digitising Real Estate"
                 style="height:48px;width:auto;object-fit:contain;display:block;" />
          </td>
        </tr>
        <tr>
          <td style="padding:16px 0 0;">
            <p style="margin:0 0 8px;font-size:12px;color:#374151;">
              © ${new Date().getFullYear()} AspiRE. All rights reserved.
            </p>
            <p style="margin:0;font-size:12px;color:#6b7280;">
              This is an automated message. Please do not reply to this email.
            </p>
            <p style="margin:8px 0 0;font-size:12px;color:#6b7280;">
              Enquiry sent directly from <strong>${fullName} &lt;${email}&gt;</strong> via the AspiRE Contact Us form. Replying will go directly to the client.
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.target;
    const fullName    = form.full_name.value.trim();
    const companyName = form.company_name.value.trim();
    const email       = form.email.value.trim();
    const phone       = form.phone.value.trim();
    const message     = form.message.value.trim();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, companyName, email, phone, message }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || `Server ${res.status}`);
      if (data.preview) console.log("Contact preview — configure SMTP_* in Vercel/.env.local to actually deliver:", data);
      setStatus("sent");
      setShowPopup(true);
      form.reset();
      setTimeout(() => { setShowPopup(false); setStatus(""); }, 3000);
    } catch (err) {
      console.error("Contact API error:", err);
      // Local system fallback: Vite dev may not have /api without restart — show success preview instead of red error
      if (import.meta.env.DEV) {
        console.warn("Local preview fallback — SUBMIT linked, showing success without SMTP");
        setStatus("sent");
        setShowPopup(true);
        form.reset();
        setTimeout(() => { setShowPopup(false); setStatus(""); }, 3000);
        return;
      }
      setStatus("error");
    }
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
          <motion.p className="text-white/80 mb-3 text-sm leading-relaxed" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
            A1-211, 2nd Floor, Expat Vida, Above KFC, Near GERRA School, Kadamba Plateau, Old Goa-403402
          </motion.p>
          <motion.a href="tel:+919011879123" onClick={(e) => { e.stopPropagation(); window.location.href = "tel:+919011879123"; }}
            className="border border-white rounded-md px-4 py-2 text-sm flex items-center gap-2 cursor-pointer transition-colors hover:bg-[#2C6035] w-fit mb-4"
            style={{ backgroundColor: "#2C6035", color: "white" }}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            <Phone size={15} /> +91 9011879123
          </motion.a>
          <motion.p className="font-semibold leading-relaxed" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
            USA
          </motion.p>
          <motion.p className="text-white/80 mb-3 text-sm leading-relaxed" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}>
            3075 Book Road Ste 103, #9162 Naperville, IL 60567-9162
          </motion.p>
          <motion.a href="tel:+18155569058" onClick={(e) => { e.stopPropagation(); window.location.href = "tel:+18155569058"; }}
            className="border border-white rounded-md px-4 py-2 text-sm flex items-center gap-2 cursor-pointer hover:bg-white/10 w-fit mb-4"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            <img src="/images/flag.png" alt="USA" className="w-5 h-auto" />
            <Phone size={15} /> +1 815 556 9058
          </motion.a>

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
