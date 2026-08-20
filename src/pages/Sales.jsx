import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarClock,
  Target,
  FileCheck,
  PieChart,
} from "lucide-react";
import SalesFeatureTabs from "../components/SalesFeatureTabs";
import ImageRevealSlider from "../components/animations/ImageRevealSlider";

const tabs = [
  {
    icon: <Target size={18} />,
    iconImage: "/images/Lead MAnagement Icon (SAles).png",
    label: "Lead Management",
    title: "Lead Management",
    description:
      "Capture, track and convert leads with Kanban CRM, follow-ups, assignments.",
  },
  {
    icon: <CalendarClock size={18} />,
    iconImage: "/images/Booking Management Icon.png",
    label: "Booking Management",
    title: "Booking Management",
    description:
      "Book Flats, villas or plots, manage co-applicants, possession dates.",
  },
  {
    icon: <FileCheck size={18} />,
    iconImage: "/images/Document Automation ICon.png",
    label: "Document Automation",
    title: "Document Automation",
    description:
      "Auto-generate ready-to-Share Agreements, GST Invoice, Payment Receipts, Demand Letters & Offer Letters in PDF, DOCX formats.",
  },
  {
    icon: <PieChart size={18} />,
    iconImage: "/images/Reports Analytics ICon.png",
    label: "Reports Analytics",
    title: "Reports Analytics",
    description:
      "Real-time dashboards and reports for sales, collections, inventory and lead funnel.",
  },
];

export default function Sales() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleGetInTouch = (e) => {
    e.preventDefault();
    const targetElement = document.getElementById("contact");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* HERO SECTION */}
      <section
        id="hero"
        className="relative h-screen flex items-start justify-start bg-gray-900 text-white pt-24 md:pt-44 pb-12 md:pb-16 overflow-hidden"
      >
        <img
          src="/images/Hero Section of AspiRe Sales.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />

        <div className="relative z-10 max-w-5xl text-left px-6 sm:px-8 md:px-20 lg:px-28">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-normal mb-3">
            <span className="block">Are Booking Delays Costing You</span>
            <span className="block mt-1 sm:mt-2 md:mt-3">Revenue?</span>
          </h1>
          <p className="text-white/90 text-base md:text-lg max-w-2xl mb-8 leading-relaxed">
            Every unit. Every customer. Every transaction in real time.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <button
              onClick={handleGetInTouch}
              className="inline-flex items-center gap-2.5 transition-all duration-200 rounded-xl px-6 py-3 font-medium text-lg text-white cursor-pointer hover:bg-[#2C6035]"
              style={{ backgroundColor: "#2C6035" }}
            >
              Get in Touch <ArrowRight size={20} className="stroke-[2.5]" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* FEATURE TABS (Clean & Independent) */}
      <SalesFeatureTabs tabs={tabs} />

      {/* WHAT WE AIM SECTION */}
      <section
        className="min-h-[85vh] py-16 md:py-24 px-6 md:px-16 relative overflow-hidden text-white flex flex-col justify-center vector-on-green"
        style={{ backgroundColor: "#2C6035" }}
      >
        {/* Centered Section Heading */}
        <div className="max-w-6xl mx-auto mb-10 md:mb-16 relative z-10 text-center shrink-0">
          <p className="text-xs md:text-sm font-bold tracking-widest uppercase text-white/90 mb-2.5">
            — OUR AIM
          </p>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight text-center text-white font-poppins">
            Sell Smarter with AspiRE
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-10 md:gap-16 items-center relative z-10 shrink-0">
          {/* LEFT: Image Slider */}
          <motion.div
            className="flex justify-center md:justify-start order-2 md:order-1"
            initial={{ x: "-100%", opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="w-full max-w-[340px] sm:max-w-[380px] md:max-w-[440px] mx-auto shadow-2xl rounded-2xl overflow-hidden">
              <ImageRevealSlider
                beforeSrc="/images/AIM Section of Sales After.jpg"
                afterSrc="/images/AIM Section of AspiRE Sales After.jpg"
              />
            </div>
          </motion.div>

          {/* RIGHT: Feature Content */}
          <motion.div
            className="space-y-8 md:space-y-10 order-1 md:order-2"
            initial={{ x: "100%", opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Feature 1 */}
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-2.5 text-white font-poppins">
                Centralized Sales Management
              </h3>
              <div className="flex items-start gap-3.5">
                <svg
                  className="w-6 h-6 flex-shrink-0 mt-1 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="6" cy="12" r="3" />
                  <line x1="9" y1="12" x2="18" y2="12" />
                </svg>
                <div className="text-white/90 text-sm md:text-base leading-relaxed">
                  <p>– Manage leads, follow-ups & bookings in one place</p>
                  <p>– Never miss an opportunity</p>
                  <p className="font-bold text-white mt-1.5">
                    Improve conversions & sales efficiency
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-2.5 text-white font-poppins">
                Instant Document Automation
              </h3>
              <div className="flex items-start gap-3.5">
                <svg
                  className="w-6 h-6 flex-shrink-0 mt-1 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="6" cy="12" r="3" />
                  <line x1="9" y1="12" x2="18" y2="12" />
                </svg>
                <div className="text-white/90 text-sm md:text-base leading-relaxed">
                  <p>– Auto-generate offer letters, invoices & agreements</p>
                  <p>– Reduce manual work & errors</p>
                  <p className="font-bold text-white mt-1.5">
                    Save up to 90% time
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-2.5 text-white font-poppins">
                Real-Time Sales Insights
              </h3>
              <div className="flex items-start gap-3.5">
                <svg
                  className="w-6 h-6 flex-shrink-0 mt-1 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="6" cy="12" r="3" />
                  <line x1="9" y1="12" x2="18" y2="12" />
                </svg>
                <div className="text-white/90 text-sm md:text-base leading-relaxed">
                  <p>– Live dashboards for sales & revenue tracking</p>
                  <p>– Make faster, data-driven decisions</p>
                  <p className="font-bold text-white mt-1.5">
                    Boost productivity by 15–20%
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}