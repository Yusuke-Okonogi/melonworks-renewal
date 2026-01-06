/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // 👈 appフォルダを見ているか確認
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans JP"', 'sans-serif'],
        en: ['"Inter"', 'sans-serif'],
        pixel: ['"Press Start 2P"', 'cursive'],
        dot: ['"DotGothic16"', 'sans-serif'],
      },
      colors: {
        melon: {
          DEFAULT: '#2A9D8F',
          light: '#E0F2F1',
          dark: '#264653',
          accent: '#2A9D8F'
        },
        accent: {
          red: '#FEF2F2',
          redText: '#E76F51',
        }
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(38, 70, 83, 0.08)',
        'glow': '0 0 15px rgba(42, 157, 143, 0.4)'
      },
      backgroundImage: {
        'melon-gradient': 'linear-gradient(135deg, #264653 0%, #2A9D8F 100%)',
      }
    },
  },
  plugins: [],
};