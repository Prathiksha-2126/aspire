/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Standard color theme
        primary: {
          DEFAULT: "#2C6035", // Dark Green
        },
        white: "#FFFFFF",
        subtitle: "#C8C8C8", // Grey Subtitle
        // Keep existing colors for compatibility
        aspire: {
          50: "#e8f5e9",
          100: "#c8e6c9",
          400: "#4caf50",
          card: "#4B7553",
          600: "#2C6035",
          700: "#245029",
          900: "#035B31",
          teal: "#05796B",
        },
        footer: {
          text: "#674646",
          heading: "#2B2B2B",
          accent: "#906262",
          muted: "#775151",
          social: "#533939",
        },
        subheader: "#8593A3",
        offwhite: "#F9F8F5",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"], // Set Poppins as default
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        manrope: ["Manrope", "sans-serif"],
        lato: ["Lato", "sans-serif"],
        sourcesans: ["Source Sans Pro", "sans-serif"],
      },
    },
  },
  plugins: [],
};
