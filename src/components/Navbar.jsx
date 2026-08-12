import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";

export default function Navbar() {
  const [productsOpen, setProductsOpen] = useState(false);
  const [plansOpen, setPlansOpen] = useState(false);
  const [isLightBg, setIsLightBg] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const productsTimeoutRef = useRef(null);
  const plansTimeoutRef = useRef(null);
  const navRef = useRef(null);

  const isActive = (path) => location.pathname === path;

  // Background luminance sampling / section background detection
  useEffect(() => {
    const checkBackgroundLuminance = () => {
      if (!navRef.current) return;
      const rect = navRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Temporarily hide pointer-events element check target or use elementFromPoint below navbar
      const elements = document.elementsFromPoint(centerX, centerY);
      const underlyingEl = elements.find(
        (el) => !navRef.current.contains(el) && el !== document.documentElement && el !== document.body
      );

      if (underlyingEl) {
        // Check background color or section type
        let currentEl = underlyingEl;
        while (currentEl && currentEl !== document.body) {
          const style = window.getComputedStyle(currentEl);
          const bgImg = style.backgroundImage;
          const bgColor = style.backgroundColor;

          // Check if background image contains light background image
          if (bgImg && (bgImg.includes("white_background.jpg") || bgImg.includes("white"))) {
            setIsLightBg(true);
            return;
          }

          // Check RGB luminance if solid bg
          if (bgColor && bgColor !== "rgba(0, 0, 0, 0)" && bgColor !== "transparent") {
            const rgb = bgColor.match(/\d+/g);
            if (rgb && rgb.length >= 3) {
              const r = parseInt(rgb[0], 10);
              const g = parseInt(rgb[1], 10);
              const b = parseInt(rgb[2], 10);
              // Perceptual brightness formula
              const brightness = (r * 299 + g * 587 + b * 114) / 1000;
              setIsLightBg(brightness > 145);
              return;
            }
          }
          currentEl = currentEl.parentElement;
        }
      }

      // Fallback based on scroll position on home page (Hero is dark 0-800px, etc.)
      if (location.pathname === "/") {
        const scrollY = window.scrollY;
        // Hero section is dark, sections like Why AspiRE / Package Plans / Clients are light
        const heroHeight = window.innerHeight;
        if (scrollY < heroHeight * 0.8) {
          setIsLightBg(false);
        } else {
          setIsLightBg(true);
        }
      } else {
        setIsLightBg(true);
      }
    };

    checkBackgroundLuminance();
    window.addEventListener("scroll", checkBackgroundLuminance, { passive: true });
    window.addEventListener("resize", checkBackgroundLuminance, { passive: true });

    return () => {
      window.removeEventListener("scroll", checkBackgroundLuminance);
      window.removeEventListener("resize", checkBackgroundLuminance);
    };
  }, [location]);

  // Seamless hover state handlers with hysteresis delay to prevent flickering
  const handleProductsEnter = () => {
    if (productsTimeoutRef.current) clearTimeout(productsTimeoutRef.current);
    setProductsOpen(true);
  };

  const handleProductsLeave = () => {
    productsTimeoutRef.current = setTimeout(() => {
      setProductsOpen(false);
    }, 200);
  };

  const handlePlansEnter = () => {
    if (plansTimeoutRef.current) clearTimeout(plansTimeoutRef.current);
    setPlansOpen(true);
  };

  const handlePlansLeave = () => {
    plansTimeoutRef.current = setTimeout(() => {
      setPlansOpen(false);
    }, 200);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();

    const scrollToHero = () => {
      const hero = document.getElementById("hero");
      if (hero) {
        hero.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    if (location.pathname === "/") {
      scrollToHero();
    } else {
      navigate("/");
      setTimeout(scrollToHero, 150);
    }
  };

  // Smooth navigation to package plan section with selected tab
  const handlePackagePlanClick = (selectedTab) => (e) => {
    e.preventDefault();
    setPlansOpen(false);

    // Fire event to switch tab immediately in PackagePlans component
    window.dispatchEvent(
      new CustomEvent("setPackagePlanTab", { detail: { tab: selectedTab } })
    );

    const target = document.getElementById("package-plans");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", `/#package-plans?tab=${selectedTab}`);
    } else {
      navigate(`/#package-plans?tab=${selectedTab}`);
      setTimeout(() => {
        const el = document.getElementById("package-plans");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 150);
    }
  };

  return (
    <>
      {/* Logo — NOT fixed, scrolls normally with page */}
      <div className="absolute top-5 left-6 md:top-5 md:left-12 z-40">
        <Link to="/#hero" onClick={handleLogoClick}>
          <img
            src="/images/AspiRE Main Logo.png"
            alt="AspiRE - Digitising Real Estate"
            className="h-14 md:h-20 w-auto object-contain drop-shadow-md"
          />
        </Link>
      </div>

      {/* Nav pill — fixed top center, oval/capsule with glassmorphism */}
      <nav ref={navRef} className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[85%] max-w-lg">
        <div
          className="flex items-center justify-between px-3 py-1.5 rounded-full border border-white/40 transition-all duration-300"
          style={{
            backgroundColor: isLightBg ? "rgba(255, 255, 255, 0.45)" : "rgba(255, 255, 255, 0.07)",
            backdropFilter: "blur(12px) saturate(130%)",
            WebkitBackdropFilter: "blur(12px) saturate(130%)",
            boxShadow:
              "0 6px 20px rgba(0, 0, 0, 0.14), inset 0 1px 1px rgba(255, 255, 255, 0.45)",
          }}
        >
          {/* Navigation Links */}
          <div className="flex items-center justify-evenly flex-1 text-xs md:text-[13px] font-medium px-1 md:px-2 gap-1 md:gap-2">
            <Link
              to="/"
              className={`px-2.5 py-1 rounded-full transition-all duration-200 ${
                isActive("/")
                  ? isLightBg
                    ? "text-[#383838] font-bold"
                    : "text-[#D1D5DB] font-bold"
                  : isLightBg
                  ? "text-[#2C6035]"
                  : "text-white"
              }`}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Home
            </Link>

            {/* Our Products Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleProductsEnter}
              onMouseLeave={handleProductsLeave}
            >
              <button
                className={`flex items-center gap-1 transition-all duration-200 px-2.5 py-1 rounded-full cursor-pointer ${
                  productsOpen || location.pathname === "/engineering" || location.pathname === "/sales"
                    ? isLightBg
                      ? "text-[#383838] font-bold"
                      : "text-[#D1D5DB] font-bold"
                    : isLightBg
                    ? "text-[#2C6035]"
                    : "text-white"
                }`}
              >
                Our Products{" "}
                <ChevronDown
                  size={13}
                  className={`transition-transform duration-200 ${
                    productsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {productsOpen && (
                /* Absolute wrapper positioned below navbar pill with invisible hover bridge */
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3.5 z-50 w-max before:absolute before:-top-5 before:left-0 before:right-0 before:h-5 before:content-['']"
                  onMouseEnter={handleProductsEnter}
                  onMouseLeave={handleProductsLeave}
                >
                  <div
                    className="rounded-2xl p-1.5 flex flex-col gap-0.5 text-xs border shadow-2xl transition-all duration-300 min-w-[160px]"
                    style={{
                      backgroundColor: isLightBg
                        ? "rgba(255, 255, 255, 0.55)"
                        : "rgba(0, 0, 0, 0.25)",
                      backdropFilter: "blur(20px) saturate(180%)",
                      WebkitBackdropFilter: "blur(20px) saturate(180%)",
                      borderColor: isLightBg ? "rgba(255, 255, 255, 0.6)" : "rgba(255, 255, 255, 0.25)",
                      boxShadow:
                        "0 10px 30px 0 rgba(0, 0, 0, 0.18), inset 0 1px 1px 0 rgba(255, 255, 255, 0.3)",
                    }}
                  >
                    <Link
                      to="/engineering"
                      className={`px-3.5 py-1.5 rounded-xl transition-all duration-200 font-medium text-left whitespace-nowrap block hover:bg-white/20 ${
                        isActive("/engineering")
                          ? isLightBg
                            ? "text-gray-900 font-bold bg-white/40"
                            : "text-white font-bold bg-white/15"
                          : isLightBg
                          ? "text-[#2C6035] hover:text-gray-900"
                          : "text-white/90 hover:text-white"
                      }`}
                      onClick={() => {
                        setProductsOpen(false);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      AspiRE Engineering
                    </Link>
                    <Link
                      to="/sales"
                      className={`px-3.5 py-1.5 rounded-xl transition-all duration-200 font-medium text-left whitespace-nowrap block hover:bg-white/20 ${
                        isActive("/sales")
                          ? isLightBg
                            ? "text-gray-900 font-bold bg-white/40"
                            : "text-white font-bold bg-white/15"
                          : isLightBg
                          ? "text-[#2C6035] hover:text-gray-900"
                          : "text-white/90 hover:text-white"
                      }`}
                      onClick={() => {
                        setProductsOpen(false);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      AspiRE Sales
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Package Plan Dropdown */}
            <div
              className="relative"
              onMouseEnter={handlePlansEnter}
              onMouseLeave={handlePlansLeave}
            >
              <button
                className={`flex items-center gap-1 transition-all duration-200 px-2.5 py-1 rounded-full cursor-pointer ${
                  plansOpen || location.pathname === "/package-plans" || location.hash.includes("package-plans")
                    ? isLightBg
                      ? "text-[#383838] font-bold"
                      : "text-[#D1D5DB] font-bold"
                    : isLightBg
                    ? "text-[#2C6035]"
                    : "text-white"
                }`}
              >
                Package Plan{" "}
                <ChevronDown
                  size={13}
                  className={`transition-transform duration-200 ${
                    plansOpen ? "rotate-180 text-[#383838]" : ""
                  }`}
                />
              </button>

              {plansOpen && (
                /* Absolute wrapper positioned below navbar pill with invisible hover bridge */
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3.5 z-50 w-max before:absolute before:-top-5 before:left-0 before:right-0 before:h-5 before:content-['']"
                  onMouseEnter={handlePlansEnter}
                  onMouseLeave={handlePlansLeave}
                >
                  <div
                    className="rounded-2xl p-1.5 flex flex-col gap-0.5 text-xs border shadow-2xl transition-all duration-300 min-w-[140px]"
                    style={{
                      backgroundColor: isLightBg
                        ? "rgba(255, 255, 255, 0.55)"
                        : "rgba(0, 0, 0, 0.25)",
                      backdropFilter: "blur(20px) saturate(180%)",
                      WebkitBackdropFilter: "blur(20px) saturate(180%)",
                      borderColor: isLightBg ? "rgba(255, 255, 255, 0.6)" : "rgba(255, 255, 255, 0.25)",
                      boxShadow:
                        "0 10px 30px 0 rgba(0, 0, 0, 0.18), inset 0 1px 1px 0 rgba(255, 255, 255, 0.3)",
                    }}
                  >
                    <a
                      href="/#package-plans?tab=engineering"
                      className={`px-3.5 py-1.5 rounded-xl transition-all duration-200 font-medium text-left whitespace-nowrap block cursor-pointer hover:bg-white/20 ${
                        isLightBg
                          ? "text-[#2C6035] hover:text-gray-900"
                          : "text-white/90 hover:text-white"
                      }`}
                      onClick={handlePackagePlanClick("engineering")}
                    >
                      Engineering
                    </a>
                    <a
                      href="/#package-plans?tab=sales"
                      className={`px-3.5 py-1.5 rounded-xl transition-all duration-200 font-medium text-left whitespace-nowrap block cursor-pointer hover:bg-white/20 ${
                        isLightBg
                          ? "text-[#2C6035] hover:text-gray-900"
                          : "text-white/90 hover:text-white"
                      }`}
                      onClick={handlePackagePlanClick("sales")}
                    >
                      Sales
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Contact CTA */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              const contactSection = document.getElementById("contact");
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
            className="text-xs font-semibold text-white rounded-full px-3.5 md:px-4 py-1.5 transition-all duration-200 hover:brightness-125 shrink-0 shadow-md border border-white/20 cursor-pointer"
            style={{ backgroundColor: "#2C6035" }}
          >
            Contact Us
          </a>
        </div>
      </nav>
    </>
  );
}
