/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./views/*.{html,ejs}'],
  theme: {
    fontFamily: {
      inter: ['Inter'],
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
