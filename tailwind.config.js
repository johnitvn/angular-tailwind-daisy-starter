/** @type {import('tailwindcss').Config} */

const common = {
  // primary color
  "--p": "58% 0.23 260",
  "--rounded-btn": "0.5rem",
  "--rounded-selector": ".5rem",
  "--rounded-field": ".25rem",
  "--rounded-box": ".5rem",
};

module.exports = {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: ["./src/**/*.{html,ts}"],
  theme: {
    fontFamily: {
      sans: [
        "Poppins",
        "ui-sans-serif",
        "system-ui",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ],
      mono: [
        "ui-monospace",
        "SFMono-Regular",
        "Menlo",
        "Monaco",
        "Consolas",
        "Liberation Mono",
        "Courier New",
        "monospace",
      ],
    },
    animation: {
      shake: "shake 0.5s ease-in-out",
    },
    keyframes: {
      shake: {
        "0%": { transform: "translateX(0)" },
        "25%": { transform: "translateX(-6px)" },
        "50%": { transform: "translateX(6px)" },
        "75%": { transform: "translateX(-6px)" },
        "100%": { transform: "translateX(0)" },
      },
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          ...common,
        },
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          ...common,
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
