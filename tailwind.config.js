 /** @type {import('tailwindcss').Config} */
 export default {
    theme: {
      extend: {
        fontSize: {
          '2xs': '0.625rem',
        },
        colors: {
          'mp-purple': {
            'dark': '#2f203f',
            'default': '#342446',
            'text': '#473c77',
          },
          'mp-blue': {
            'dark': '#4985d3',
            'default': '#5292e4',
          },
          'mp-green': {
            'dark': '#35b583',
            'default': '#38C28C',
          },
          'mp-orange': {
            'default': '#FF7702'
          }
        }
      },
    },
    plugins: [
      require('tailwindcss-animated')
    ],
    blocklist: [
      'collapse',
      'container',
    ],
    corePlugins: { 
      preflight: false 
    }
}