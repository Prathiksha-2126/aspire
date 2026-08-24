import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const sidebarItems = [
  { id: "scope", label: "Scope" },
  { id: "information", label: "Information We Collect" },
  { id: "how-we-use", label: "How We Use Information" },
  { id: "legal-basis", label: "Legal Basis & Consent" },
  { id: "customer-responsibilities", label: "Customer Responsibilities" },
  { id: "data-sharing", label: "Data Sharing" },
  { id: "data-retention", label: "Data Retention" },
  { id: "data-security", label: "Data Security" },
  { id: "security-incidents", label: "Security Incidents" },
  { id: "cookies", label: "Cookies & Tracking" },
  { id: "mobile-permissions", label: "Mobile Permissions" },
  { id: "children", label: "Children's Privacy" },
  { id: "user-rights", label: "User Rights" },
  { id: "account-control", label: "Account & Access Control" },
  { id: "international", label: "International Data Processing" },
  { id: "third-party", label: "Third-Party Services" },
  { id: "changes", label: "Changes to Policy" },
  { id: "contact", label: "Contact" },
];

export default function PrivacyPolicy() {
  const [activeId, setActiveId] = useState("scope");
  const desktopRefs = useRef({});
  const mobileRefs = useRef({});

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    window.scrollTo(0, 0);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    sidebarItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Sidebar auto-scrolls with content flow — keep active item visible
  useEffect(() => {
    const dEl = desktopRefs.current[activeId];
    if (dEl) dEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
    const mEl = mobileRefs.current[activeId];
    if (mEl) mEl.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [activeId]);

  return (
    <div className="min-h-screen bg-[#F9F8F5] font-poppins">
      {/* ── Header ── */}
      <header id="hero" className="bg-[#0d120d] text-white pt-28 md:pt-32 pb-10 px-4 text-center border-b border-white/5">
        <Link to="/" className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-white/70 hover:text-white transition-colors mb-6">
          ← Back to AspiRE
        </Link>
        <div className="flex justify-center mb-4">
          <img src="/images/AspiRE Main Logo.png" alt="AspiRE" className="h-11 md:h-14 w-auto object-contain" />
        </div>
        <p className="text-[11px] tracking-[0.2em] uppercase text-white/60 mb-3">LEGAL</p>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Privacy Policy</h1>
        <p className="text-sm md:text-base text-white/70 max-w-xl mx-auto">Your Privacy Matters. Here's how we protect your information.</p>
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mt-6 text-xs text-white/60">
          <span>Effective Date<br /><strong className="text-white font-semibold">19 Aug 2026</strong></span>
          <span>Last Updated<br /><strong className="text-white font-semibold">19 Aug 2026</strong></span>
        </div>
        <div className="flex items-center justify-center gap-2 mt-6 text-xs font-semibold">
          <Link to="/privacy-policy" className="text-white border-b border-white pb-0.5">Privacy Policy</Link>
          <span className="text-white/30">|</span>
          <Link to="/terms-of-service" className="text-white/60 hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </header>

      {/* ── 2-Col Layout ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        {/* Mobile top nav (horizontal) — auto-scrolls with content */}
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

        {/* Left Sidebar — sticky + auto-scrolls with content flow */}
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

        {/* Right Content — bordered doc */}
        <article className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8 lg:p-10">
          {/* Intro */}
          <div className="mb-8">
            <p className="text-sm font-bold text-[#2C6035]">AspiRE: Accelerating Real Estate</p>
            <p className="text-xs text-gray-500 mt-1">Effective Date: 19 August 2026 &nbsp;|&nbsp; Last Updated: 19 August 2026</p>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-gray-700">
              <p>
                CopperCodes (“CopperCodes,” “we,” “us,” or “our”) is committed to protecting the privacy and security of personal information processed through AspiRE: Accelerating Real Estate (“AspiRE,” “the Software,” or “the Platform”).
              </p>
              <p>
                AspiRE is a business management and project management platform designed for real estate and construction companies to manage their projects, site operations, employees, contractors, labourers, materials, procurement, attendance, work progress, billing, approvals, documents, and related business activities.
              </p>
              <p>
                This Privacy Policy explains what information we collect or process, how we use it, how we protect it, when it may be shared, and the rights available to individuals whose personal data is processed through AspiRE.
              </p>
              <p className="font-medium text-gray-900">By accessing or using AspiRE, you acknowledge that you have read and understood this Privacy Policy.</p>
            </div>
          </div>

          {/* 1 */}
          <section id="scope" className="scroll-mt-28 py-6 border-t border-gray-100 first:border-t-0">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3">1. Scope of This Privacy Policy</h2>
            <p className="text-sm leading-relaxed text-gray-700 mb-3">This Privacy Policy applies to personal data processed through:</p>
            <ul className="list-disc ml-5 space-y-1 text-sm text-gray-700">
              <li>The AspiRE web application;</li>
              <li>AspiRE mobile applications;</li>
              <li>Related websites, services, and interfaces operated by CopperCodes in connection with AspiRE; and</li>
              <li>Communications and support services relating to AspiRE.</li>
            </ul>
            <p className="text-sm leading-relaxed text-gray-700 mt-3">
              AspiRE is primarily provided as a business-to-business (B2B) platform. Organizations that subscribe to or use AspiRE (“Customer Organizations”) may enter or upload information relating to their employees, site engineers, contractors, labourers, suppliers, and other individuals.
            </p>
            <p className="text-sm leading-relaxed text-gray-700 mt-3">
              Where a Customer Organization provides personal data to AspiRE for use of the Platform, the Customer Organization generally determines the purposes for which that information is used. CopperCodes processes such information to provide and operate AspiRE in accordance with the applicable agreement with the Customer Organization and applicable law.
            </p>
          </section>

          {/* 2 */}
          <section id="information" className="scroll-mt-28 py-6 border-t border-gray-100">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3">2. Information We Collect and Process</h2>
            <p className="text-sm leading-relaxed text-gray-700 mb-4">We collect and process information that is necessary to provide, maintain, secure, and improve AspiRE.</p>

            <h3 id="information-2-1" className="text-sm font-bold text-gray-900 mt-5 mb-2">2.1 Account and User Information</h3>
            <p className="text-sm text-gray-700 mb-2">Depending on the user’s role and features enabled, this may include:</p>
            <ul className="list-disc ml-5 space-y-1 text-sm text-gray-700">
              <li>Full name;</li>
              <li>Email address;</li>
              <li>Phone number;</li>
              <li>User ID or account credentials;</li>
              <li>Company or organization details;</li>
              <li>Designation or role;</li>
              <li>Project or site assignment;</li>
              <li>Digital signature; and</li>
              <li>Other information provided during account registration or administration.</li>
            </ul>

            <h3 className="text-sm font-bold text-gray-900 mt-5 mb-2">2.2 Location Information</h3>
            <p className="text-sm leading-relaxed text-gray-700">
              AspiRE may process location information from authorized mobile users, particularly Site Engineers, where location functionality is enabled. Location information may be used to verify and record attendance at a project or work site, associate attendance records with the relevant project or site, support site-operation workflows, and maintain attendance records.
            </p>
            <p className="text-sm leading-relaxed text-gray-700 mt-2">
              AspiRE does not intend to continuously track a user's location merely because the mobile application is installed. Location collection depends on the applicable feature, permissions granted, and Customer Organization configuration.
            </p>

            <h3 className="text-sm font-bold text-gray-900 mt-5 mb-2">2.3 Business and Project Information</h3>
            <p className="text-sm text-gray-700 mb-2">Customer Organizations may enter business and operational information including:</p>
            <ul className="list-disc ml-5 space-y-1 text-sm text-gray-700">
              <li>Project and site information;</li>
              <li>Task and work information;</li>
              <li>Daily Work Done records;</li>
              <li>Measurement records and measurement sheets;</li>
              <li>Material information;</li>
              <li>Indent requests;</li>
              <li>Purchase orders;</li>
              <li>Goods Receipt Notes (GRNs);</li>
              <li>Supplier information;</li>
              <li>Contractor information;</li>
              <li>Labour and workforce information;</li>
              <li>Attendance records;</li>
              <li>Bills and payment-related records;</li>
              <li>Approvals;</li>
              <li>Digital signatures;</li>
              <li>Documents and reports; and</li>
              <li>Other information required for business operations.</li>
            </ul>
            <p className="text-sm text-gray-600 mt-2">Some of this information may contain personal data.</p>

            <h3 className="text-sm font-bold text-gray-900 mt-5 mb-2">2.4 Uploaded Content</h3>
            <p className="text-sm leading-relaxed text-gray-700">Users may upload photographs, documents, reports, work completion evidence, bills and invoices, measurement records, digital signatures, and other files permitted by the Platform.</p>
            <p className="text-sm leading-relaxed text-gray-700 mt-2">Users and Customer Organizations are responsible for ensuring that they have the appropriate rights and permissions to provide such information to AspiRE.</p>

            <h3 className="text-sm font-bold text-gray-900 mt-5 mb-2">2.5 Device and Technical Information</h3>
            <p className="text-sm leading-relaxed text-gray-700">AspiRE may process limited technical information where required for specific functionality, such as device platform type for push notifications.</p>
            <p className="text-sm leading-relaxed text-gray-700 mt-2">Depending on the hosting, security, authentication, infrastructure, and logging configuration used at a particular time, technical logs may contain information such as IP addresses or other technical identifiers. Such information is used for security, troubleshooting, fraud prevention, system administration, and service reliability where applicable.</p>
            <p className="text-sm leading-relaxed text-gray-700 mt-2">CopperCodes does not intentionally use device or technical information for advertising purposes.</p>
          </section>

          {/* 3 */}
          <section id="how-we-use" className="scroll-mt-28 py-6 border-t border-gray-100">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3">3. How We Use Information</h2>
            <p className="text-sm text-gray-700 mb-2">We process information for legitimate and specified purposes, including:</p>
            <ul className="list-disc ml-5 space-y-1 text-sm text-gray-700">
              <li>Providing and operating AspiRE;</li>
              <li>Creating and managing user accounts;</li>
              <li>Providing authorized features;</li>
              <li>Processing transactions and workflows;</li>
              <li>Managing projects, sites, attendance, workforce, materials, procurement, approvals, reports and documents;</li>
              <li>Sending service communications and relevant notifications;</li>
              <li>Providing customer and technical support;</li>
              <li>Maintaining security and preventing fraud or misuse;</li>
              <li>Diagnosing technical issues and improving performance and reliability;</li>
              <li>Developing and improving features and user experience; and</li>
              <li>Complying with legal and regulatory requirements.</li>
            </ul>
            <p className="text-sm leading-relaxed text-gray-700 mt-3">Where practical, CopperCodes may use aggregated, anonymized, or de-identified information for analytics, product improvement, service reliability, and development of new features.</p>
            <p className="text-sm leading-relaxed text-gray-700 mt-2">CopperCodes does not use identifiable Customer Data for unrelated advertising purposes. Customer Data will not be used to train general-purpose AI models or for unrelated commercial purposes unless separately authorized by the Customer Organization or otherwise permitted by applicable law.</p>
          </section>

          {/* 4 */}
          <section id="legal-basis" className="scroll-mt-28 py-6 border-t border-gray-100">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3">4. Legal Basis and Consent</h2>
            <p className="text-sm leading-relaxed text-gray-700">Where required by applicable law, personal data may be processed based on consent, performance of a contract, compliance with a legal obligation, legitimate or lawful business purposes permitted under applicable law, or another lawful ground recognized by applicable legislation.</p>
            <p className="text-sm leading-relaxed text-gray-700 mt-2">Where processing is based on consent, individuals may withdraw consent in accordance with applicable law. Withdrawal will not affect processing lawfully carried out before withdrawal.</p>
            <p className="text-sm leading-relaxed text-gray-700 mt-2">CopperCodes intends to process personal data in accordance with applicable data protection requirements, including India's Digital Personal Data Protection framework and other applicable privacy and data protection laws.</p>
          </section>

          {/* 5 */}
          <section id="customer-responsibilities" className="scroll-mt-28 py-6 border-t border-gray-100">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3">5. Customer Organization Responsibilities</h2>
            <p className="text-sm text-gray-700 mb-2">Customer Organizations are responsible for:</p>
            <ul className="list-disc ml-5 space-y-1 text-sm text-gray-700">
              <li>Providing personal data to AspiRE lawfully;</li>
              <li>Providing appropriate notices and permissions where required;</li>
              <li>Ensuring information entered into AspiRE is accurate and appropriate;</li>
              <li>Managing user access;</li>
              <li>Determining appropriate retention periods, subject to applicable law and contractual requirements; and</li>
              <li>Responding to requests from individuals where the Customer Organization is responsible for the relevant personal data.</li>
            </ul>
            <p className="text-sm leading-relaxed text-gray-700 mt-3">Where information is controlled by a Customer Organization, individuals may need to contact that organization or its designated administrator to exercise certain rights.</p>
          </section>

          {/* 6 */}
          <section id="data-sharing" className="scroll-mt-28 py-6 border-t border-gray-100">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3">6. Sharing and Disclosure</h2>
            <p className="text-sm leading-relaxed text-gray-700 font-medium">CopperCodes does not sell personal information.</p>
            <p className="text-sm text-gray-700 mt-3 mb-2">Information may be disclosed or made accessible to:</p>
            <ul className="list-disc ml-5 space-y-1 text-sm text-gray-700">
              <li>Authorized users within the relevant Customer Organization;</li>
              <li>Trusted service providers supporting cloud hosting, infrastructure, database/storage, authentication, security, email, SMS, notifications, payments, or other necessary services;</li>
              <li>Government authorities or other parties where required or permitted by law; and</li>
              <li>Parties where necessary to protect the rights, safety, property, or legal interests of CopperCodes, users, or others.</li>
            </ul>
            <p className="text-sm leading-relaxed text-gray-700 mt-3">Service providers are engaged to process information as necessary to provide services to CopperCodes and are expected to maintain appropriate security and confidentiality safeguards.</p>
            <p className="text-sm leading-relaxed text-gray-700 mt-2">CopperCodes does not disclose personal information to third parties for their independent marketing purposes except where permitted or required by law.</p>
          </section>

          {/* 7 */}
          <section id="data-retention" className="scroll-mt-28 py-6 border-t border-gray-100">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3">7. Data Retention, Termination, Export and Deletion</h2>
            <p className="text-sm leading-relaxed text-gray-700">CopperCodes retains information for as long as reasonably necessary for service provision, contractual obligations, legal/regulatory requirements, accounting, security, dispute resolution, backups, disaster recovery, and other legitimate business requirements.</p>
            <p className="text-sm leading-relaxed text-gray-700 mt-2">Following termination of a Customer Organization's use of AspiRE, the Customer Organization may request an export of its Customer Data within a reasonable period specified by CopperCodes or the applicable agreement. Data export may be subject to technical limitations and applicable charges for migration, extraction, formatting, or professional services.</p>
            <p className="text-sm leading-relaxed text-gray-700 mt-2">After the applicable export/retention period, CopperCodes may delete or anonymize Customer Data, subject to legal, regulatory, accounting, security, backup, disaster-recovery, and dispute-resolution requirements.</p>
            <p className="text-sm leading-relaxed text-gray-700 mt-2">Deletion may not immediately remove information from backup systems. Backup copies may remain for the applicable backup lifecycle and will not ordinarily be restored except for legitimate operational, security, legal, or disaster-recovery purposes.</p>
          </section>

          {/* 8 */}
          <section id="data-security" className="scroll-mt-28 py-6 border-t border-gray-100">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3">8. Data Security</h2>
            <p className="text-sm leading-relaxed text-gray-700">CopperCodes maintains reasonable technical and organizational measures designed to protect information against unauthorized access, disclosure, alteration, loss, misuse, or destruction. Measures may include access controls, role-based permissions, authentication, secure infrastructure, encryption and secure communication protocols where appropriate, monitoring, backups, restricted administrative access, and internal security procedures.</p>
            <p className="text-sm leading-relaxed text-gray-700 mt-2">No electronic storage or transmission method can guarantee absolute security. Customer Organizations and users are responsible for protecting their credentials and devices.</p>
          </section>

          {/* 9 */}
          <section id="security-incidents" className="scroll-mt-28 py-6 border-t border-gray-100">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3">9. Data Breach and Security Incidents</h2>
            <p className="text-sm leading-relaxed text-gray-700">If CopperCodes becomes aware of a confirmed security incident involving personal data, CopperCodes will take reasonable steps to investigate, contain, assess, remediate, and notify affected parties or authorities where required by applicable law.</p>
            <p className="text-sm leading-relaxed text-gray-700 mt-2">Where appropriate and legally permitted, CopperCodes will notify an affected Customer Organization without undue delay after becoming aware of a confirmed incident involving its Customer Data, taking into account investigation, containment, legal obligations, and the need to avoid compromising security investigations.</p>
          </section>

          {/* 10 */}
          <section id="cookies" className="scroll-mt-28 py-6 border-t border-gray-100">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3">10. Cookies and Tracking Technologies</h2>
            <p className="text-sm leading-relaxed text-gray-700">AspiRE does not intentionally use cookies or similar technologies for advertising or behavioral tracking. Technical mechanisms may be used for authentication, session management, security, application functionality, and performance.</p>
          </section>

          {/* 11 */}
          <section id="mobile-permissions" className="scroll-mt-28 py-6 border-t border-gray-100">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3">11. Mobile Application Permissions</h2>
            <p className="text-sm leading-relaxed text-gray-700">Depending on enabled features, the mobile application may request access to location, camera, photos/files, notifications, and other device functionality required for specific features. Permissions are requested through the device operating system and can generally be managed through device settings.</p>
          </section>

          {/* 12 */}
          <section id="children" className="scroll-mt-28 py-6 border-t border-gray-100">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3">12. Children’s Privacy</h2>
            <p className="text-sm leading-relaxed text-gray-700">AspiRE is a business and professional application and is not intended for individuals under 18. CopperCodes does not knowingly request or collect personal data from children for the purpose of providing AspiRE.</p>
          </section>

          {/* 13 */}
          <section id="user-rights" className="scroll-mt-28 py-6 border-t border-gray-100">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3">13. User Rights</h2>
            <p className="text-sm leading-relaxed text-gray-700">Subject to applicable law, individuals may have rights including access, correction, deletion where applicable, withdrawal of consent where applicable, information regarding processing, and the right to lodge a complaint or grievance.</p>
            <p className="text-sm leading-relaxed text-gray-700 mt-2">Some rights may be subject to legal, contractual, security, or other limitations. Where information is controlled by a Customer Organization, requests may need to be directed to that organization.</p>
          </section>

          {/* 14 */}
          <section id="account-control" className="scroll-mt-28 py-6 border-t border-gray-100">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3">14. Account and Access Control</h2>
            <p className="text-sm leading-relaxed text-gray-700">Customer Organizations determine which authorized individuals receive access. Users must keep credentials confidential, use only authorized accounts, report suspected unauthorized access promptly, and secure devices appropriately. Customer administrators are responsible for user access within their organization.</p>
          </section>

          {/* 15 */}
          <section id="international" className="scroll-mt-28 py-6 border-t border-gray-100">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3">15. International Data Processing</h2>
            <p className="text-sm leading-relaxed text-gray-700">Depending on infrastructure and service providers, personal data may be stored or processed in India or other jurisdictions. Where applicable, CopperCodes will take reasonable steps to comply with data protection requirements relating to such transfers.</p>
          </section>

          {/* 16 */}
          <section id="third-party" className="scroll-mt-28 py-6 border-t border-gray-100">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3">16. Third-Party Links and Services</h2>
            <p className="text-sm leading-relaxed text-gray-700">AspiRE may contain links to or integrate with third-party services. CopperCodes is not responsible for privacy practices, security, availability, or content of third-party services not controlled by CopperCodes. Third-party services may have their own terms and privacy policies.</p>
          </section>

          {/* 17 */}
          <section id="changes" className="scroll-mt-28 py-6 border-t border-gray-100">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3">17. Changes to This Privacy Policy</h2>
            <p className="text-sm leading-relaxed text-gray-700">CopperCodes may update this Privacy Policy to reflect changes to AspiRE, processing practices, features, laws, regulations, security, or operations. Material changes may be communicated through AspiRE, email, or other appropriate channels. The Last Updated date indicates the latest revision.</p>
          </section>

          {/* 18 */}
          <section id="contact" className="scroll-mt-28 py-6 border-t border-gray-100">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3">18. Privacy and Grievance Contact</h2>
            <p className="text-sm text-gray-700">For privacy requests, concerns, or complaints, contact:</p>
            <div className="mt-3 bg-[#F9F8F5] rounded-lg border border-gray-200 p-4 text-sm leading-relaxed text-gray-700">
              <p className="font-semibold text-gray-900">CopperCodes</p>
              <p>Email: <a href="mailto:coppercodesconsulting@gmail.com" className="text-[#2C6035] font-semibold hover:underline">coppercodesconsulting@gmail.com</a></p>
              <p>Phone: 7020858404 / 9011879123</p>
              <p className="mt-2">Address:<br />A1-211, 2nd Floor, Expat Vida,<br />Above KFC, Near GERA School,<br />Kadamba Plateau, Old Goa - 403402, Goa, India</p>
            </div>
            <p className="text-sm leading-relaxed text-gray-700 mt-3">CopperCodes may request reasonable information to verify identity and process requests securely.</p>

            <h3 className="text-sm font-bold text-gray-900 mt-6 mb-2">19. Governing Law</h3>
            <p className="text-sm leading-relaxed text-gray-700">This Privacy Policy shall be interpreted in accordance with laws applicable in India, subject to mandatory rights or protections under applicable law.</p>

            <h3 className="text-sm font-bold text-gray-900 mt-6 mb-2">20. Contact Us</h3>
            <p className="text-sm leading-relaxed text-gray-700">For questions regarding this Privacy Policy, personal data, or AspiRE's privacy practices, contact the details above.</p>
            <p className="text-xs text-gray-500 mt-6">Last Updated: 19 August 2026</p>
          </section>
        </article>
      </div>

      {/* ── Footer questions ── */}
      <div className="text-center py-10 px-4">
        <p className="text-sm font-semibold text-gray-900">Still have questions?</p>
        <a href="mailto:coppercodesconsulting@gmail.com" className="text-sm font-medium text-[#2C6035] hover:underline">coppercodesconsulting@gmail.com</a>
      </div>

      {/* ── Legal bottom bar ── */}
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
