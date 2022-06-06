const defaultTheme = require('tailwindcss/defaultTheme')
const windmill = require('@windmill/react-ui/config')

module.exports = windmill({
  // purge: ['src/**/*.js'],
  mode: 'jit',
  purge:{
    content: ['src/**/*.js'],
    safelist:['mx-0','mx-1','mx-2','mx-3','mx-4','mx-5','mx-6','mx-8','mx-10','mx-12','mx-16','mx-20','mx-24','mx-32','mx-40','mx-48','mx-56','mx-64']
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        bottom: '0 5px 6px -7px rgba(0, 0, 0, 0.6), 0 2px 4px -5px rgba(0, 0, 0, 0.06)',
      },
    },
  },
})
