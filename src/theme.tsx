import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

const fonts = { mono: `'Menlo', monospace` }

const config = {
  useSystemColorMode: true,
}

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
})

const theme = extendTheme({
  fonts,
  breakpoints,
  config,
  colors: {
    bg: '#1a202c',
    blue:'#1A365D',
  },
  components: {
    Badge: {
      // 1. We can update the base styles
      baseStyle: {
        fontWeight: 'medium', // Normally, it is "semibold"
      },
      // 2. We can add a new button size or extend existing
      sizes: {
        xl: {
          fontSize: '18px',
          px: '5px',
        },
      },
      // 3. We can add a new visual variant
      variants: {
        'with-shadow': {
          // bg: props.colorMode === 'dark' ? 'red.300' : 'red.500',
          boxShadow: '1px 1px 0 2px  #efdfde',
        },
        // 4. We can override existing variants
        // outline: (props) => ({
        //   boxShadow: '1px 1px 0 2px #efdfde',
        // }),
      },
    },
  },
})

export default theme
