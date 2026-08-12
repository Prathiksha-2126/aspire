import { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import { Phone } from "lucide-react";

// Initialize EmailJS with public key
emailjs.init("Gho27hYrSo9sPZvqm");

export default function ContactForm() {
  const [status, setStatus] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");

    emailjs
      .sendForm(
        "service_aspire_contactus",
        "template_aspire_contact",
        e.target,
        "Gho27hYrSo9sPZvqm"
      )
      .then((response) => {
        console.log("EmailJS Success:", response);
        setStatus("sent");
        setShowPopup(true);
        e.target.reset();
        
        // Auto-hide popup after 3 seconds
        setTimeout(() => {
          setShowPopup(false);
          setStatus("");
        }, 3000);
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        console.error("Error details:", error.text);
        setStatus("error");
      });
  };

  return (
    <motion.section
      id="contact"
      className="relative py-20 px-8 md:px-16 text-white overflow-hidden"
      style={{ backgroundImage: 'url(/images/lets-discuss-bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[53px] font-bold mb-6 leading-[65px]">Let's Discuss</h2>
          <motion.p 
            className="font-semibold leading-[27px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >India</motion.p>
          <motion.p 
            className="text-subtitle mb-4 leading-[27px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            A1-211, 2nd Floor, Expat Vida, Above KFC, Near GERRA School,
            Kadamba Plateau, Old Goa-403402
          </motion.p>
          <motion.p 
            className="font-semibold leading-[27px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >USA</motion.p>
          <motion.p 
            className="text-subtitle mb-4 leading-[27px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            3075 Book Road Ste 103, #9162 Naperville, IL 60567-9162
          </motion.p>
          <motion.div 
            className="flex gap-4 mt-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <motion.a
              href="tel:+919011879123"
              onClick={(e) => {
                e.stopPropagation();
                window.location.href = "tel:+919011879123";
              }}
              className="border border-white rounded-md px-4 py-2 text-sm flex items-center gap-2 cursor-pointer transition-colors hover:bg-[#234d2b]"
              style={{ backgroundColor: '#2C6035', color: 'white' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Phone size={16} />
              +91 9011879123
            </motion.a>
            <motion.a
              href="tel:+18155569058"
              onClick={(e) => {
                e.stopPropagation();
                window.location.href = "tel:+18155569058";
              }}
              className="border border-white rounded-md px-4 py-2 text-sm flex items-center gap-2 cursor-pointer transition-colors hover:bg-white/10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <img src="/images/flag.png" alt="USA" className="w-5 h-auto" />
              <Phone size={16} />
              +1 815 556 9058
            </motion.a>
          </motion.div>

          {/* Arrow Doodle */}
          <motion.img
            src="/images/arrow.png"
            alt="Arrow doodle"
            className="mt-6 w-full max-w-[500px] h-auto object-contain hidden md:block"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          />
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="bg-white text-gray-900 rounded-xl p-8 shadow-lg"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-[36px] font-bold mb-6 leading-[44px] text-[#231F20]">Contact Us</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <motion.input
              name="full_name"
              required
              placeholder="Full Name*"
              className="border-b border-[#F2F2F2] p-2 outline-none text-[12px] focus:border-[#2C6035] transition-colors"
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            />
            <motion.input
              name="company_name"
              placeholder="Company Name*"
              className="border-b border-[#F2F2F2] p-2 outline-none text-[12px] focus:border-[#2C6035] transition-colors"
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <motion.input
              name="email"
              type="email"
              required
              placeholder="Email*"
              className="border-b border-[#F2F2F2] p-2 outline-none text-[12px] focus:border-[#2C6035] transition-colors"
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            />
            <motion.input
              name="phone"
              placeholder="Phone*"
              className="border-b border-[#F2F2F2] p-2 outline-none text-[12px] focus:border-[#2C6035] transition-colors"
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            />
          </div>
          <motion.textarea
            name="message"
            required
            placeholder="Message*"
            rows={4}
            className="border-b border-[#F2F2F2] w-full p-2 mb-6 outline-none text-[12px] focus:border-[#2C6035] transition-colors"
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          />
          <motion.button
            type="submit"
            className="transition w-full py-3 rounded-md font-semibold text-white"
            style={{ backgroundColor: '#2C6035' }}
            whileHover={{ scale: 1.02, backgroundColor: '#245029' }}
            whileTap={{ scale: 0.98 }}
            disabled={status === "sending"}
          >
            {status === "sending" ? "Sending..." : "SUBMIT"}
          </motion.button>
        </motion.form>
      </div>

      {/* Success Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl p-8 shadow-2xl max-w-sm mx-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
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
