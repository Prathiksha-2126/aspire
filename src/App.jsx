import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ContactForm from "./components/ContactForm";
import LoadingOverlay from "./components/LoadingOverlay";
import PackagePlans from "./components/PackagePlans";
import Home from "./pages/Home";
import Engineering from "./pages/Engineering";
import Sales from "./pages/Sales";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

export default function App() {
  return (
    <BrowserRouter>
      <LoadingOverlay />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/engineering" element={<Engineering />} />
        <Route path="/sales" element={<Sales />} />
        <Route
          path="/package-plans"
          element={<PackagePlans defaultTab="engineering" />}
        />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        {/* Legacy short routes */}
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
      </Routes>

      {/* Shared on every page */}
      <ContactForm />
      <Footer />
    </BrowserRouter>
  );
}
