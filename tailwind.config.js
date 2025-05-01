/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {}
  },
  plugins: [],
  safelist: [
    'bg-red-100',
    'text-red-800',
    'bg-green-100',
    'text-green-800',
    'bg-yellow-100',
    'text-yellow-800',
    'bg-blue-100',
    'text-blue-800',
    'bg-purple-100',
    'text-purple-800',
    'bg-orange-100',
    'text-orange-800',
  ]
};
