// @ts-check

/** @type {import('prettier').Options} */
module.exports = {
  printWidth: 80,
  semi: false,
  singleQuote: true,
  plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
}
