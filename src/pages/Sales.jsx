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
import OurAimSection from "../components/OurAimSection";

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
        className="relative h-screen flex items-start justify-start bg-gray-900 text-white pt-28 md:pt-44 pb-12 md:pb-16 overflow-hidden"
      >
        <img
          src="/images/Hero Section of AspiRe Sales.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-100"
          style={{ objectPosition: 'right center' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />

        <div className="relative z-10 max-w-6xl text-left px-6 sm:px-8 md:px-20 lg:px-28">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-normal mb-3">
            <span className="block">Are Booking Delays</span>
            <span className="block mt-1 sm:mt-2 md:mt-3">Costing You Revenue?</span>
          </h1>
          <p className="text-white/90 text-lg md:text-2xl max-w-2xl mb-8 leading-relaxed">
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

      {/* WHAT WE AIM */}
      <OurAimSection
        photo="/images/Aim of AspiRE Sales.png"
        eyebrow="OUR AIM"
        heading={[
          { text: "Sell Smarter with " },
          { text: "AspiRE", highlight: true },
        ]}
        items={[
          {
            number: "01",
            icon: "/images/Centralized Sales Management.png",
            title: "Centralized Sales Management",
            bullets: [
              "Manage leads, follow-ups & bookings in one place",
              "Never miss an opportunity",
            ],
            highlight: "Improve conversions & sales efficiency",
          },
          {
            number: "02",
            icon: "/images/Instant Document Automation.png",
            title: "Instant Document Automation",
            bullets: [
              "Auto-generate offer letters, invoices & agreements",
              "Reduce manual work & errors",
            ],
            highlight: "Save up to 90% time",
          },
          {
            number: "03",
            icon: "/images/Real-Time Sales Insights.png",
            title: "Real-Time Sales Insights",
            bullets: [
              "Live dashboards for sales & revenue tracking",
              "Make faster, data-driven decisions",
            ],
            highlight: "Boost productivity by 15-20%",
          },
        ]}
      />
    </>
  );
}