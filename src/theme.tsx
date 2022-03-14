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
  colors: {
    bg: '#1a202c',
    Work: 'blue',
    Code: 'teal',
    Writing: 'green'
  },
  fonts,
  breakpoints,
  config,
})

export default theme
