import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        green0: "#EBF3F0",
        green1: "#93FFD8",
        green2: "#CFEBD5",
        green3: '#30880B',
        green4: '#00310B',
        green5: "#30880B",
        red0: "#EE5E67",
        red1: "#D0323C",
        grey0: "#F5F5F5",
        grey1: "#C5C5C5",
        grey2: "#767676",
        grey3: "#4D4D4D",
        purple1: '#EAE4FF',
        purple2: '#7900FF',
        pink1: '#F9E4F2',
        pink2: '#FF77B0',
        blue1: '#DEF7FC',
        blue2: '#3474D4',
        yellow1: '#FBF9E9',
        yellow2: '#F4BF00',
        orange1: '#FFE8DB',
        orange2: '#FF6928',
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
        },
      },
    },
  },
  plugins: [],
};
export default config;
