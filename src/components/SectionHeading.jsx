export default function SectionHeading({ eyebrow, title, subtitle, dark, font = "font-poppins", opacity = 0.9 }) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-12">
      {eyebrow && (
        <p
          className={`text-sm font-bold tracking-wide uppercase mb-2 ${dark ? "text-white" : "text-primary"}`}
        >
          — {eyebrow}
        </p>
      )}
      <h2
        className={`text-3xl md:text-5xl font-bold ${dark ? "text-white" : "text-primary"}`}
        style={{ opacity: dark ? 1 : opacity }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 font-medium ${dark ? "text-gray-200" : "text-gray-800"}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
