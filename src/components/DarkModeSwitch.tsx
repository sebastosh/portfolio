import { 
  Box,
  IconButton, 
  useColorMode,
  useColorModeValue,
  Link as ChakraLink,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
 } from '@chakra-ui/react'
import { MoonIcon, SunIcon, HamburgerIcon } from '@chakra-ui/icons'

export const DarkModeSwitch = ({resume}) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === 'dark'

  return (


<IconButton
position='fixed'
top='0'
right='0'
m='1em' 
aria-label='Switch Color Mode'
onClick={toggleColorMode}
icon={isDark ? <SunIcon />:<MoonIcon />}
/>

  )
}
