const { fontFamily } = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: { center: true },
    extend: {
      keyframes: {
        "spin-reverse": {
          to: { transform: "rotate(-360deg)" },
        },
        "back-and-forth": {
          from: { left: "0%", transform: "translate(0%, -50%)" },
          to: { left: "100%", transform: "translate(-100%, -50%)" },
        },
      },
      animation: {
        orbit: "spin 180s linear infinite",
        "orbit-reverse": "spin-reverse 180s linear infinite",
        "orbit-slow": "spin 200s linear infinite",
        "orbit-slow-reverse": "spin-reverse 200s linear infinite",
        "back-and-forth-1": "back-and-forth 1s ease-in-out infinite alternate",
        "back-and-forth-2":
          "back-and-forth 1s ease-in-out infinite alternate .2s",
        "back-and-forth-3":
          "back-and-forth 1s ease-in-out infinite alternate .4s",
        "back-and-forth-4":
          "back-and-forth 1s ease-in-out infinite alternate .6s",
        "back-and-forth-5":
          "back-and-forth 1s ease-in-out infinite alternate .8s",
        "back-and-forth-6":
          "back-and-forth 1s ease-in-out infinite alternate 1s",
      },
      screens: {
        sm: "640px",
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1536px",
        // => @media (min-width: 1536px) { ... }

        "3xl": "1920px",
        // => @media (min-width: 1920px) { ... }

        "4xl": "2560px",
        // => @media (min-width: 2560px) { ... }

        tall: { raw: "(orientation: portrait)" },
      },
      fontFamily: {
        abel: ["var(--font-abel)", ...fontFamily.sans],
        prompt: ["var(--font-prompt)", ...fontFamily.sans],
        fjalla: ["var(--font-fjalla)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
