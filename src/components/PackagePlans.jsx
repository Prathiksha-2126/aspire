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

  const cardVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.25 } }
  };

  return (
    <motion.section
      id="package-plans"
      className="px-6 md:px-10 lg:px-16 relative overflow-hidden scroll-mt-24"
      style={{
        backgroundImage: 'url(/images/white_background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100svh',
        paddingTop: 'clamp(16px, 2vh, 24px)',
        paddingBottom: 'clamp(12px, 1.5vh, 18px)',
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <SectionHeading
          title="Package Plans"
          subtitle="Pick a plan that works best for you and get the most out of AspiRE for your construction projects."
        />
      </motion.div>

      {/* Toggle */}
      <div className="flex justify-center mb-6">
        <div className="bg-white/90 backdrop-blur-md rounded-full p-1.5 flex shadow-md border border-gray-200/60 relative">
          <button
            onClick={() => setTab("engineering")}
            className={`relative z-10 px-7 py-2.5 rounded-full text-sm font-bold transition-colors duration-300 cursor-pointer ${
              tab === "engineering" ? "text-white" : "text-[#2C6035]"
            }`}
          >
            {tab === "engineering" && (
              <motion.div
                layoutId="activePlanTabPill"
                className="absolute inset-0 bg-[#2C6035] rounded-full z-[-1]"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            Engineering
          </button>
          <button
            onClick={() => setTab("sales")}
            className={`relative z-10 px-7 py-2.5 rounded-full text-sm font-bold transition-colors duration-300 cursor-pointer ${
              tab === "sales" ? "text-white" : "text-[#2C6035]"
            }`}
          >
            {tab === "sales" && (
              <motion.div
                layoutId="activePlanTabPill"
                className="absolute inset-0 bg-[#2C6035] rounded-full z-[-1]"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            Sales
          </button>
        </div>
      </div>

      {/* Plan cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          className="mx-auto grid w-full max-w-[1180px] gap-6 lg:gap-8 md:grid-cols-3 md:items-stretch justify-items-center"
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
              whileHover={{ y: -8, scale: plan.featured ? 1.03 : 1.02 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
              className={`rounded-[28px] p-7 sm:p-8 md:p-9 flex flex-col justify-between w-full h-full transition-shadow duration-300 ${
                plan.featured
                  ? "text-white shadow-2xl ring-2 ring-[#2C6035]/30"
                  : "bg-white text-gray-900 border border-gray-100 shadow-md hover:shadow-xl"
              }`}
              style={{
                backgroundColor: plan.featured ? '#2C6035' : '#FFFFFF',
                width: '100%',
                maxWidth: '370px',
                minHeight: '480px',
              }}
            >
              {/* TOP CONTENT SECTION */}
              <div className="flex flex-col shrink-0">
                {plan.heading ? (
                  <h4
                    className="text-2xl sm:text-3xl font-bold mb-1"
                    style={{ color: plan.featured ? 'white' : '#2C6035' }}
                  >
                    {plan.heading}
                  </h4>
                ) : (
                  <h3
                    className="text-2xl sm:text-3xl font-bold tracking-wider uppercase mb-3"
                    style={{ color: plan.featured ? 'white' : '#2C6035' }}
                  >
                    {plan.name}
                  </h3>
                )}

                {plan.heading ? (
                  <h3
                    className="text-xs sm:text-sm font-semibold tracking-wider uppercase mb-1"
                    style={{ color: plan.featured ? 'white' : '#2C6035' }}
                  >
                    {plan.name}
                  </h3>
                ) : (
                  <p
                    className="text-sm leading-relaxed font-normal"
                    style={{ color: plan.featured ? 'rgba(255, 255, 255, 0.92)' : '#5A6E75' }}
                  >
                    {plan.description}
                  </p>
                )}
              </div>

              {/* UNIFORM DIVIDER LINE ACROSS ALL CARDS */}
              <div
                className="h-px w-full my-6 shrink-0"
                style={{
                  backgroundColor: plan.featured
                    ? 'rgba(255, 255, 255, 0.25)'
                    : 'rgba(44, 96, 53, 0.18)',
                }}
              />

              {/* LOWER CONTENT SECTION - SPACIOUS & FREELY FITTING */}
              <div className="flex-1 flex flex-col justify-center min-h-0">
                {plan.features.length > 0 ? (
                  <ul className="space-y-4 sm:space-y-5">
                    {plan.features.map((f, idx) => (
                      <motion.li
                        key={f}
                        className="flex items-center gap-3.5 sm:gap-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                            plan.featured ? 'bg-white' : 'bg-[#2C6035]'
                          }`}
                        >
                          <Check
                            size={14}
                            className={plan.featured ? "text-[#2C6035]" : "text-white"}
                          />
                        </span>
                        <span
                          style={{ color: plan.featured ? 'white' : '#2D3748' }}
                          className="text-sm font-medium leading-relaxed"
                        >
                          {f}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                ) : (
                  <p
                    className="text-sm leading-relaxed font-normal"
                    style={{ color: plan.featured ? 'rgba(255, 255, 255, 0.92)' : '#5A6E75' }}
                  >
                    {plan.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      <p className="mt-8 text-center font-poppins text-xl font-semibold text-[#4B4A4A] md:text-2xl">
        For Costing Get In Touch with us
      </p>
    </motion.section>
  );
}
