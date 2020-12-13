module.exports = {
  purge: ['./src/pages/**/*.tsx', './src/components/**/*.tsx'],
  theme: {
    fontFamily: {
      sans: ['"Inter"', 'sans-serif'],
      serif: ['"Georgia"', 'serif'],
    },
  },
  variants: {
    margin: ['last', 'responsive'],
  },
};
