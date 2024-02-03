/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
    colors: {
      primary: "#F5F7F8",
      dark: "#F5F7F8",
      secondary: "#F85606",
      secondaryLight: "#ff806c",
      secondaryDark: "#DF4D05",
    },
  },
  plugins: [],
};
