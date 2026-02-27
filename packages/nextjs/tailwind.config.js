/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Playfair Display', 'serif'],
            },
            colors: {
                brand: {
                    50: '#fff8ed',
                    100: '#ffefd3',
                    200: '#ffdba5',
                    300: '#ffc06d',
                    400: '#ff9c32',
                    500: '#ff7d0a',
                    600: '#f05d00',
                    700: '#c74302',
                    800: '#9e350b',
                    900: '#7f2e0c',
                },
                dark: {
                    bg: '#0d0d0d',
                    surface: '#1a1a1a',
                    card: '#242424',
                    border: '#333333',
                },
            },
            backgroundImage: {
                'hero-gradient': 'linear-gradient(135deg, #1a0a00 0%, #2d1200 50%, #1a0a00 100%)',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.4s ease-out',
                'shimmer': 'shimmer 1.5s infinite',
            },
            keyframes: {
                fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
                slideUp: { '0%': { transform: 'translateY(20px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
                shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
            },
        },
    },
    plugins: [],
};
