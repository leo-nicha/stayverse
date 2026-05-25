/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Row 1: Cyan/Teal tones
        tealPalette: {
          50: '#90E6F9',
          100: '#47C2DB',
          200: '#369AAD',
          300: '#287686',
          400: '#19525D',
          500: '#0A2D34',
          600: '#010D10',
        },
        // Row 2: Warm Taupe/Nude tones
        taupePalette: {
          50: '#F0E9E6',
          100: '#D4BEB5',
          200: '#BA9484',
          300: '#947568',
          400: '#6C554A',
          500: '#43342D',
          600: '#1E1612',
        },
        // Row 3: Orange/Copper/Amber tones
        orangePalette: {
          50: '#F9D2BB',
          100: '#F39D66',
          200: '#CF7536',
          300: '#A15A28',
          400: '#723E19',
          500: '#43220B',
          600: '#180902',
        },
        // Row 4: Ice Blue/Slate tones
        bluePalette: {
          50: '#DBEEF6',
          100: '#90CEE5',
          200: '#6AA8BE',
          300: '#538597',
          400: '#3B606E',
          500: '#223B44',
          600: '#0C1A1F',
        },
        // Row 5: Cool Gray tones
        grayPalette: {
          50: '#EDEFF0',
          100: '#C2C9CC',
          200: '#9BA3A8',
          300: '#7B8285',
          400: '#595F61',
          500: '#383B3D',
          600: '#191B1C',
        },
        // Semantic aliases using palette colors
        brand: {
          primary: '#CF7536', // From orangePalette.200 (like The Agent's main theme orange)
          primaryHover: '#A15A28', // From orangePalette.300
          darkBg: '#191B1C', // From grayPalette.600
          lightBg: '#EDEFF0', // From grayPalette.50
          textDark: '#1E1612', // From taupePalette.600
          textLight: '#EDEFF0', // From grayPalette.50
          accent: '#47C2DB', // From tealPalette.100
        }
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif'],
      }
    },
  },
  darkMode: "class",
  plugins: [],
}
