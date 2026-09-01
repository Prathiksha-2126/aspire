import { motion } from "framer-motion";

const cardBg = "#F7F6F3";
const green = "#2C6035";

export default function OurAimSection(props) {
  const {
    photo,
    eyebrow = "OUR AIM",
    heading = [],
    items = [],
  } = props;

  return (
    <section className="relative w-full py-16 md:py-24 px-4 sm:px-6 md:px-8 overflow-hidden vector-on-green" style={{ backgroundColor: green }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-[32px] md:rounded-[40px] p-6 sm:p-8 md:p-10 lg:p-12 shadow-2xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 lg:gap-16 items-center">
            {/* Left: Photo */}
            <div className="md:col-span-2 relative">
              <div className="relative rounded-[24px] overflow-hidden w-full">
                <img
                  src={photo}
                  alt=""
                  className="w-full h-auto max-h-[600px] object-contain"
                />
              </div>
            </div>

            {/* Right: Content */}
            <div className="md:col-span-3">
              {/* Eyebrow */}
              <p className="text-xs md:text-sm font-bold tracking-widest uppercase mb-3 md:mb-4" style={{ color: green }}>
                — {eyebrow}
              </p>

              {/* Heading - decreased size, increased line spacing */}
              <h2 className="text-2xl md:text-3xl lg:text-[42px] font-bold leading-snug md:leading-[1.35] mb-8 md:mb-10 text-gray-900 font-poppins">
                {heading.map((seg, i) => (
                  <span key={i} style={seg.highlight ? { color: green } : undefined}>
                    {seg.text}
                  </span>
                ))}
              </h2>

              {/* Aim cards — numbers removed, icon emphasized */}
              <div className="flex flex-col gap-4 md:gap-5">
                {items.map((item, i) => (
                  <motion.div
                    key={item.title || i}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: (i) => ({
                        opacity: 1,
                        y: 0,
                        transition: { delay: 0.1 * i, duration: 0.5, ease: "easeOut" },
                      }),
                    }}
                    className="flex items-center gap-4 md:gap-5 p-4 md:p-5 rounded-[16px]"
                    style={{ backgroundColor: cardBg }}
                  >
                    {/* Icon — enlarged and centered */}
                    <div
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: "#EDF2ED" }}
                    >
                      {item.icon && (
                        <img
                          src={item.icon}
                          alt={item.title}
                          className="w-10 h-10 md:w-12 md:h-12 object-contain"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1.5 leading-tight">{item.title}</h3>
                      <div className="text-xs md:text-sm text-gray-600 leading-relaxed space-y-1">
                        {item.bullets?.map((b, bi) => (
                          <p key={bi} className="flex items-start gap-2">
                            <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#2C6035] shrink-0" />
                            <span>{b}</span>
                          </p>
                        ))}
                      </div>
                      {item.highlight && (
                        <p className="text-xs md:text-sm font-bold text-gray-700 mt-1 pl-3.5">{item.highlight}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
