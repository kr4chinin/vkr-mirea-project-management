/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  plugins: ['prettier-plugin-tailwindcss', 'prettier-plugin-organize-imports'],
  tabWidth: 2,
  printWidth: 100,
  singleQuote: true,
  arrowParens: 'avoid',
  trailingComma: 'es5',
};

export default config;
