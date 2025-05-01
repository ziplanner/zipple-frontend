import type { Config } from "tailwindcss";
import { PluginAPI } from "tailwindcss/types/config";

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
        secondary: "#2032A7",
        main_bg: "#ECF3FF",
        main40: "#3772F799",
        sub: "#FFE100",
        sub_bg: "#FFFCE8",
        sub_text: "#C6B00D",
        skyblue: "#AFC8FF",
        error: "#FF4D00",
        error_bg: "#FFF0EA",
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
        "14b": ["14px", { fontWeight: "700" }],
        "12b": ["12px", { fontWeight: "700" }],

        "36s": ["36px", { fontWeight: "600" }],
        "30s": ["30px", { fontWeight: "600" }],
        "24s": ["24px", { fontWeight: "600" }],
        "22s": ["22px", { fontWeight: "600" }],
        "20s": ["20px", { fontWeight: "600" }],
        "18s": ["18px", { fontWeight: "600" }],
        "16s": ["16px", { fontWeight: "600" }],
        "12s": ["12px", { fontWeight: "600" }],

        "36m": ["36px", { fontWeight: "500" }],
        "24m": ["24px", { fontWeight: "500" }],
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
        "12r": ["12px", { fontWeight: "400" }],

        "24l": ["24px", { fontWeight: "300" }],
      },
    },
  },
  plugins: [
    function (pluginAPI: PluginAPI) {
      pluginAPI.addUtilities({
        ".custom-scrollbar": {
          position: "relative", // 부모 요소에 position 추가
          overflowY: "scroll", // 세로 스크롤이 항상 보이도록 설정
        },
        ".custom-scrollbar::-webkit-scrollbar": {
          width: "4px", // 스크롤바 너비
          height: "4px", // 스크롤바 높이
          marginRight: "10px",
          marginLeft: "10px",
        },
        ".custom-scrollbar::-webkit-scrollbar-thumb": {
          backgroundColor: "#DDD",
          borderRadius: "20px",
        },
        ".custom-scrollbar::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#DDD",
        },
        ".custom-scrollbar::-webkit-scrollbar-track": {
          backgroundColor: "#fff",
          borderRadius: "20px",
        },
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
      });
    },
  ],
} satisfies Config;
