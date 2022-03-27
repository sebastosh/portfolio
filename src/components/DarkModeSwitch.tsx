import { IconButton, FormControl, FormLabel, useColorMode, Switch } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  return (
<IconButton
aria-label='Switch Color Mode'
onClick={toggleColorMode}
icon={isDark ? <SunIcon />:<MoonIcon />}
/>

  )
}
