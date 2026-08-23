import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const sidebarItems = [
  { id: "about", label: "About AspiRE" },
  { id: "eligibility", label: "Eligibility & Registration" },
  { id: "customer-orgs", label: "Customer Organizations" },
  { id: "accounts", label: "User Accounts & Security" },
  { id: "subscription", label: "Subscription & Access" },
  { id: "payments", label: "Payments & Taxes" },
  { id: "trials", label: "Free Trials" },
  { id: "acceptable-use", label: "Acceptable Use" },
  { id: "customer-data", label: "Customer Data" },
  { id: "responsibilities", label: "Customer Responsibilities" },
  { id: "backup", label: "Data Backup" },
  { id: "export", label: "Data Export & Termination" },
  { id: "signatures", label: "Digital Signatures" },
  { id: "calculations", label: "Measurements & Reports" },
  { id: "location", label: "Location & Attendance" },
  { id: "ip", label: "Intellectual Property" },
  { id: "feedback", label: "Customer Feedback" },
  { id: "third-party", label: "Third-Party Services" },
  { id: "availability", label: "Availability" },
  { id: "updates", label: "Updates & Changes" },
  { id: "suspension", label: "Suspension" },
  { id: "termination", label: "Termination" },
  { id: "confidentiality", label: "Confidentiality" },
  { id: "warranty", label: "Warranty Disclaimer" },
  { id: "liability", label: "Limitation of Liability" },
  { id: "indemnification", label: "Indemnification" },
  { id: "force-majeure", label: "Force Majeure" },
  { id: "governing-law", label: "Governing Law" },
  { id: "changes", label: "Changes to Terms" },
  { id: "severability", label: "Severability" },
  { id: "waiver", label: "No Waiver" },
  { id: "agreement", label: "Entire Agreement" },
  { id: "contact", label: "Contact" },
];

export default function TermsOfService() {
  const [activeId, setActiveId] = useState("about");
  const desktopRefs = useRef({});
  const mobileRefs = useRef({});
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveId(e.target.id)),
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    sidebarItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const dEl = desktopRefs.current[activeId];
    if (dEl) dEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
    const mEl = mobileRefs.current[activeId];
    if (mEl) mEl.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [activeId]);

  return (
    <div className="min-h-screen bg-[#F9F8F5] font-poppins">
      {/* Header */}
      <header className="bg-[#0d120d] text-white pt-28 md:pt-32 pb-10 px-4 text-center border-b border-white/5">
        <Link to="/" className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-white/70 hover:text-white transition-colors mb-6">
          ← Back to AspiRE
        </Link>
        <div className="flex justify-center mb-4">
          <img src="/images/AspiRE Main Logo.png" alt="AspiRE" className="h-8 md:h-9 w-auto object-contain" />
        </div>
        <p className="text-[11px] tracking-[0.2em] uppercase text-white/60 mb-3">LEGAL</p>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Terms of Service</h1>
        <p className="text-sm md:text-base text-white/70 max-w-xl mx-auto">The rules and responsibilities that govern your use of AspiRE.</p>
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mt-6 text-xs text-white/60">
          <span>Effective Date<br /><strong className="text-white font-semibold">19 Aug 2026</strong></span>
          <span>Last Updated<br /><strong className="text-white font-semibold">19 Aug 2026</strong></span>
        </div>
        <div className="flex items-center justify-center gap-2 mt-6 text-xs font-semibold">
          <Link to="/privacy-policy" className="text-white/60 hover:text-white transition-colors">Privacy Policy</Link>
          <span className="text-white/30">|</span>
          <Link to="/terms-of-service" className="text-white border-b border-white pb-0.5">Terms of Service</Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        {/* Mobile horizontal nav — auto-scrolls with content */}
        <div className="lg:hidden -mx-4 px-4">
          <div className="bg-white rounded-xl border border-gray-200 p-3 overflow-x-auto scrollbar-hide">
            <p className="text-[11px] font-bold tracking-widest uppercase text-[#2C6035] mb-2 whitespace-nowrap">ON THIS PAGE</p>
            <div className="flex gap-2 flex-nowrap">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  ref={(el) => { if (el) mobileRefs.current[item.id] = el; }}
                  onClick={() => scrollTo(item.id)}
                  className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${activeId === item.id ? "bg-[#2C6035] text-white border-[#2C6035]" : "bg-white text-gray-600 border-gray-200 hover:border-[#2C6035]/30"}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Left sticky — auto-scrolls with content flow */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 bg-white rounded-xl border border-gray-200 shadow-sm p-5 max-h-[calc(100vh-120px)] overflow-y-auto scrollbar-hide scroll-smooth">
            <h2 className="text-xs font-bold tracking-widest uppercase text-gray-900 mb-3">ON THIS PAGE</h2>
            <nav className="flex flex-col gap-1">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  ref={(el) => { if (el) desktopRefs.current[item.id] = el; }}
                  onClick={() => scrollTo(item.id)}
                  className={`text-left text-sm px-2.5 py-1.5 rounded-lg transition-colors ${activeId === item.id ? "bg-[#2C6035] text-white font-semibold" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Right content */}
        <article className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8 lg:p-10">
          <div className="mb-8">
            <p className="text-sm font-bold text-[#2C6035]">AspiRE: Accelerating Real Estate</p>
            <p className="text-xs text-gray-500 mt-1">Effective Date: 19 August 2026 &nbsp;|&nbsp; Last Updated: 19 August 2026</p>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-gray-700">
              <p>These Terms of Service (“Terms”) govern access to and use of AspiRE: Accelerating Real Estate (“AspiRE,” “the Software,” or “the Platform”), a business management and project management platform provided by CopperCodes (“CopperCodes,” “we,” “us,” or “our”).</p>
              <p>By accessing, registering for, or using AspiRE, you agree to these Terms. If you use AspiRE on behalf of a company or legal entity (“Customer Organization”), you represent that you are authorized to accept these Terms on its behalf.</p>
            </div>
          </div>

          <section id="about" className="scroll-mt-28 py-6 border-t border-gray-100 first:border-t-0">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3">1. About AspiRE</h2>
            <p className="text-sm leading-relaxed text-gray-700">AspiRE is designed primarily for real estate and construction organizations and may provide project/site management, task/work management, Daily Work Done, measurements, labour/workforce management, attendance, material management, indents, purchase orders, GRNs, supplier/contractor management, billing/payment workflows, approvals, digital signatures, reports, dashboards, document management, notifications, and other features introduced by CopperCodes.</p>
            <p className="text-sm leading-relaxed text-gray-700 mt-2">Features depend on the applicable subscription, configuration, user roles, and commercial agreement.</p>
          </section>

          <section id="eligibility" className="scroll-mt-28 py-6 border-t border-gray-100">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3">2. Eligibility and Registration</h2>
            <p className="text-sm leading-relaxed text-gray-700">AspiRE is intended for business and professional use. Users must be at least 18 years old, have legal capacity, provide accurate information, use the Platform lawfully, and have authority to act for an organization where applicable.</p>
            <p className="text-sm leading-relaxed text-gray-700 mt-2">CopperCodes may refuse or suspend registration where information is inaccurate, misleading, fraudulent, or inconsistent with these Terms.</p>
          </section>

          <section id="customer-orgs" className="scroll-mt-28 py-6 border-t border-gray-100">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3">3. Customer Organizations and Authorized Users</h2>
            <p className="text-sm leading-relaxed text-gray-700">Customer Organizations are responsible for managing users and access permissions, ensuring users comply with these Terms, maintaining credential confidentiality, ensuring submitted information is accurate and lawful, and managing Platform use within their organization.</p>
          </section>

          <section id="accounts" className="scroll-mt-28 py-6 border-t border-gray-100">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3">4. User Accounts and Security</h2>
            <p className="text-sm leading-relaxed text-gray-700">Users must not share credentials, allow unauthorized account use, access another account without authorization, circumvent security mechanisms, or permit unauthorized access through their devices.</p>
            <p className="text-sm leading-relaxed text-gray-700 mt-2">Users must promptly report suspected compromise. CopperCodes may suspend or restrict access where reasonably necessary to protect the Platform, users, or security.</p>
          </section>

          <section id="subscription" className="scroll-mt-28 py-6 border-t border-gray-100">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3">5. Subscription and Access</h2>
            <p className="text-sm leading-relaxed text-gray-700">Paid access is governed by the applicable subscription agreement, proposal, quotation, order form, or other written commercial agreement.</p>
            <p className="text-sm leading-relaxed text-gray-700 mt-2">Unless otherwise agreed, paid access is conditional upon timely payment. CopperCodes may change subscription plans, features, or pricing for future subscription periods with reasonable notice.</p>
          </section>

          <section id="payments" className="scroll-mt-28 py-6 border-t border-gray-100">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3">6. Payments, Taxes, Cancellation and Refunds</h2>
            <p className="text-sm leading-relaxed text-gray-700">Customers must pay applicable fees according to agreed payment terms. Applicable taxes, including GST or other statutory charges, may be added.</p>
            <p className="text-sm leading-relaxed text-gray-700 mt-2">Unless expressly agreed otherwise in writing or required by applicable law, fees already paid are non-refundable, including where a Customer Organization stops using AspiRE before the end of a committed subscription period.</p>
            <p className="text-sm leading-relaxed text-gray-700 mt-2">If payment is overdue, CopperCodes may, after appropriate notice where applicable, suspend paid features until outstanding amounts are resolved.</p>
          </section>

          <section id="trials" className="scroll-mt-28 py-6 border-t border-gray-100">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3">7. Free Trials and Demonstrations</h2>
            <p className="text-sm leading-relaxed text-gray-700">Trials, demonstrations, test environments, or evaluation accounts may have limited features, duration, data, or usage restrictions and may be discontinued at any time. Unless otherwise agreed, they should not be relied upon as the permanent storage environment for business records.</p>
          </section>

          <section id="acceptable-use" className="scroll-mt-28 py-6 border-t border-gray-100">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3">8. Acceptable Use</h2>
            <p className="text-sm leading-relaxed text-gray-700">Users must use AspiRE only for lawful business purposes and must not violate laws, upload malicious code, attempt unauthorized access, disrupt the Platform, perform unauthorized security testing, reverse engineer, copy, resell, sublicense, circumvent subscription limits, scrape data, upload unlawful/infringing content, impersonate others, infringe rights, or impair the Platform.</p>
            <p className="text-sm leading-relaxed text-gray-700 mt-2">CopperCodes may investigate suspected violations and suspend or terminate access where appropriate.</p>
          </section>

          <section id="customer-data" className="scroll-mt-28 py-6 border-t border-gray-100">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3">9. Customer Data</h2>
            <p className="text-sm leading-relaxed text-gray-700">Customer Organizations retain their rights and interests in Customer Data. CopperCodes processes Customer Data primarily to provide, operate, maintain, secure, and support AspiRE in accordance with these Terms, applicable agreements, and applicable law.</p>
          </section>

          <section id="responsibilities" className="scroll-mt-28 py-6 border-t border-gray-100">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3">10. Customer Responsibilities for Data</h2>
            <p className="text-sm leading-relaxed text-gray-700">Customers are responsible for the accuracy, completeness, lawfulness, permissions, consents, user access, and appropriate use of Customer Data.</p>
            <p className="text-sm leading-relaxed text-gray-700 mt-2">CopperCodes is not responsible for inaccuracies, omissions, unlawful content, or unauthorized processing resulting from information supplied or configured by a Customer Organization or its users.</p>
          </section>

          <section id="backup" className="scroll-mt-28 py-6 border-t border-gray-100">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3">11. Data Backup and Business Records</h2>
            <p className="text-sm leading-relaxed text-gray-700">AspiRE may use backup and recovery systems, but customers must maintain appropriate independent copies of critical business records, documents, financial information, and other important data.</p>
            <p className="text-sm leading-relaxed text-gray-700 mt-2">CopperCodes does not guarantee that every item of Customer Data can be recovered after every possible technical failure, security incident, accidental deletion, corruption, third-party failure, or other event beyond its reasonable control.</p>
          </section>

          <section id="export" className="scroll-mt-28 py-6 border-t border-gray-100">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3">12. Data Export and Termination</h2>
            <p className="text-sm leading-relaxed text-gray-700">Following termination, a Customer Organization may request export of Customer Data within the period specified in the applicable agreement or, if none is specified, within a reasonable period communicated by CopperCodes.</p>
            <p className="text-sm leading-relaxed text-gray-700 mt-2">Export may be subject to technical limitations and reasonable charges for migration, extraction, formatting, or professional services.</p>
            <p className="text-sm leading-relaxed text-gray-700 mt-2">After the applicable period, CopperCodes may delete or anonymize Customer Data subject to legal, regulatory, accounting, security, backup, disaster-recovery, and dispute-resolution requirements.</p>
          </section>

          <section id="signatures" className="scroll-mt-28 py-6 border-t border-gray-100">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3">13. Digital Signatures and Approvals</h2>
            <p className="text-sm leading-relaxed text-gray-700">Customers are responsible for protecting accounts, ensuring authorized use of signature functionality, reviewing information before approval/signing, ensuring signatories have authority, and complying with applicable laws and internal policies.</p>
            <p className="text-sm leading-relaxed text-gray-700 mt-2">Unless expressly agreed otherwise, CopperCodes does not independently verify legal authority of a person applying a signature or approving a transaction. AspiRE's signature and approval functionality does not constitute legal advice or a guarantee of enforceability.</p>
          </section>

          <section id="calculations" className="scroll-mt-28 py-6 border-t border-gray-100">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3">14. Measurements, Calculations, Reports, Financial and AI-Assisted Information</h2>
            <p className="text-sm leading-relaxed text-gray-700">AspiRE may generate calculations, summaries, reports, measurements, quantities, estimates, dashboards, recommendations, or other outputs based on user-entered or system-processed information.</p>
            <p className="text-sm leading-relaxed text-gray-700 mt-2">Customers are responsible for reviewing and verifying outputs before relying on them for contractor payments, billing, procurement, accounting, financial decisions, project management, legal documentation, or other business-critical decisions.</p>
            <p className="text-sm leading-relaxed text-gray-700 mt-2">CopperCodes does not guarantee that calculations, estimates, reports, recommendations, or other outputs will be error-free or suitable for every purpose, particularly where data is incomplete, incorrect, inconsistent, or outside the intended use of the Platform.</p>
            <p className="text-sm leading-relaxed text-gray-700 mt-2">Such outputs are software-assisted business tools and do not constitute accounting, tax, legal, engineering, financial, or other professional advice.</p>
          </section>

          <section id="location" className="scroll-mt-28 py-6 border-t border-gray-100">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3">15. Location and Attendance</h2>
            <p className="text-sm leading-relaxed text-gray-700">Where enabled, AspiRE may use location information to support attendance and site management.</p>
            <p className="text-sm leading-relaxed text-gray-700 mt-2">Customers are responsible for ensuring location permissions are appropriately configured, attendance data is accurate, and the Platform is not manipulated to create false records.</p>
            <p className="text-sm leading-relaxed text-gray-700 mt-2">Customer Organizations alone determine how attendance and location information is reviewed and used for employment, payroll, contractor, disciplinary, or other business purposes. CopperCodes does not make employment or payroll decisions based on such information.</p>
          </section>

          <section id="ip" className="scroll-mt-28 py-6 border-t border-gray-100">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3">16. Intellectual Property</h2>
            <p className="text-sm leading-relaxed text-gray-700">AspiRE, including software, source code, architecture, user interface, design, trademarks, logos, documentation, workflows, features, and underlying technology, is owned by or licensed to CopperCodes.</p>
            <p className="text-sm leading-relaxed text-gray-700 mt-2">No ownership rights are transferred except limited rights expressly granted under these Terms. Customers may not copy, modify, reverse engineer, sell, sublicense, lease, distribute, remove proprietary notices, copy the interface/design for a competing product, or use CopperCodes/AspiRE trademarks without prior written permission, except where applicable law expressly permits otherwise.</p>
          </section>

          <section id="feedback" className="scroll-mt-28 py-6 border-t border-gray-100">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3">17. Customer Feedback</h2>
            <p className="text-sm leading-relaxed text-gray-700">Feedback may be used by CopperCodes without restriction or compensation, provided such use does not disclose Customer Data or confidential information.</p>
          </section>

          <section id="third-party" className="scroll-mt-28 py-6 border-t border-gray-100">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3">18. Third-Party Services</h2>
            <p className="text-sm leading-relaxed text-gray-700">AspiRE may depend on third-party hosting, infrastructure, APIs, communication providers, payment providers, AI services, or other external services.</p>
            <p className="text-sm leading-relaxed text-gray-700 mt-2">Third-party services may have their own terms and policies. CopperCodes is not responsible for failures, interruptions, changes, suspension, discontinuation, or actions of third-party services outside CopperCodes' reasonable control. Changes to third-party services may affect relevant AspiRE features without creating liability beyond the limitations in these Terms.</p>
          </section>

          <section id="availability" className="scroll-mt-28 py-6 border-t border-gray-100">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3">19. Availability and Maintenance</h2>
            <p className="text-sm leading-relaxed text-gray-700">CopperCodes aims to provide a reliable Platform but does not guarantee continuous or uninterrupted availability.</p>
            <p className="text-sm leading-relaxed text-gray-700 mt-2">Downtime may result from scheduled/emergency maintenance, updates, infrastructure issues, security incidents, internet or telecommunications failures, third-party services, force majeure, or other circumstances beyond reasonable control.</p>
            <p className="text-sm leading-relaxed text-gray-700 mt-2">No uptime commitment applies unless expressly stated in a written commercial agreement or SLA.</p>
          </section>

          <section id="updates" className="scroll-mt-28 py-6 border-t border-gray-100">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3">20. Updates and Changes to AspiRE</h2>
            <p className="text-sm leading-relaxed text-gray-700">CopperCodes may modify, improve, replace, restrict, or discontinue features for security, defect correction, performance, new functionality, legal/regulatory compliance, or business/technical requirements.</p>
            <p className="text-sm leading-relaxed text-gray-700 mt-2">CopperCodes will make reasonable efforts not to unnecessarily disrupt core functionality.</p>
          </section>

          <section id="suspension" className="scroll-mt-28 py-6 border-t border-gray-100">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3">21. Suspension of Access</h2>
            <p className="text-sm leading-relaxed text-gray-700">CopperCodes may suspend access where reasonably necessary for security, unauthorized access, suspected misuse, security incidents, legal compliance, prevention of harm, material breach, or prolonged non-payment.</p>
            <p className="text-sm leading-relaxed text-gray-700 mt-2">Where reasonably practical and legally permitted, notice will be provided before suspension. Suspension does not transfer ownership of Customer Data or automatically authorize deletion of Customer Data.</p>
          </section>

          <section id="termination" className="scroll-mt-28 py-6 border-t border-gray-100">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3">22. Termination</h2>
            <p className="text-sm leading-relaxed text-gray-700">Customers may terminate according to their applicable commercial agreement. CopperCodes may suspend or terminate access for material breach, unpaid fees, unlawful use, material security/legal risk, or legal requirement.</p>
            <p className="text-sm leading-relaxed text-gray-700 mt-2">Upon termination, access may be disabled and Customer Data will be handled according to the applicable agreement, Privacy Policy, retention requirements, and Section 12 of these Terms.</p>
          </section>

          <section id="confidentiality" className="scroll-mt-28 py-6 border-t border-gray-100">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3">23. Confidentiality</h2>
            <p className="text-sm leading-relaxed text-gray-700">Each party may receive confidential information belonging to the other. Each party will use reasonable measures to protect confidential information and will not disclose it except to authorized personnel/service providers with a need to know, with permission, where required by law, or where necessary to protect legal rights or address security/legal matters.</p>
            <p className="text-sm leading-relaxed text-gray-700 mt-2">Confidentiality obligations do not apply to information that is publicly available without breach, already lawfully known, independently developed without use of confidential information, or lawfully received from another source.</p>
            <p className="text-sm leading-relaxed text-gray-700 mt-2">Confidentiality obligations survive termination for a reasonable period, and trade secrets remain protected for so long as they qualify as trade secrets under applicable law.</p>
          </section>

          <section id="warranty" className="scroll-mt-28 py-6 border-t border-gray-100">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3">24. Disclaimer of Warranties</h2>
            <p className="text-sm leading-relaxed text-gray-700">To the maximum extent permitted by law, AspiRE is provided on an “as is” and “as available” basis.</p>
            <p className="text-sm leading-relaxed text-gray-700 mt-2">CopperCodes does not warrant continuous availability, complete error-free operation, immediate correction of defects, suitability for every business requirement, accuracy of all calculations or outputs, uninterrupted security, or recovery of every item of Customer Data.</p>
            <p className="text-sm leading-relaxed text-gray-700 mt-2">Nothing excludes any warranty or legal protection that cannot lawfully be excluded.</p>
          </section>

          <section id="liability" className="scroll-mt-28 py-6 border-t border-gray-100">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3">25. Limitation of Liability</h2>
            <p className="text-sm leading-relaxed text-gray-700">To the maximum extent permitted by applicable law, CopperCodes will not be liable for indirect, incidental, special, consequential, exemplary, or punitive damages, including loss of profits, business opportunities, anticipated savings, goodwill, business information, or other indirect losses.</p>
            <p className="text-sm leading-relaxed text-gray-700 mt-2">CopperCodes' aggregate total liability arising out of or relating to AspiRE or these Terms, regardless of the number of claims, will be limited to the fees actually paid by the relevant Customer Organization to CopperCodes for AspiRE during the 12 months immediately preceding the event giving rise to the claim.</p>
            <p className="text-sm leading-relaxed text-gray-700 mt-2">The limitation does not apply to liabilities that cannot legally be limited or excluded.</p>
          </section>

          <section id="indemnification" className="scroll-mt-28 py-6 border-t border-gray-100">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3">26. Customer Indemnification</h2>
            <p className="text-sm leading-relaxed text-gray-700">To the extent permitted by law, the Customer Organization agrees to indemnify and hold harmless CopperCodes, its partners, employees, and representatives from claims, losses, liabilities, damages, costs, and expenses arising from:</p>
            <ul className="list-disc ml-5 space-y-1 text-sm text-gray-700 mt-2">
              <li>unlawful use of AspiRE;</li>
              <li>material breach of these Terms;</li>
              <li>unauthorized use by the Customer or its users;</li>
              <li>Customer Data infringing third-party rights;</li>
              <li>violation of applicable laws or regulations;</li>
              <li>employment, labour, payroll, tax, privacy, data protection, or regulatory obligations arising from the Customer's use of the Platform; or</li>
              <li>decisions or actions taken by the Customer based on Customer Data or Platform outputs, except to the extent caused by CopperCodes' liability that cannot legally be transferred or limited.</li>
            </ul>
            <p className="text-sm leading-relaxed text-gray-700 mt-2">This section does not apply to the extent a claim results from CopperCodes' own willful misconduct or liability that cannot legally be transferred or limited.</p>
          </section>

          <section id="force-majeure" className="scroll-mt-28 py-6 border-t border-gray-100">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3">27. Force Majeure</h2>
            <p className="text-sm leading-relaxed text-gray-700">CopperCodes will not be responsible for delays or failures caused by circumstances beyond reasonable control, including natural disasters, fire, flood, war, terrorism, civil unrest, governmental action, internet/telecommunications failures, power outages, cyberattacks despite reasonable safeguards, third-party infrastructure failures, pandemics, or similar events.</p>
          </section>

          <section id="governing-law" className="scroll-mt-28 py-6 border-t border-gray-100">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3">28. Governing Law and Dispute Resolution</h2>
            <p className="text-sm leading-relaxed text-gray-700">These Terms are governed by laws applicable in India. Parties will first attempt good-faith resolution.</p>
            <p className="text-sm leading-relaxed text-gray-700 mt-2">If unresolved, disputes will be subject to the jurisdiction of competent courts in Goa, India, unless otherwise agreed in a written agreement. Either party may seek urgent legal or injunctive relief where appropriate.</p>
          </section>

          <section id="changes" className="scroll-mt-28 py-6 border-t border-gray-100">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3">29. Changes to These Terms</h2>
            <p className="text-sm leading-relaxed text-gray-700">CopperCodes may update these Terms to reflect changes to AspiRE, business practices, features, laws, regulations, security, or operations.</p>
            <p className="text-sm leading-relaxed text-gray-700 mt-2">For material changes, CopperCodes may provide reasonable advance notice through AspiRE, email, or other appropriate communication channels.</p>
            <p className="text-sm leading-relaxed text-gray-700 mt-2">The updated Terms will apply from the stated effective date to the extent permitted by applicable law. Continued use after that date constitutes acceptance where legally permitted.</p>
          </section>

          <section id="severability" className="scroll-mt-28 py-6 border-t border-gray-100">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3">30. Severability</h2>
            <p className="text-sm leading-relaxed text-gray-700">If any provision is invalid or unenforceable, it will be modified to the minimum extent necessary where permitted, and the remaining provisions will continue in effect.</p>
          </section>

          <section id="waiver" className="scroll-mt-28 py-6 border-t border-gray-100">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3">31. No Waiver</h2>
            <p className="text-sm leading-relaxed text-gray-700">Failure to enforce a provision does not waive CopperCodes' right to enforce it later.</p>
          </section>

          <section id="agreement" className="scroll-mt-28 py-6 border-t border-gray-100">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3">32. Entire Agreement and Order of Precedence</h2>
            <p className="text-sm leading-relaxed text-gray-700">These Terms, applicable subscription agreements, proposals, quotations, order forms, commercial agreements, SLAs, and the Privacy Policy govern use of AspiRE.</p>
            <p className="text-sm leading-relaxed text-gray-700 mt-2">If there is a conflict, the separately executed written agreement or order form will prevail to the extent of the conflict, followed by any applicable SLA, then these Terms, unless expressly agreed otherwise.</p>
          </section>

          <section id="contact" className="scroll-mt-28 py-6 border-t border-gray-100">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3">33. Contact Information</h2>
            <div className="bg-[#F9F8F5] rounded-lg border border-gray-200 p-4 text-sm leading-relaxed text-gray-700">
              <p className="font-semibold text-gray-900">CopperCodes</p>
              <p>Email: <a href="mailto:coppercodesconsulting@gmail.com" className="text-[#2C6035] font-semibold hover:underline">coppercodesconsulting@gmail.com</a></p>
              <p>Phone: 7020858404 / 9011879123</p>
              <p className="mt-2">Address:<br />A1-211, 2nd Floor, Expat Vida,<br />Above KFC, Near GERA School,<br />Kadamba Plateau, Old Goa - 403402, Goa, India</p>
            </div>
            <p className="text-xs text-gray-500 mt-6">Last Updated: 19 August 2026</p>
            <p className="text-sm leading-relaxed text-gray-700 mt-2">By accessing or using AspiRE, you acknowledge that you have read, understood, and agree to these Terms of Service.</p>
          </section>
        </article>
      </div>

      <div className="text-center py-10 px-4">
        <p className="text-sm font-semibold text-gray-900">Questions about these terms?</p>
        <a href="mailto:coppercodesconsulting@gmail.com" className="text-sm font-medium text-[#2C6035] hover:underline">coppercodesconsulting@gmail.com</a>
      </div>

      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <span className="font-semibold text-gray-900">AspiRE | CopperCodes Consulting LLP</span>
          <div className="flex items-center gap-2">
            <Link to="/privacy-policy" className="hover:text-[#2C6035] font-medium">Privacy Policy</Link>
            <span>|</span>
            <Link to="/terms-of-service" className="hover:text-[#2C6035] font-medium">Terms of Service</Link>
            <span>|</span>
            <a href="/#contact" className="hover:text-[#2C6035] font-medium">Contact</a>
          </div>
        </div>
      </div>
    </div>
  );
}
