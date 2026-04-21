/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eef4fb",
          100: "#d6e4f7",
          200: "#adc9ef",
          300: "#84aee7",
          400: "#5b93df",
          500: "#1b4b8c",
          600: "#163f75",
          700: "#11325e",
          800: "#0c2547",
          900: "#071930",
        },
        accent: {
          100: "#e0f7ff",
          200: "#b3ecff",
          300: "#80e1ff",
          400: "#4dd6ff",
          500: "#00bfff",
          600: "#0099cc",
          700: "#007399",
        },
        link: {
          DEFAULT: "#c10eb2",
          hover: "#e011cf",
        },
        neutral: {
          white: "#ffffff",
          card: "#f8f5f5",
          list: "#f0eeee",
          border: "#000000",
        },
        warning: {
          500: "gold",
        },
      },
      backgroundImage: {
        header: "linear-gradient(20deg, #571261, #2b4e86)",
      },
    },
  },
  plugins: [],
}