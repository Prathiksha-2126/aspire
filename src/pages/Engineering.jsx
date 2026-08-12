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
  CheckCircle,
} from "lucide-react";
import FeatureTabs from "../components/FeatureTabs";
import ImageRevealSlider from "../components/animations/ImageRevealSlider";

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
    const targetElement = document.getElementById('contact');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* HERO */}
      <section id="hero" className="relative h-screen flex items-center justify-start bg-gray-900 text-white px-8 md:px-20 lg:px-28 pt-24 pb-16 overflow-hidden">
        <img
          src="/images/Engineering Hero Section Image.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-black/35" />

        <div className="relative z-10 max-w-4xl text-left pl-2 md:pl-6">
          <h1 className="text-4xl md:text-5xl lg:text-[64px] font-bold text-white leading-[1.2] tracking-normal mb-8 whitespace-pre-line">
            Let's Digitize Your Sites{"\n"}with AspiRE
          </h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <button
              onClick={handleGetInTouch}
              className="inline-flex items-center gap-2.5 transition-all duration-200 rounded-xl px-6 py-3 font-medium text-lg text-white cursor-pointer hover:bg-[#234D2B]"
              style={{ backgroundColor: '#2C6035' }}
            >
              Get in Touch <ArrowRight size={20} className="stroke-[2.5]" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* FEATURE TABS */}
      <FeatureTabs tabs={tabs} />

      {/* WAREHOUSE MANAGEMENT */}
      <section className="py-20 px-8 md:px-16 relative overflow-hidden"
        style={{ backgroundImage: 'url(/images/white_background.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
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
                    transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                    className="flex items-start gap-3"
                  >
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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
      <section className="h-screen max-h-screen py-4 md:py-8 px-6 md:px-16 relative overflow-hidden text-white flex flex-col justify-center"
        style={{ backgroundImage: 'url("/images/green_background.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>

        {/* Centered Section Heading */}
        <div className="max-w-6xl mx-auto mb-4 md:mb-6 relative z-10 text-center shrink-0">
          <p className="text-[11px] md:text-xs font-semibold tracking-wider uppercase text-white/80 mb-1">
            - Our Aim
          </p>
          <h2 className="text-2xl md:text-4xl font-bold leading-tight text-center text-white">
            What We Aim From AspiRE Engineering
          </h2>
        </div>

        {/* Two-column layout - stacks on mobile */}
        <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-8 md:gap-12 items-center relative z-10 shrink-0">
          {/* LEFT: Image Slider */}
          <motion.div
            className="flex justify-center md:justify-start order-2 md:order-1"
            initial={{ x: "-100%", opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px] mx-auto">
              <ImageRevealSlider
                beforeSrc="/images/AIM Section of AspiRE Engineering Before.jpg"
                afterSrc="/images/AIM Section of AspiRE Engineering After.jpg"
              />
            </div>
          </motion.div>

          {/* RIGHT: Feature Content */}
          <motion.div
            className="space-y-6 md:space-y-8 order-1 md:order-2"
            initial={{ x: "100%", opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Feature 1 */}
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">
                Structured Workflows
              </h3>
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 flex-shrink-0 mt-0.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="6" cy="12" r="3" />
                  <line x1="9" y1="12" x2="18" y2="12" />
                </svg>
                <div className="text-white/85 text-sm md:text-base leading-relaxed">
                  <p>Digitize tasks, approvals and material & payouts tracking</p>
                  <p className="font-bold text-white mt-1">Eliminate delays from manual coordination</p>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">
                Reduced Material Loss
              </h3>
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 flex-shrink-0 mt-0.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="6" cy="12" r="3" />
                  <line x1="9" y1="12" x2="18" y2="12" />
                </svg>
                <div className="text-white/85 text-sm md:text-base leading-relaxed">
                  <p>Minimize pilferage with smart controls</p>
                  <p className="font-bold text-white mt-1">Save up to 7–10% project cost</p>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">
                Real-Time Insights
              </h3>
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 flex-shrink-0 mt-0.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="6" cy="12" r="3" />
                  <line x1="9" y1="12" x2="18" y2="12" />
                </svg>
                <div className="text-white/85 text-sm md:text-base leading-relaxed">
                  <p>Centralized dashboards for instant decisions</p>
                  <p className="font-bold text-white mt-1">Reduce 15-20% delays from scattered data</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
