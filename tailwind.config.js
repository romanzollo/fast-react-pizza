/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    // extend - расширяет стандартные настройки
    extend: {
      fontFamily: {
        // sans - для всей страницы
        sans: 'Roboto Mono, monospace',
      },

      // переопределяем высоту вьюпорта (h-screen)
      height: {
        // Dynamic viewport height - '100vh' с учетом мобильных устройств
        screen: '100dvh',
      },

      /* пример расширения цвета */
      // colors: {
      //   pizza: '#123456',
      // },

      /* пример расширения размера шрифта */
      //   fontSize: {
      //     huge: ['80rem', { lineHeight: '1' }],
      //   },
    },
  },
  plugins: [],
};
