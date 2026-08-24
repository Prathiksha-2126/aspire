import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ListTree,
  Layers,
  Users,
  Receipt,
  GitBranch,
  Cpu,
} from "lucide-react";
import FeatureTabs from "../components/FeatureTabs";
import OurAimSection from "../components/OurAimSection";

const tabs = [
  {
    icon: <ListTree size={18} />,
    iconImage: "/images/Task Mangement Icon (eng).png",
    label: "Task Management",
    title: "Task Management",
    description:
      "Plan, assign, track, and complete site tasks with real-time progress updates and deadline monitoring.",
  },
  {
    icon: <Layers size={18} />,
    iconImage: "/images/Material mangement Icon.png",
    label: "Materials Management",
    title: "Material Management",
    description:
      "Manage material requests, inventory, stock movement, purchase orders, and consumption from one centralized system.",
  },
  {
    icon: <Users size={18} />,
    iconImage: "/images/Attendance Management ICon.png",
    label: "Attendance Management",
    title: "Attendance Management",
    description:
      "Record and monitor daily labour attendance to ensure accurate workforce tracking across all projects.",
  },
  {
    icon: <Receipt size={18} />,
    iconImage: "/images/Payement Tracking Icon.png",
    label: "Payment Tracking",
    title: "Payment Tracking",
    description:
      "Track contractor and material payments, including advances, phased payouts, pending balances, and complete transaction records.",
  },
  {
    icon: <GitBranch size={18} />,
    iconImage: "/images/Gantt Chart ICon.png",
    label: "Gantt Chart",
    title: "Gantt Chart",
    description:
      "Monitor project timelines, deadlines, and subtask-wise material and contractor costs from a single interactive view.",
  },
  {
    icon: <Cpu size={18} />,
    iconImage: "/images/Ai Project Planner ICon.png",
    label: "AI Project Planner",
    title: "AI Project Planner",
    description:
      "Plan your entire project in minutes. Enter the building configuration, and AI generates the project hierarchy with estimated timelines for every task and subtask.",
  },
];

export default function Engineering() {
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
      {/* HERO — mobile content 10% upper (just above device, no Get in Touch overlap) */}
      <section
        id="hero"
        className="relative h-screen flex items-start justify-start bg-gray-900 text-white pt-[clamp(190px,37vh,282px)] sm:pt-[clamp(210px,39vh,302px)] md:pt-44 pb-12 md:pb-16 overflow-hidden"
      >
        <img
          src="/images/Engineering Hero Section Image.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-100"
          style={{ objectPosition: '75% center' }}
        />
        {/* Dark film — nearly transparent */}
        <div className="absolute inset-0 bg-black/15 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent md:from-black/50 md:via-black/20" />
        {/* Mobile: slightly stronger bottom fade to keep text just above device */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent md:hidden pointer-events-none" />

        <div className="relative z-10 w-full max-w-6xl text-left px-4 sm:px-6 md:px-20 lg:px-28">
          <h1 className="text-[30px] sm:text-[34px] md:text-[48px] lg:text-[58px] font-bold text-white tracking-tight leading-[1.08] md:leading-[1.1] mb-3 max-w-[360px] sm:max-w-[560px] md:max-w-[620px] lg:max-w-[700px]">
            <span className="block whitespace-nowrap">Do You Know What's</span>
            <span className="block whitespace-nowrap mt-2 sm:mt-2.5 md:mt-3">Happening on Your Site?</span>
          </h1>
          <p className="text-white text-[17px] sm:text-[18px] md:text-[21px] lg:text-[22px] leading-[1.45] md:leading-[1.5] mb-6 sm:mb-8 max-w-[252px] sm:max-w-[320px] md:max-w-2xl drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
            Every update. Every activity. Every site in one place.
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

      {/* FEATURE TABS */}
      <FeatureTabs tabs={tabs} />

      {/* WAREHOUSE MANAGEMENT (Clean Off-White Background) */}
      <section
        className="py-20 px-8 md:px-16 relative overflow-hidden vector-on-offwhite"
        style={{ backgroundColor: "#F9F8F5" }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Centered Heading */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-4"
          >
            <h2 className="text-[36px] md:text-[42px] font-bold leading-[48px]">
              <span className="text-[#2C6035]">Warehouse</span>
              <span className="text-gray-900"> Management</span>
            </h2>
          </motion.div>

          {/* Centered Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center text-gray-600 text-[16px] mb-12 max-w-3xl mx-auto"
          >
            One System to Maintain Clear Warehouse Material Transactions with All the Sites
          </motion.p>

          {/* Two-column layout */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* LEFT: Image */}
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <img
                src="/images/Warehouse Management.png"
                alt="Warehouse Management"
                className="rounded-2xl w-full aspect-[4/3] object-contain border border-gray-200"
              />
            </motion.div>

            {/* RIGHT: Bullet Points */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <ul className="space-y-6 text-[16px] text-gray-700">
                {[
                  "Detailed material stock and consumption tracking",
                  "Transfer materials across multiple sites",
                  "Track machines & equipment movements issued to sites",
                  "Track warehouse staff attendance",
                  "Auto-generated challans for material dispatch",
                ].map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <svg
                      className="w-5 h-5 flex-shrink-0 mt-0.5 text-gray-900"
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
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHAT WE AIM */}
      <OurAimSection
        photo="/images/Aim of AspiRE Engineering.png"
        eyebrow="OUR AIM"
        heading={[
          { text: "What We Aim From " },
          { text: "AspiRE", highlight: true },
          { text: " Engineering" },
        ]}
        items={[
          {
            number: "01",
            icon: "/images/Structured Workflows.png",
            title: "Structured Workflows",
            bullets: ["Digitize tasks, approvals and material & payouts tracking"],
            highlight: "Eliminate delays from manual coordination",
          },
          {
            number: "02",
            icon: "/images/Reduced Material Loss.png",
            title: "Reduced Material Loss",
            bullets: ["Minimize pilferage with smart controls"],
            highlight: "Save up to 7-10% project cost",
          },
          {
            number: "03",
            icon: "/images/Real-Time Insights.png",
            title: "Real-Time Insights",
            bullets: ["Centralized dashboards for instant decisions"],
            highlight:"Reduce 15-20% delays from scattered data",
          },
        ]}
      />
    </>
  );
}