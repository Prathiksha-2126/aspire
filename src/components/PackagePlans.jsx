import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "./SectionHeading";

const plansData = {
  engineering: [
    {
      name: "BASIC PLAN",
      description: "Perfect for small teams, the Basic Package provides essential tools to manage construction projects efficiently, keeping you organized without breaking the budget.",
      features: ["Upto 7 Users", "Unlimited Projects", "Task tracking and deadline reminders"],
      featured: false,
    },
    {
      name: "PREMIUM PLAN",
      description: "Designed for growing businesses. The Premium Package offers advanced features, unlimited collaboration, and comprehensive tools to take your construction management to the next level.",
      features: ["Upto 15 Users", "Customizable dashboard reports", "AI Project Planner"],
      featured: true,
    },
    {
      name: "ENTERPRISE",
      heading: "Get in touch",
      description: "Engineered for enterprise-level excellence, the Premium Package is designed to meet the complex needs of large-scale construction businesses. It offers advanced features to streamline operations, enhance productivity, and provide detailed analytics for informed decision-making.",
      features: [],
      featured: false,
    },
  ],
  sales: [
    {
      name: "BASIC PLAN",
      description: "Perfect for growing sales teams, the Basic Package provides essential tools to manage leads, bookings, payments, and customer documents with ease.",
      features: ["Upto 5 Users", "Unlimited Projects", "Notification Reminders"],
      featured: false,
    },
    {
      name: "PREMIUM PLAN",
      description: "Designed for growing real estate businesses, the Premium Package offers advanced sales automation, customer management, and powerful reporting tools to scale your sales operations.",
      features: ["Upto 10 Users", "Auto-generate documents", "AI Project Planner"],
      featured: true,
    },
    {
      name: "ENTERPRISE",
      heading: "Get in touch",
      description: "Engineered for enterprise-level excellence, the Premium Package is designed to meet the complex needs of large-scale construction businesses. It offers advanced features to streamline operations, enhance productivity, and provide detailed analytics for informed decision-making.",
      features: [],
      featured: false,
    },
  ],
};

export default function PackagePlans({ defaultTab = "engineering" }) {
  const [tab, setTab] = useState(defaultTab);
  const location = useLocation();
  const plans = plansData[tab];

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabParam = urlParams.get("tab");
    if (tabParam === "engineering" || tabParam === "sales") setTab(tabParam);
  }, [location.search]);

  useEffect(() => {
    const handleTabChange = (e) => { if (e.detail?.tab) setTab(e.detail.tab); };
    window.addEventListener("setPackagePlanTab", handleTabChange);
    return () => window.removeEventListener("setPackagePlanTab", handleTabChange);
  }, []);

  return (
    <motion.section
      id="package-plans"
      className="px-4 sm:px-6 md:px-10 lg:px-16 pt-20 md:pt-28 relative overflow-hidden scroll-mt-24 pb-12 md:pb-16 vector-on-light blend-to-light fade-clear-top"
      style={{ backgroundColor: "#FFFFFF", minHeight: "100svh" }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <SectionHeading
        title="Package Plans"
        subtitle="Pick a plan that works best for you and get the most out of AspiRE for your construction projects."
      />

      {/* Tab switcher */}
      <div className="flex justify-center mb-8 md:mb-12">
        <div className="bg-[#EAF7F0] rounded-2xl p-1.5 flex shadow-sm border border-[#055938]/10 relative">
          {["engineering", "sales"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative z-10 px-5 sm:px-8 py-2.5 sm:py-3 rounded-xl text-sm md:text-base font-semibold transition-colors duration-300 cursor-pointer capitalize ${tab === t ? "text-white" : "text-[#055938]"}`}
            >
              {tab === t && (
                <motion.div layoutId="activePlanTabPill" className="absolute inset-0 bg-[#055938] rounded-xl z-[-1]" transition={{ type: "spring", stiffness: 350, damping: 30 }} />
              )}
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Plan cards — single column on mobile, 3-col on md+ */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          className="mx-auto grid w-full max-w-[1240px] gap-5 sm:gap-6 lg:gap-8 grid-cols-1 md:grid-cols-3 md:items-stretch justify-items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              className={`rounded-3xl p-6 sm:p-8 md:p-9 flex flex-col justify-between w-full transition-all duration-300 box-border ${
                plan.featured
                  ? "bg-[#055938] text-white shadow-2xl"
                  : "bg-white text-gray-800 border border-gray-100 shadow-md hover:shadow-xl"
              }`}
              style={{ maxWidth: "380px", minHeight: "420px" }}
            >
              <div className="flex flex-col flex-1">
                {plan.heading ? (
                  <>
                    <h3 className="text-sm sm:text-base font-medium text-[#055938] mb-1">
                      {plan.name === "ENTERPRISE" ? "Enterprise" : plan.name}
                    </h3>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-5">{plan.heading}</h2>
                    <div className="h-px w-full bg-gray-200/80 mb-5" />
                    <p className="text-sm leading-relaxed text-gray-500 font-normal">{plan.description}</p>
                  </>
                ) : (
                  <>
                    <h3 className={`text-lg sm:text-xl font-semibold tracking-wide uppercase mb-3 ${plan.featured ? "text-white" : "text-[#055938]"}`}>
                      {plan.name}
                    </h3>
                    <p className={`text-sm leading-relaxed font-normal mb-5 ${plan.featured ? "text-white/85" : "text-gray-500"}`}>
                      {plan.description}
                    </p>
                    <div className={`h-px w-full mb-5 ${plan.featured ? "bg-white/20" : "bg-gray-200/80"}`} />
                    <ul className="space-y-3 sm:space-y-4 mt-2">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-center gap-3">
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${plan.featured ? "bg-white" : "bg-[#055938]"}`}>
                            <Check size={12} strokeWidth={2.5} className={plan.featured ? "text-[#055938]" : "text-white"} />
                          </span>
                          <span className={`text-sm font-normal leading-snug ${plan.featured ? "text-white/95" : "text-gray-600"}`}>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      <p className="mt-10 md:mt-12 text-center font-poppins text-base sm:text-lg md:text-xl font-semibold text-[#4B4A4A]">
        For Costing Get In Touch with us
      </p>
    </motion.section>
  );
}
