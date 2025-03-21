/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "0px",
      xsS: "300px",
      xsM: "410px",
      xsL: "470px",
      sm: "600px",
      smXS: "642px",
      smS: "681px",
      smM: "746px",
      smL: "780px",
      md: "960px", // > iPad gen 9 vertical (810x1080)
      mdS: "1045px",
      mdM: "1120px",
      mdL: "1230px",
      lg: "1281px",
      lgS: "1350px",
      lgM: "1440px",
      lgL: "1600px",
      xl: "1920px",
    },
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
