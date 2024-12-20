const defaultTheme = require("tailwindcss/defaultTheme");
const svgToDataUri = require("mini-svg-data-uri");
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        customco1: "#d3dde1",
        customco2: "#C886A2",
        customco3: "#3C465C",
        customco4: "#444d5c",
        customco5: "#dadbde",
        customco6: "#857DB0",
        customco7: "#c0b4ce",
        customco8: "#c6abe4",
        customco9: "#857DB0",
        customco10: "#857DB0",
        gradcolour1l: "#805ec7",
        gradcolour1m: "#805887",
        gradcolour1r: "#694335",
        gradcolour2l: "#805ec7",
        gradcolour2m: "#644882",
        gradcolour2r: "#694335",
        gradhighlight1: "#FFA33C",
        gradhighlight2: "#ffd19e",
        gradhighlight3: "#30AADD",
        chatcotop: "#09090B",
        chatcobottom: "#18181A",
        chatpanelborder: "#27272A",
        chatlistbody: "#393B4A",
        chatlistborder: "#242635",
        tagsbg: "#FF6D6B",
        tagstext: "#3A3B3A",
        navsidebar: "#1c222f",
        blue: {whisper: "#00FFFF"},
        magenta: {vividMagenta: "#FF0099"},
        gradient1left: 'rgba(11, 35, 30, 0.5)',
        gradient1right: 'rgba(10, 33, 40, 0.5)',
        gradient2left: 'rgba(13, 33, 32, 0.5)',
        gradient2right: 'rgba(22, 35, 24, 0.5)',
        gradient3left: 'rgba(23, 21, 49, 0.5)',
        gradient3right: 'rgba(12, 35, 30, 0.5)',
        gradient4left: 'rgba(61, 34, 13, 0.5)',
        gradient4right: 'rgba(107, 62, 27, 0.5)',
        gradient5left: 'rgba(52, 46, 12, 0.5)',
        gradient5right: 'rgba(79, 61, 18, 0.5)',
        gradient6left: 'rgba(25, 28, 41, 0.5)',
        gradient6right: 'rgba(42, 47, 74, 0.5)',
        gradient7left: 'rgba(27, 20, 51, 0.5)',
        gradient7right: 'rgba(16, 61, 74, 0.5)',
        gradient8left: 'rgba(36, 32, 22, 0.5)',
        gradient8right: 'rgba(10, 33, 40, 0.5)',
        gradient9left: 'rgba(61, 34, 13, 0.5)',
        gradient9right: 'rgba(15, 43, 30, 0.5)',
        gradient10left: 'rgba(107, 62, 27, 0.5)',
        gradient10right: 'rgba(18, 66, 53, 0.5)',
        gradient11left: 'rgba(0, 102, 102, 0.5)',
        gradient11right: 'rgba(15, 43, 30, 0.5)',
        gradient12left: 'rgba(15, 43, 30, 0.5)',
        gradient12right: 'rgba(27, 20, 51, 0.5)',
        gradient13left: 'rgba(61, 34, 13, 0.5)',
        gradient13right: 'rgba(36, 32, 22, 0.5)',
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function addVariablesForColors({ addBase, theme }) {
      let allColors = flattenColorPalette(theme("colors"));
      let newVars = Object.fromEntries(
        Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
      );

      addBase({
        ":root": newVars,
      });
    },
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "bg-grid": (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-grid-small": (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-dot": (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
    },
  ],
};
