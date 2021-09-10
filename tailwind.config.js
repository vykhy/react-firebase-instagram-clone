module.exports = {
    future:{
        removeDeprecatedGapUtilities: true
    },
    theme: {
        fill : (theme) => ({
            red: theme('colors.red.primary')
        }),
        colors: {
            white : '#fff',
            blue: {
                medium : '#005c98'
            },
            black: {
                light: '#262626',
                faded : '#00000059'
            },
            gray: {
                base : '#616161',
                background: '#fafafa',
                primary: '#dbdbdb'
            },
            red: {
                primary: '#ed4956'
            }
        },
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    }
    },
    variants:{
        display: ['group-hover']
    }
}