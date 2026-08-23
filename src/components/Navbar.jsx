import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, Menu } from "lucide-react";

export default function Navbar() {
  const [productsOpen, setProductsOpen] = useState(false);
  const [plansOpen, setPlansOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobilePlansOpen, setMobilePlansOpen] = useState(false);
  const [isLightBg, setIsLightBg] = useState(false);
  const [headerOpacity, setHeaderOpacity] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();

  const productsTimeoutRef = useRef(null);
  const plansTimeoutRef = useRef(null);
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const hamburgerRef = useRef(null);

  const isActive = (path) => location.pathname === path;

  // Close dropdowns on route change
  useEffect(() => {
    setProductsOpen(false);
    setPlansOpen(false);
    setMobileProductsOpen(false);
    setMobilePlansOpen(false);
    setMobileMenuOpen(false);
  }, [location]);

  // Reset mobile submenus when main mobile menu closes
  useEffect(() => {
    if (!mobileMenuOpen) {
      setMobileProductsOpen(false);
      setMobilePlansOpen(false);
    }
  }, [mobileMenuOpen]);

  // Background luminance sampling — desktop nav pill + mobile fixed logo/hamburger auto color
  useEffect(() => {
    const sampleLuminanceAt = (x, y, excludeRefs) => {
      const els = document.elementsFromPoint(x, y);
      const underlyingEl = els.find(
        (el) => !excludeRefs.some((r) => r.current && r.current.contains(el)) && el !== document.documentElement && el !== document.body
      );
      if (!underlyingEl) return null;
      let currentEl = underlyingEl;
      while (currentEl && currentEl !== document.body) {
        const style = window.getComputedStyle(currentEl);
        const bgColor = style.backgroundColor;
        if (bgColor && bgColor !== "rgba(0, 0, 0, 0)" && bgColor !== "transparent") {
          const rgb = bgColor.match(/\d+/g);
          if (rgb && rgb.length >= 3) {
            const r = parseInt(rgb[0], 10);
            const g = parseInt(rgb[1], 10);
            const b = parseInt(rgb[2], 10);
            const brightness = (r * 299 + g * 587 + b * 114) / 1000;
            return brightness > 145;
          }
        }
        currentEl = currentEl.parentElement;
      }
      return null;
    };

    const checkBackgroundLuminance = () => {
      const isMobile = window.innerWidth < 768;

      if (isMobile) {
        // Sample at fixed mobile logo/hamburger position for accurate auto switching
        const sampleRef = logoRef.current || hamburgerRef.current;
        if (sampleRef) {
          const rect = sampleRef.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const result = sampleLuminanceAt(centerX, centerY, [logoRef, hamburgerRef, navRef]);
          if (result !== null) {
            setIsLightBg(result);
            return;
          }
        }
        // Fallback: hero-height heuristic on home
        if (location.pathname === "/") {
          const scrollY = window.scrollY;
          const heroHeight = window.innerHeight;
          setIsLightBg(scrollY >= heroHeight * 0.35);
        } else {
          setIsLightBg(true);
        }
        return;
      }

      // Desktop: sample at nav pill center
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const result = sampleLuminanceAt(centerX, centerY, [navRef, logoRef, hamburgerRef]);
        if (result !== null) {
          setIsLightBg(result);
          return;
        }
      }

      if (location.pathname === "/") {
        const scrollY = window.scrollY;
        const heroHeight = window.innerHeight;
        setIsLightBg(scrollY >= heroHeight * 0.8);
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

  // Mobile + desktop header: fixed throughout flow (no hide on scroll), keep opacity 1
  useEffect(() => {
    setHeaderOpacity(1);
  }, [mobileMenuOpen]);

  const handleProductsEnter = () => {
    if (productsTimeoutRef.current) clearTimeout(productsTimeoutRef.current);
    setProductsOpen(true);
  };
  const handleProductsLeave = () => {
    productsTimeoutRef.current = setTimeout(() => setProductsOpen(false), 200);
  };
  const handlePlansEnter = () => {
    if (plansTimeoutRef.current) clearTimeout(plansTimeoutRef.current);
    setPlansOpen(true);
  };
  const handlePlansLeave = () => {
    plansTimeoutRef.current = setTimeout(() => setPlansOpen(false), 200);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    const scrollToHero = () => {
      const hero = document.getElementById("hero");
      if (hero) hero.scrollIntoView({ behavior: "smooth", block: "start" });
      else window.scrollTo({ top: 0, behavior: "smooth" });
    };
    if (location.pathname === "/") scrollToHero();
    else { navigate("/"); setTimeout(scrollToHero, 150); }
  };

  const handlePackagePlanClick = (selectedTab) => (e) => {
    e.preventDefault();
    setPlansOpen(false);
    window.dispatchEvent(new CustomEvent("setPackagePlanTab", { detail: { tab: selectedTab } }));
    const target = document.getElementById("package-plans");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", `/#package-plans?tab=${selectedTab}`);
    } else {
      navigate(`/#package-plans?tab=${selectedTab}`);
      setTimeout(() => {
        const el = document.getElementById("package-plans");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        else window.scrollTo({ top: 0, behavior: "smooth" });
      }, 150);
    }
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* Logo — fixed only on mobile, absolute on desktop, auto switches Main ↔ Black */}
      <div
        ref={logoRef}
        className="fixed top-4 left-4 md:absolute md:top-5 md:left-12 z-40 transition-colors duration-300 will-change-transform"
      >
        <Link to="/#hero" onClick={handleLogoClick}>
          <img
            src={isLightBg ? "/images/Black AspiRE Logo.png" : "/images/AspiRE Main Logo.png"}
            alt="AspiRE - Digitising Real Estate"
            className="h-12 md:h-20 w-auto object-contain drop-shadow-md transition-all duration-300"
          />
        </Link>
      </div>

      {/* Mobile hamburger — fixed to screen even before expansion, throughout flow, auto color matches desktop navbar luminance */}
      <div
        ref={hamburgerRef}
        className="md:hidden fixed top-4 right-4 z-50 transition-colors duration-300"
      >
        <button
          className={`flex items-center justify-center p-1.5 rounded-full transition-all duration-300 ${isLightBg ? "text-[#2C6035] bg-white/90 backdrop-blur-md shadow-md border border-white/60" : "text-white bg-black/20 backdrop-blur-md border border-white/25 shadow-md"}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menu">
          <Menu size={22} strokeWidth={2.5} />
        </button>

        {/* Mobile dropdown — 3 main tabs: Home, Our Products (click), Package Plan (click) — content color auto switches white↔green */}
        <div
          className={`absolute top-full right-0 mt-3 w-56 rounded-xl border shadow-2xl transition-all duration-200 ${mobileMenuOpen ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"}`}
          style={{
            backgroundColor: isLightBg ? "rgba(255,255,255,0.96)" : "rgba(255,255,255,0.12)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderColor: isLightBg ? "rgba(44,96,53,0.14)" : "rgba(255,255,255,0.25)",
          }}
        >
          <div className="p-2 flex flex-col gap-1 rounded-xl">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg text-sm font-bold transition-colors ${isLightBg ? "text-[#2C6035] hover:bg-[#2C6035]/10" : "text-white hover:bg-white/20"}`}
              onClick={() => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            >
              Home
            </Link>

            {/* Our Products — click to expand only, no auto hover */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-bold transition-colors ${isLightBg ? "text-[#2C6035] hover:bg-[#2C6035]/10" : "text-white hover:bg-white/20"}`}
              >
                Our Products <ChevronDown size={14} className={`transition-transform duration-200 ${mobileProductsOpen ? "rotate-180" : ""}`} />
              </button>
              <div className={`grid transition-all duration-200 ease-in-out ${mobileProductsOpen ? "grid-rows-[1fr] opacity-100 mt-1" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                  <div
                    className="rounded-lg overflow-hidden"
                    style={{
                      backgroundColor: isLightBg ? "rgba(44,96,53,0.08)" : "rgba(0,0,0,0.25)",
                      backdropFilter: "blur(12px)",
                      border: isLightBg ? "1px solid rgba(44,96,53,0.1)" : "none",
                    }}
                  >
                    <Link
                      to="/engineering"
                      className={`block px-4 py-2 text-xs font-bold transition-colors ${isLightBg ? "text-[#2C6035] hover:bg-[#2C6035]/10" : "text-white hover:bg-white/15"}`}
                      onClick={() => { setMobileProductsOpen(false); setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    >
                      AspiRE Engineering
                    </Link>
                    <Link
                      to="/sales"
                      className={`block px-4 py-2 text-xs font-bold transition-colors ${isLightBg ? "text-[#2C6035] hover:bg-[#2C6035]/10" : "text-white hover:bg-white/15"}`}
                      onClick={() => { setMobileProductsOpen(false); setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    >
                      AspiRE Sales
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Package Plan — click to expand only, no auto hover */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setMobilePlansOpen(!mobilePlansOpen)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-bold transition-colors ${isLightBg ? "text-[#2C6035] hover:bg-[#2C6035]/10" : "text-white hover:bg-white/20"}`}
              >
                Package Plan <ChevronDown size={14} className={`transition-transform duration-200 ${mobilePlansOpen ? "rotate-180" : ""}`} />
              </button>
              <div className={`grid transition-all duration-200 ease-in-out ${mobilePlansOpen ? "grid-rows-[1fr] opacity-100 mt-1" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                  <div
                    className="rounded-lg overflow-hidden"
                    style={{
                      backgroundColor: isLightBg ? "rgba(44,96,53,0.08)" : "rgba(0,0,0,0.25)",
                      backdropFilter: "blur(12px)",
                      border: isLightBg ? "1px solid rgba(44,96,53,0.1)" : "none",
                    }}
                  >
                    <a
                      href="/#package-plans?tab=engineering"
                      className={`block px-4 py-2 text-xs font-bold transition-colors cursor-pointer ${isLightBg ? "text-[#2C6035] hover:bg-[#2C6035]/10" : "text-white hover:bg-white/15"}`}
                      onClick={(e) => { e.preventDefault(); setMobilePlansOpen(false); setMobileMenuOpen(false); handlePackagePlanClick("engineering")(e); }}
                    >
                      Engineering
                    </a>
                    <a
                      href="/#package-plans?tab=sales"
                      className={`block px-4 py-2 text-xs font-bold transition-colors cursor-pointer ${isLightBg ? "text-[#2C6035] hover:bg-[#2C6035]/10" : "text-white hover:bg-white/15"}`}
                      onClick={(e) => { e.preventDefault(); setMobilePlansOpen(false); setMobileMenuOpen(false); handlePackagePlanClick("sales")(e); }}
                    >
                      Sales
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <a href="#contact" className="px-3 py-2 rounded-lg text-sm font-bold text-white bg-[#2C6035] hover:bg-[#245029] transition-colors text-center" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); handleContactClick(e); }}>Contact Us</a>
          </div>
        </div>
      </div>

      {/* Nav pill — hidden on mobile, visible on desktop */}
      <nav ref={navRef} className="hidden md:block fixed top-3 md:top-5 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-lg">
        <div
          className="flex items-center justify-between px-3 py-1.5 rounded-full border border-white/40 transition-all duration-300"
          style={{
            backgroundColor: isLightBg ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.07)",
            backdropFilter: "blur(12px) saturate(130%)",
            WebkitBackdropFilter: "blur(12px) saturate(130%)",
            boxShadow: "0 6px 20px rgba(0,0,0,0.14), inset 0 1px 1px rgba(255,255,255,0.45)",
          }}
        >
          <div className="flex items-center justify-evenly flex-1 text-[10px] md:text-[13px] font-medium px-0.5 md:px-2 gap-0.5 md:gap-2">
            <Link
              to="/"
              className={`px-1.5 md:px-2.5 py-1 rounded-full transition-all duration-200 whitespace-nowrap ${
                isActive("/")
                  ? isLightBg ? "text-[#383838] font-bold" : "text-[#D1D5DB] font-bold"
                  : isLightBg ? "text-[#2C6035]" : "text-white"
              }`}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Home
            </Link>

            {/* Our Products Dropdown */}
            <div className="relative" onMouseEnter={handleProductsEnter} onMouseLeave={handleProductsLeave}>
              <button className={`flex items-center gap-0.5 md:gap-1 transition-all duration-200 px-1.5 md:px-2.5 py-1 rounded-full cursor-pointer whitespace-nowrap ${
                productsOpen || location.pathname === "/engineering" || location.pathname === "/sales"
                  ? isLightBg ? "text-[#383838] font-bold" : "text-[#D1D5DB] font-bold"
                  : isLightBg ? "text-[#2C6035]" : "text-white"
              }`}>
                Our Products <ChevronDown size={13} className={`transition-transform duration-200 ${productsOpen ? "rotate-180" : ""}`} />
              </button>
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 mt-3.5 z-50 w-max before:absolute before:-top-5 before:left-0 before:right-0 before:h-5 before:content-[''] transition-all duration-200 ${productsOpen ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"}`}
                onMouseEnter={handleProductsEnter}
                onMouseLeave={handleProductsLeave}
              >
                  <div className="rounded-2xl p-1.5 flex flex-col gap-0.5 text-xs border shadow-2xl min-w-[160px]"
                    style={{
                      backgroundColor: isLightBg ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.25)",
                      backdropFilter: "blur(20px) saturate(180%)",
                      WebkitBackdropFilter: "blur(20px) saturate(180%)",
                      borderColor: isLightBg ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.25)",
                      boxShadow: "0 10px 30px 0 rgba(0,0,0,0.18), inset 0 1px 1px 0 rgba(255,255,255,0.3)",
                    }}>
                    <Link to="/engineering" className={`px-3.5 py-1.5 rounded-xl font-bold text-left whitespace-nowrap block hover:bg-white/20 transition-all duration-200 ${
                      isActive("/engineering") ? isLightBg ? "text-gray-900 bg-white/40" : "text-white bg-white/15"
                      : isLightBg ? "text-[#2C6035] hover:text-gray-900" : "text-white/90 hover:text-white"
                    }`} onClick={() => { setProductsOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                      AspiRE Engineering
                    </Link>
                    <Link to="/sales" className={`px-3.5 py-1.5 rounded-xl font-bold text-left whitespace-nowrap block hover:bg-white/20 transition-all duration-200 ${
                      isActive("/sales") ? isLightBg ? "text-gray-900 bg-white/40" : "text-white bg-white/15"
                      : isLightBg ? "text-[#2C6035] hover:text-gray-900" : "text-white/90 hover:text-white"
                     }`} onClick={() => { setProductsOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                      AspiRE Sales
                    </Link>
                  </div>
               </div>
             </div>

            {/* Package Plan Dropdown */}
            <div className="relative" onMouseEnter={handlePlansEnter} onMouseLeave={handlePlansLeave}>
              <button className={`flex items-center gap-0.5 md:gap-1 transition-all duration-200 px-1.5 md:px-2.5 py-1 rounded-full cursor-pointer whitespace-nowrap ${
                plansOpen || location.hash.includes("package-plans")
                  ? isLightBg ? "text-[#383838] font-bold" : "text-[#D1D5DB] font-bold"
                  : isLightBg ? "text-[#2C6035]" : "text-white"
              }`}>
                Package Plan <ChevronDown size={13} className={`transition-transform duration-200 ${plansOpen ? "rotate-180" : ""}`} />
              </button>
              {plansOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3.5 z-50 w-max before:absolute before:-top-5 before:left-0 before:right-0 before:h-5 before:content-['']"
                  onMouseEnter={handlePlansEnter}
                  onMouseLeave={handlePlansLeave}
                >
                  <div className="rounded-2xl p-1.5 flex flex-col gap-0.5 text-xs border shadow-2xl min-w-[140px]"
                    style={{
                      backgroundColor: isLightBg ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.25)",
                      backdropFilter: "blur(20px) saturate(180%)",
                      WebkitBackdropFilter: "blur(20px) saturate(180%)",
                      borderColor: isLightBg ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.25)",
                      boxShadow: "0 10px 30px 0 rgba(0,0,0,0.18), inset 0 1px 1px 0 rgba(255,255,255,0.3)",
                    }}>
                    <a href="/#package-plans?tab=engineering" className={`px-3.5 py-1.5 rounded-xl font-bold text-left whitespace-nowrap block cursor-pointer hover:bg-white/20 transition-all duration-200 ${isLightBg ? "text-[#2C6035] hover:text-gray-900" : "text-white/90 hover:text-white"}`} onClick={handlePackagePlanClick("engineering")}>
                      Engineering
                    </a>
                    <a href="/#package-plans?tab=sales" className={`px-3.5 py-1.5 rounded-xl font-bold text-left whitespace-nowrap block cursor-pointer hover:bg-white/20 transition-all duration-200 ${isLightBg ? "text-[#2C6035] hover:text-gray-900" : "text-white/90 hover:text-white"}`} onClick={handlePackagePlanClick("sales")}>
                      Sales
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          <a href="#contact" onClick={handleContactClick}
            className="text-[10px] md:text-xs font-semibold text-white rounded-full px-2.5 md:px-4 py-1.5 transition-all duration-200 hover:brightness-125 shrink-0 shadow-md border border-white/20 cursor-pointer whitespace-nowrap"
            style={{ backgroundColor: "#2C6035" }}>
            Contact Us
          </a>
        </div>
      </nav>
    </>
  );
}
