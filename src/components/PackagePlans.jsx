import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "./SectionHeading";

// Exchange rate baseline (1 USD = 95.5 INR => ₹16,000 / 95.5 ≈ $167.53)
const INR_PER_USD_BASE = 95.5;
const USD_MULTIPLIER = 5;

function convertInrToUsd(inrAmount) {
  // Step 1: Convert INR to base USD
  const baseUsd = inrAmount / INR_PER_USD_BASE;
  // Step 2: Multiply the USD amount by 5
  const scaledUsd = baseUsd * USD_MULTIPLIER;
  // Step 3: Round off (>= .5 rounds up, < .5 rounds down)
  return Math.max(1, Math.round(scaledUsd));
}

function pricingFromINR(inrMonthly, inrAdvance, advanceMonths) {
  const usdMonthly = convertInrToUsd(inrMonthly);
  const usdAdvance = convertInrToUsd(inrAdvance);

  return {
    IN: {
      monthly: inrMonthly,
      advance: inrAdvance,
      advanceMonths,
      currency: "INR",
      taxNote: "+ 18% GST",
    },
    US: {
      monthly: usdMonthly,
      advance: usdAdvance,
      advanceMonths,
      currency: "USD",
      taxNote: "+ applicable taxes",
    },
    DEFAULT: {
      monthly: usdMonthly,
      advance: usdAdvance,
      advanceMonths,
      currency: "USD",
      taxNote: "+ applicable taxes",
    },
  };
}

const plansData = {
  engineering: [
    {
      name: "BASIC PLAN",
      description:
        "Perfect for small teams, the Basic Package provides essential tools to manage construction projects efficiently, keeping you organized without breaking the budget.",
      features: ["Upto 7 Users"],
      pricing: pricingFromINR(16000, 96000, 6),
      featured: false,
    },
    {
      name: "PREMIUM PLAN",
      description:
        "Designed for growing businesses. The Premium Package offers advanced features and comprehensive tools to take your construction management to the next level.",
      features: ["Upto 15 Users", "AI Project Planner"],
      pricing: pricingFromINR(25000, 140000, 6),
      featured: true,
    },
    {
      name: "ENTERPRISE",
      description:
        "Engineered for enterprise-level excellence, the Premium Package is designed to meet the complex needs of large-scale construction businesses. It offers advanced features to streamline operations, enhance productivity, and provide detailed analytics for informed decision-making.",
      features: ["For 25 Users", "AI Project Planner"],
      pricing: pricingFromINR(37500, 220000, 6),
      featured: false,
    },
  ],
  sales: [
    {
      name: "PER USER PLAN",
      description:
        "Perfect for sales teams, the Per User Package provides essential tools to manage leads, bookings, payments, and customer documents with ease.",
      features: ["Lead Management", "Unlimited Projects", "Auto Document Generation"],
      pricing: pricingFromINR(5000, 15000, 3),
      featured: false,
    },
    {
      name: "ENTERPRISE",
      heading: "Get in touch",
      description:
        "Engineered for enterprise-level excellence, the Premium Package is designed to meet the complex needs of large-scale construction businesses. It offers advanced features to streamline operations, enhance productivity, and provide detailed analytics for informed decision-making.",
      features: [],
      featured: true,
    },
  ],
};

async function fetchWithTimeout(url, ms = 2500) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), ms);
  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(t);
    if (!res.ok) throw new Error(`${url} ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(t);
  }
}

export default function PackagePlans({ defaultTab = "engineering" }) {
  const [tab, setTab] = useState(defaultTab);
  const [countryCode, setCountryCode] = useState("DEFAULT");
  const [isLocationLoading, setIsLocationLoading] = useState(true);
  const location = useLocation();
  const plans = plansData[tab];

  // Robust single-step IP detection with fallbacks & session caching
  useEffect(() => {
    let cancelled = false;
    async function detectCountry() {
      // Manual test parameter: ?mockCountry=IN | US | DE
      // const mock = new URLSearchParams(window.location.search).get("mockCountry");
      // if (mock) {
      //   const c = mock.toUpperCase();
      //   const norm = c === "IN" ? "IN" : c === "US" ? "US" : "DEFAULT";
      //   sessionStorage.setItem("user_country_code", norm);
      //   if (!cancelled) {
      //     setCountryCode(norm);
      //     setIsLocationLoading(false);
      //   }
      //   return;
      // }

      const cachedCountry = sessionStorage.getItem("user_country_code");
      if (cachedCountry) {
        if (!cancelled) {
          setCountryCode(cachedCountry);
          setIsLocationLoading(false);
        }
      }

      let fallbackTimer = null;
      if (!cachedCountry) {
        fallbackTimer = setTimeout(() => {
          if (!cancelled) {
            setCountryCode("DEFAULT");
            setIsLocationLoading(false);
          }
        }, 3500);
      }

      try {
        let code = null;
        let ip = null;
        try {
          const d1 = await fetchWithTimeout("https://ipapi.co/json/", 2500);
          code = d1.country_code || d1.country;
          ip = d1.ip;
        } catch {}
        if (!code) {
          try {
            const d2 = await fetchWithTimeout("https://ipwho.is/json/", 2500);
            code = d2.country_code || d2.country;
            ip = d2.ip;
          } catch {}
        }
        if (!code) {
          try {
            const d3 = await fetchWithTimeout("https://freeipapi.com/api/json", 2500);
            code = d3.countryCode || d3.country_code;
            ip = d3.ip || d3.ipAddress;
          } catch {}
        }
        clearTimeout(fallbackTimer);
        if (cancelled) return;

        const upper = (code || "DEFAULT").toUpperCase();
        const normalized = upper === "IN" ? "IN" : upper === "US" ? "US" : "DEFAULT";

        if (ip) sessionStorage.setItem("user_ip", ip);
        sessionStorage.setItem("user_country_code", normalized);
        setCountryCode(normalized);
      } catch {
        clearTimeout(fallbackTimer);
        if (!cancelled) setCountryCode("DEFAULT");
      } finally {
        clearTimeout(fallbackTimer);
        if (!cancelled) setIsLocationLoading(false);
      }
    }

    detectCountry();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabParam = urlParams.get("tab");
    if (tabParam === "engineering" || tabParam === "sales") setTab(tabParam);
  }, [location.search]);

  useEffect(() => {
    const handleTabChange = (e) => {
      if (e.detail?.tab) setTab(e.detail.tab);
    };
    window.addEventListener("setPackagePlanTab", handleTabChange);
    return () => window.removeEventListener("setPackagePlanTab", handleTabChange);
  }, []);

  const formatPrice = (amount, currency) => {
    const locale = countryCode === "IN" ? "en-IN" : "en-US";
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <motion.section
      id="package-plans"
      className="px-4 sm:px-6 md:px-10 lg:px-16 pt-20 md:pt-28 relative overflow-hidden scroll-mt-24 pb-12 md:pb-16 vector-on-light blend-to-light fade-clear-top"
      style={{ minHeight: "100svh" }}
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
              className={`relative z-10 px-5 sm:px-8 py-2.5 sm:py-3 rounded-xl text-sm md:text-base font-semibold transition-colors duration-300 cursor-pointer capitalize ${
                tab === t ? "text-white" : "text-[#055938]"
              }`}
            >
              {tab === t && (
                <motion.div
                  layoutId="activePlanTabPill"
                  className="absolute inset-0 bg-[#055938] rounded-xl z-[-1]"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Plan cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          className={`mx-auto grid w-full max-w-[1240px] gap-5 sm:gap-6 lg:gap-8 ${
            tab === "sales"
              ? "grid-cols-1 md:grid-cols-2 max-w-[800px]"
              : "grid-cols-1 md:grid-cols-3"
          } md:items-stretch justify-items-center`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {plans.map((plan, index) => {
            const planPricing = plan.pricing
              ? plan.pricing[countryCode] || plan.pricing.DEFAULT
              : null;

            return (
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
                style={{ maxWidth: "380px", minHeight: "440px" }}
              >
                <div className="flex flex-col flex-1">
                  {plan.heading ? (
                    <>
                      <h3
                        className={`text-sm sm:text-base font-medium mb-1 ${
                          plan.featured ? "text-white/80" : "text-[#055938]"
                        }`}
                      >
                        Enterprise
                      </h3>
                      <h2
                        className={`text-2xl sm:text-3xl font-bold mb-5 ${
                          plan.featured ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {plan.heading}
                      </h2>
                      <div
                        className={`h-px w-full mb-5 ${
                          plan.featured ? "bg-white/20" : "bg-gray-200/80"
                        }`}
                      />
                      <p
                        className={`text-sm leading-relaxed font-normal ${
                          plan.featured ? "text-white/85" : "text-gray-500"
                        }`}
                      >
                        {plan.description}
                      </p>
                      {planPricing && tab === "engineering" && plan.name === "ENTERPRISE" && (
                        <>
                          <p
                            className={`text-xs font-medium mt-3 ${
                              plan.featured ? "text-white/80" : "text-gray-500"
                            }`}
                          >
                            Starting at
                          </p>
                          <div className="mt-1">
                            <div className="flex items-baseline gap-1.5 flex-wrap">
                              <span
                                className={`text-3xl sm:text-4xl font-bold tracking-tight ${
                                  plan.featured ? "text-white" : "text-gray-900"
                                }`}
                              >
                                {isLocationLoading ? "..." : formatPrice(planPricing.monthly, planPricing.currency)}
                              </span>
                              <span
                                className={`text-[11px] sm:text-xs font-medium ${
                                  plan.featured ? "text-white/80" : "text-gray-500"
                                }`}
                              >
                                {planPricing.taxNote}
                              </span>
                              <span
                                className={`text-xs sm:text-sm font-medium ${
                                  plan.featured ? "text-white/80" : "text-gray-500"
                                }`}
                              >
                                / month
                              </span>
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <h3
                        className={`text-lg sm:text-xl font-semibold tracking-wide uppercase mb-2 ${
                          plan.featured ? "text-white" : "text-[#055938]"
                        }`}
                      >
                        {plan.name}
                      </h3>
                      {tab === "engineering" && plan.name === "ENTERPRISE" && (
                        <p
                          className={`text-xs font-medium mb-2 ${
                            plan.featured ? "text-white/80" : "text-gray-500"
                          }`}
                        >
                          Starting at
                        </p>
                      )}

                      {/* Pricing Tag */}
                      {planPricing && (
                        <div className="mb-4">
                          <div className="flex items-baseline gap-1.5 flex-wrap">
                            <span
                              className={`text-3xl sm:text-4xl font-bold tracking-tight ${
                                plan.featured ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {isLocationLoading
                                ? "..."
                                : formatPrice(planPricing.monthly, planPricing.currency)}
                            </span>
                            <span
                              className={`text-[11px] sm:text-xs font-medium ${
                                plan.featured ? "text-white/80" : "text-gray-500"
                              }`}
                            >
                              {planPricing.taxNote}
                            </span>
                            <span
                              className={`text-xs sm:text-sm font-medium ${
                                plan.featured ? "text-white/80" : "text-gray-500"
                              }`}
                            >
                              / month
                            </span>
                          </div>
                        </div>
                      )}

                      <p
                        className={`text-sm leading-relaxed font-normal mb-5 ${
                          plan.featured ? "text-white/85" : "text-gray-500"
                        }`}
                      >
                        {plan.description}
                      </p>
                      <div
                        className={`h-px w-full mb-5 ${
                          plan.featured ? "bg-white/20" : "bg-gray-200/80"
                        }`}
                      />
                      <ul className="space-y-3 sm:space-y-4 mt-2">
                        {plan.features.map((f) => (
                          <li key={f} className="flex items-center gap-3">
                            <span
                              className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                                plan.featured ? "bg-white" : "bg-[#055938]"
                              }`}
                            >
                              <Check
                                size={12}
                                strokeWidth={2.5}
                                className={plan.featured ? "text-[#055938]" : "text-white"}
                              />
                            </span>
                            <span
                              className={`text-sm font-normal leading-snug ${
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
                <div className="mt-4">
                  {tab === "engineering" && plan.name === "ENTERPRISE" && (
                    <p className="text-[11px] leading-snug text-gray-600 mb-1">For user more than 25, kindly connect with us.</p>
                  )}
                  <p className={`text-[11px] italic leading-snug ${plan.featured ? "text-white" : "text-gray-500"}`}>
                    *{planPricing ? `${planPricing.advanceMonths} months` : tab === "sales" ? "3 months" : "6 months"} advance will be applicable
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        </AnimatePresence>

      <p className="mt-10 md:mt-12 text-center font-poppins text-base sm:text-lg md:text-xl font-semibold text-[#4B4A4A]">
        For Custom Enterprise Costing Get In Touch with us
      </p>
    </motion.section>
  );
}