import {nextui} from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./src/**/**/*.{js,ts,jsx,tsx}",
    "../packages/ui/src/**/**/*.{js,ts,jsx,tsx}",
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        NFUltra: ["NFUltra"]
      },
      height: {
        '80vh': '80vh',
        '100vh': '100vh',
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}
