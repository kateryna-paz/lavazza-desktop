/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}", "./src/**/**/*.{jsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        white: "#ffffff",
        red: "#dd311b",
        raspberry: "#be123c",
        pink: "#fda4af",
        midnight: "#012b53",
        metal: "#33272b",
        "grey-blue": "#3e5f92",
        gold: "#e0b45d",
        "dark-orange": "#a55519",
        "dark-green": "#025301",
        "light-green": "#4d864d",
      },
    },
  },
  plugins: [],
};
