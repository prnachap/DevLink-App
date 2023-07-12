/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        hanPurple: "#633CFF",
        paleViolet: "#BEADFF",
        Lavender: "#EFEBFF",
        darkCharcoal: "#333333",
        nickel: "#737373",
        lightSilver: "#D9D9D9",
        lotion: "#FAFAFA",
        white: "#FFFFFF",
        coralRed: "#FF3939",
      },
    },
  },
  plugins: [],
};
