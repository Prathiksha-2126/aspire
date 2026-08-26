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
      {/* HERO SECTION — sales content taken up */}
      <section
        id="hero"
        className="relative h-screen flex items-start justify-start bg-gray-900 text-white pt-[clamp(170px,33vh,250px)] sm:pt-[clamp(190px,35vh,270px)] md:pt-44 pb-12 md:pb-16 overflow-hidden"
      >
        <img
          src="/images/Sales_Hero_mobile.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-[75%_center] md:hidden"
          style={{ opacity: 0.92 }}
        />
        <img
          src="/images/Hero Section of AspiRe Sales.png"
          alt=""
          className="hidden md:block absolute inset-0 w-full h-full object-cover object-[32%_center]"
          style={{ opacity: 0.92 }}
        />
        {/* Dark film — nearly transparent */}
        <div className="absolute inset-0 bg-black/15 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent md:from-black/45 md:via-black/12" />

        <div className="relative z-10 w-full max-w-6xl text-left px-4 sm:px-6 md:px-20 lg:px-28">
          <h1 className="text-[30px] sm:text-[34px] md:text-[48px] lg:text-[58px] font-bold text-white tracking-tight leading-[1.08] md:leading-[1.1] mb-3 max-w-[360px] sm:max-w-[560px] md:max-w-[600px] lg:max-w-[680px]">
            <span className="block whitespace-nowrap">Are Booking Delays</span>
            <span className="block whitespace-nowrap mt-2 sm:mt-2.5 md:mt-3">Costing You Revenue?</span>
          </h1>
          <p className="text-white text-[17px] sm:text-[18px] md:text-[21px] lg:text-[22px] leading-[1.45] md:leading-[1.5] mb-6 sm:mb-8 max-w-[252px] sm:max-w-[320px] md:max-w-2xl drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
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