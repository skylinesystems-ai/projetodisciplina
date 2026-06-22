/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        abyss: "#030306",
        "forge-cyan": "#00f5ff",
        "forge-green": "#39ff88",
        "forge-violet": "#8b5cf6",
        "forge-magenta": "#ff3df2",
        "forge-amber": "#ffce57",
      },
      fontFamily: {
        display: ["Rajdhani", "Oxanium", "Inter", "system-ui", "sans-serif"],
        body: ["Inter", "Segoe UI", "system-ui", "sans-serif"],
      },
      boxShadow: {
        cyan: "0 0 28px rgba(0, 245, 255, 0.35)",
        violet: "0 0 34px rgba(139, 92, 246, 0.28)",
        green: "0 0 32px rgba(57, 255, 136, 0.26)",
      },
    },
  },
  plugins: [],
};
