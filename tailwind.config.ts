import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      blue: {
        whisper: "#00FFFF",
      },
      magenta: {
        vividMagenta: "#FF0099",
      },
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-chatcard-1":
          "linear-gradient(45deg, rgba(11, 35, 30, 0.5), rgba(10, 33, 40, 0.5))",
        "gradient-chatcard-2":
          "linear-gradient(90deg, rgba(13, 33, 32, 0.5), rgba(22, 35, 24, 0.5))",
        "gradient-chatcard-3":
          "linear-gradient(180deg, rgba(23, 21, 49, 0.5), rgba(12, 35, 30, 0.5))",
        "gradient-chatcard-4":
          "linear-gradient(60deg, rgba(61, 34, 13, 0.5), rgba(107, 62, 27, 0.5))",
        "gradient-chatcard-5":
          "radial-gradient(circle, rgba(52, 46, 12, 0.5), rgba(79, 61, 18, 0.5))",
        "gradient-chatcard-6":
          "radial-gradient(circle, rgba(25, 28, 41, 0.5), rgba(42, 47, 74, 0.5))",
        "gradient-chatcard-7":
          "radial-gradient(circle, rgba(27, 20, 51, 0.5), rgba(16, 61, 74, 0.5))",
        "gradient-chatcard-8":
          "linear-gradient(180deg, rgba(36, 32, 22, 0.5), rgba(10, 33, 40, 0.5))",
        "gradient-chatcard-9":
          "linear-gradient(135deg, rgba(61, 34, 13, 0.5), rgba(15, 43, 30, 0.5))",
        "gradient-chatcard-10":
          "linear-gradient(45deg, rgba(107, 62, 27, 0.5), rgba(18, 66, 53, 0.5))",
        "gradient-chatcard-11":
          "linear-gradient(135deg, rgba(0, 102, 102, 0.5), rgba(15, 43, 30, 0.5))",
        "gradient-chatcard-12":
          "linear-gradient(60deg, rgba(15, 43, 30, 0.5), rgba(27, 20, 51, 0.5))",
        "gradient-chatcard-13":
          "radial-gradient(circle, rgba(61, 34, 13, 0.5), rgba(36, 32, 22, 0.5))",
      },
    },
  },
  plugins: [],
};
export default config;
