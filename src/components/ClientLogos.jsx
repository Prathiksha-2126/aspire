import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import Ticker from "./animations/Ticker";

const clients = [
  { src: "/images/Nanu Client Logo.png", alt: "NANU Estates Pvt. Ltd." },
  { src: "/images/Kamat Client Logo.png", alt: "KAMAT Construction Pvt. Ltd." },
  { src: "/images/Client Logo JMD Group.png", alt: "JMD Group" },
  { src: "/images/Maharudra Client Logo.png", alt: "MahaRudra Real Estate" },
  { src: "/images/Vaastu Client Logo.png", alt: "Vaastu Estate Developers", scale: "scale-[1.35]" },
  { src: "/images/Edcon Client Logo.png", alt: "EDCON" },
  { src: "/images/Sanvi Client Logo.png", alt: "Sanvi Developers" },
  { src: "/images/R Client Logo.png", alt: "Ruby Realty", scale: "scale-[1.25]", wrapperClass: "w-24 sm:w-28 md:w-32" },
];

export default function ClientLogos() {
  return (
    <motion.section 
      className="py-20 relative overflow-hidden bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="px-8 md:px-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <SectionHeading
          title="Our Clients"
          subtitle="Trusted by leading businesses to streamline operations and drive success."
        />
      </motion.div>

      <Ticker items={clients} speed={25} />
    </motion.section>
  );
}
