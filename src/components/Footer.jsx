import { Facebook, Instagram, Linkedin } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const linkClass = "font-semibold underline decoration-1 transition hover:opacity-100";
  const textColor = { color: "#674646", opacity: 0.8 };
  const iconCircle = "w-9 h-9 rounded-full flex items-center justify-center shrink-0";
  const iconBg = { background: "rgba(4,91,50,0.08)" };

  const scrollToHomeSection = (sectionId) => {
    const target = sectionId ? document.getElementById(sectionId) : document.getElementById("hero");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleHomeNavigation = (e, sectionId) => {
    e.preventDefault();
    if (location.pathname === "/") {
      scrollToHomeSection(sectionId);
    } else {
      navigate("/");
      setTimeout(() => {
        scrollToHomeSection(sectionId);
      }, 150);
    }
  };

  return (
    <footer className="bg-offwhite pt-16 pb-8 px-8 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 max-w-6xl mx-auto">
        {/* Brand + description + email */}
        <div>
          <a href="/#hero" onClick={(e) => handleHomeNavigation(e, "hero")} className="inline-block">
            <img
              src="/images/Black AspiRE Logo.png"
              alt="AspiRE - Digitising Real Estate"
              className="h-16 md:h-20 w-auto object-contain mb-3 hover:opacity-90 transition-opacity cursor-pointer"
            />
          </a>
          <p className="text-sm mt-4" style={textColor}>
            Simplifying construction management, empowering businesses, and
            driving success with innovative solutions.
          </p>
          <p className="text-sm mt-4 font-semibold whitespace-nowrap" style={textColor}>
            Email :{" "}
            <a
              href="mailto:inquiry@coppercodes.com"
              className="hover:underline cursor-pointer"
            >
              inquiry@coppercodes.com
            </a>
          </p>
        </div>

        {/* Social icons + labels */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className={iconCircle} style={iconBg}>
              <Facebook size={16} color="#045B32" />
            </span>
            <a
              href="https://www.facebook.com/share/1cUDLLHhD4/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
              style={textColor}
            >
              Facebook
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className={iconCircle} style={iconBg}>
              <Instagram size={16} color="#045B32" />
            </span>
            <a
              href="https://www.instagram.com/aspire.cloud?igsh=b2kzaTNoanlyNXpi"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
              style={textColor}
            >
              Instagram
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className={iconCircle} style={iconBg}>
              <Linkedin size={16} color="#045B32" />
            </span>
            <a
              href="https://www.linkedin.com/company/aspirecloud/"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
              style={textColor}
            >
              LinkedIn
            </a>
          </div>
        </div>

        {/* Nav links */}
        <div className="flex flex-col gap-4 text-base">
          <Link to="/#hero" onClick={(e) => handleHomeNavigation(e, "hero")} className={linkClass} style={textColor}>
            Home
          </Link>
          <Link to="/#our-vision" onClick={(e) => handleHomeNavigation(e, "our-vision")} className={linkClass} style={textColor}>
            Our Vision
          </Link>
          <Link to="/#our-products" onClick={(e) => handleHomeNavigation(e, "our-products")} className={linkClass} style={textColor}>
            Our Products
          </Link>
          <Link to="/#package-plans" onClick={(e) => handleHomeNavigation(e, "package-plans")} className={linkClass} style={textColor}>
            Package Plans
          </Link>
        </div>

        {/* India */}
        <div className="text-base" style={textColor}>
          <p className="font-semibold">India</p>
          <p className="mt-2">
            A1-211, 2nd Floor, Expat Vida, Above KFC, Near Gera School,
            Kadamba Plateau, Old Goa-403402
          </p>
          <a href="tel:+917020858404" className="mt-3 font-semibold block hover:underline cursor-pointer">
            +91 7020858404
          </a>
        </div>

        {/* USA */}
        <div className="text-base" style={textColor}>
          <p className="font-semibold">USA</p>
          <p className="mt-2">
            3075 Book Road Ste 103, #9162 Naperville, IL 60567-9162
          </p>
          <a href="tel:+18155569058" className="mt-3 font-semibold block hover:underline cursor-pointer">
            +1 815 556 9058
          </a>
        </div>
      </div>

      <hr className="my-8 max-w-6xl mx-auto" style={{ borderColor: "#775151", opacity: 0.6 }} />
      <p
        className="text-center text-base font-semibold"
        style={{ color: "#906262" }}
      >
        © 2026 All Right Reserved by Aspire
      </p>
    </footer>
  );
}
