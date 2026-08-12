import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ContactForm from "./components/ContactForm";
import LoadingOverlay from "./components/LoadingOverlay";
import PackagePlans from "./components/PackagePlans";
import Home from "./pages/Home";
import Engineering from "./pages/Engineering";
import Sales from "./pages/Sales";

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
      </Routes>

      {/* Shared on every page */}
      <ContactForm />
      <Footer />
    </BrowserRouter>
  );
}
