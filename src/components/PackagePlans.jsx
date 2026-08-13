import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "./SectionHeading";

const plansData = {
  engineering: [
    {
      name: "BASIC PLAN",
      tag: null,
      description:
        "Perfect for small teams, the Basic Package provides essential tools to manage construction projects efficiently, keeping you organized without breaking the budget.",
      features: ["Upto 7 Users", "Unlimited Projects", "Task tracking and deadline reminders"],
      cta: null,
      featured: false,
    },
    {
      name: "PREMIUM PLAN",
      tag: null,
      description:
        "Designed for growing businesses. The Premium Package offers advanced features, unlimited collaboration, and comprehensive tools to take your construction management to the next level.",
      features: ["Upto 15 Users", "Customizable dashboard reports", "AI Project Planner"],
      cta: null,
      featured: true,
    },
    {
      name: "ENTERPRISE",
      tag: null,
      heading: "Get in touch",
      description:
        "Engineered for enterprise-level excellence, the Premium Package is designed to meet the complex needs of large-scale construction businesses. It offers advanced features to streamline operations, enhance productivity, and provide detailed analytics for informed decision-making. With unlimited collaboration capabilities, your teams can work seamlessly across projects, ensuring every detail is managed efficiently.",
      features: [],
      cta: null,
      featured: false,
    },
  ],
  sales: [
    {
      name: "BASIC PLAN",
      tag: null,
      description:
        "Perfect for growing sales teams, the Basic Package provides essential tools to manage leads, bookings, payments, and customer documents with ease.",
      features: ["Upto 5 Users", "Unlimited Projects", "Notification Reminders"],
      cta: null,
      featured: false,
    },
    {
      name: "PREMIUM PLAN",
      tag: null,
      description:
        "Designed for growing real estate businesses, the Premium Package offers advanced sales automation, customer management, and powerful reporting tools to scale your sales operations.",
      features: ["Upto 10 Users", "Auto-generate documents", "AI Project Planner"],
      cta: null,
      featured: true,
    },
    {
      name: "ENTERPRISE",
      tag: null,
      heading: "Get in touch",
      description:
        "Engineered for enterprise-level excellence, the Premium Package is designed to meet the complex needs of large-scale construction businesses. It offers advanced features to streamline operations, enhance productivity, and provide detailed analytics for informed decision-making. With unlimited collaboration capabilities, your teams can work seamlessly across projects, ensuring every detail is managed efficiently.",
      features: [],
      cta: null,
      featured: false,
    },
  ],
};

export default function PackagePlans({ defaultTab = "engineering" }) {
  const [tab, setTab] = useState(defaultTab);
  const location = useLocation();
  const plans = plansData[tab];

  useEffect(() => {
    // Check URL parameter for tab reactively
    const urlParams = new URLSearchParams(location.search);
    const tabParam = urlParams.get('tab');
    if (tabParam && (tabParam === 'engineering' || tabParam === 'sales')) {
      setTab(tabParam);
    }
  }, [location.search]);

  useEffect(() => {
    // Listen for custom event from navbar or footer
    const handleTabChange = (event) => {
      if (event.detail && event.detail.tab) {
        setTab(event.detail.tab);
      }
    };

    window.addEventListener('setPackagePlanTab', handleTabChange);
    return () => {
      window.removeEventListener('setPackagePlanTab', handleTabChange);
    };
  }, []);

  return (
    <motion.section
      id="package-plans"
      className="px-6 md:px-10 lg:px-16 pt-20 md:pt-28 relative overflow-hidden scroll-mt-24 pb-12 md:pb-16 vector-on-light blend-to-light fade-clear-top"
      style={{
        backgroundColor: '#FFFFFF',
        minHeight: '100svh',
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <SectionHeading
        // eyebrow="Package Plans"
        title="Package Plans"
        subtitle="Pick a plan that works best for you and get the most out of AspiRE for your 
construction projects."
      />

      {/* Tab Switcher - Exactly as in Screenshot */}
      <div className="flex justify-center mb-10 md:mb-12">
        <div className="bg-[#EAF7F0] rounded-2xl p-1.5 flex shadow-sm border border-[#055938]/10 relative">
          <button
            onClick={() => setTab("engineering")}
            className={`relative z-10 px-8 py-3 rounded-xl text-sm md:text-base font-semibold transition-colors duration-300 cursor-pointer ${
              tab === "engineering" ? "text-white" : "text-[#055938]"
            }`}
          >
            {tab === "engineering" && (
              <motion.div
                layoutId="activePlanTabPill"
                className="absolute inset-0 bg-[#055938] rounded-xl z-[-1]"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            Engineering
          </button>
          <button
            onClick={() => setTab("sales")}
            className={`relative z-10 px-8 py-3 rounded-xl text-sm md:text-base font-semibold transition-colors duration-300 cursor-pointer ${
              tab === "sales" ? "text-white" : "text-[#055938]"
            }`}
          >
            {tab === "sales" && (
              <motion.div
                layoutId="activePlanTabPill"
                className="absolute inset-0 bg-[#055938] rounded-xl z-[-1]"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            Sales
          </button>
        </div>
      </div>

      {/* Plan Cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          className="mx-auto grid w-full max-w-[1240px] gap-6 lg:gap-8 md:grid-cols-3 md:items-stretch justify-items-center"
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
              className={`rounded-3xl p-7 sm:p-8 md:p-9 flex flex-col justify-between w-full h-full transition-all duration-300 box-border ${
                plan.featured
                  ? "bg-[#055938] text-white shadow-2xl"
                  : "bg-white text-gray-800 border border-gray-100 shadow-md hover:shadow-xl"
              }`}
              style={{
                maxWidth: '380px',
                minHeight: '490px',
              }}
            >
              {/* CARD CONTENT */}
              <div className="flex flex-col flex-1">

                {/* CARD 3: ENTERPRISE CARD SPECIAL LAYOUT */}
                {plan.heading ? (
                  <>
                    <h3 className="text-base sm:text-lg font-medium text-[#055938] mb-1">
                      {plan.name === "ENTERPRISE" ? "Enterprise" : plan.name}
                    </h3>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                      {plan.heading}
                    </h2>

                    {/* Divider below heading */}
                    <div className="h-px w-full bg-gray-200/80 mb-6" />

                    {/* Description Paragraph */}
                    <p className="text-sm sm:text-base leading-relaxed text-gray-500 font-normal">
                      {plan.description}
                    </p>
                  </>
                ) : (
                  /* CARD 1 & CARD 2: STANDARD BASIC & PREMIUM LAYOUT */
                  <>
                    <h3
                      className={`text-xl sm:text-2xl font-semibold tracking-wide uppercase mb-4 ${
                        plan.featured ? "text-white" : "text-[#055938]"
                      }`}
                    >
                      {plan.name}
                    </h3>

                    <p
                      className={`text-sm sm:text-base leading-relaxed font-normal mb-6 ${
                        plan.featured ? "text-white/85" : "text-gray-500"
                      }`}
                    >
                      {plan.description}
                    </p>

                    {/* Divider below description */}
                    <div
                      className={`h-px w-full mb-6 ${
                        plan.featured ? "bg-white/20" : "bg-gray-200/80"
                      }`}
                    />

                    {/* Feature Bullets (Unbolded Regular Text) */}
                    <ul className="space-y-4 sm:space-y-5 mt-2">
                      {plan.features.map((f, idx) => (
                        <li key={f} className="flex items-center gap-3.5">
                          <span
                            className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                              plan.featured ? "bg-white" : "bg-[#055938]"
                            }`}
                          >
                            <Check
                              size={14}
                              strokeWidth={2.5}
                              className={plan.featured ? "text-[#055938]" : "text-white"}
                            />
                          </span>
                          <span
                            className={`text-sm sm:text-base font-normal leading-snug ${
                              plan.featured ? "text-white/95" : "text-gray-600"
                            }`}
                          >
                            {f}
                          </span>
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

      <p className="mt-12 text-center font-poppins text-lg sm:text-xl md:text-2xl font-semibold text-[#4B4A4A]">
        For Costing Get In Touch with us
      </p>
    </motion.section>
  );
}
