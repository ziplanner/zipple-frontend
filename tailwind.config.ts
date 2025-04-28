import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"],
      },
      colors: {
        main: "#3772F7",
        main40: "#3772F799",
        sub: "#FFE100",
        skyblue: "#AFC8FF",
        error: "#FF4D00",
        btn: "#353535",
        btn40: "#35353566",
        hover: "#F0F4FF",
        border: "#EEE",
        text: {
          primary: "#222222",
          secondary: "#767676",
          light: "#949494",
          menu: "#505050",
        },
        background: {
          light: "#DDDDDD",
          soft: "#F5F5F5",
          extraSoft: "#F6F6F9",
        },
      },
      boxShadow: {
        default: "2px 2px 12px 0px rgba(0, 0, 0, 0.12)",
        border: "0px -3px 20px 0px rgba(0, 0, 0, 0.05)",
        modal: "0px -6px 30px 0px rgba(0, 0, 0, 0.08)",
      },
      maxWidth: {
        "screen-xl2": "1920px",
      },
      screens: {
        sm: "360px",
        md: "768px",
        lg: "1024px",
        lx: "1288px",
      },
      fontSize: {
        "36eb": ["36px", { fontWeight: "800" }],
        "22eb": ["36px", { fontWeight: "800" }],

        "24b": ["24px", { fontWeight: "700" }],

        "36s": ["36px", { fontWeight: "600" }],
        "24s": ["24px", { fontWeight: "600" }],
        "22s": ["22px", { fontWeight: "600" }],
        "20s": ["20px", { fontWeight: "600" }],
        "18s": ["18px", { fontWeight: "600" }],
        "16s": ["16px", { fontWeight: "600" }],
        "12s": ["12px", { fontWeight: "600" }],

        "36m": ["36px", { fontWeight: "500" }],
        "22m": ["22px", { fontWeight: "500" }],
        "20m": ["20px", { fontWeight: "500" }],
        "18m": ["18px", { fontWeight: "500" }],
        "16m": ["16px", { fontWeight: "500" }],
        "14m": ["14px", { fontWeight: "500" }],
        "12m": ["12px", { fontWeight: "500" }],

        "20r": ["20px", { fontWeight: "400" }],
        "18r": ["18px", { fontWeight: "400" }],
        "16r": ["16px", { fontWeight: "400" }],
        "14r": ["14px", { fontWeight: "400" }],

        "24l": ["24px", { fontWeight: "300" }],
      },
    },
  },
  plugins: [],
} satisfies Config;
