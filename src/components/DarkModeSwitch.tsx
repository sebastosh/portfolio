import { FormControl, FormLabel, useColorMode, Switch } from '@chakra-ui/react'

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  return (
    <FormControl display='flex' alignItems='center'>
  <FormLabel htmlFor='color-mode' mb='0'>
    Theme
  </FormLabel>
  <Switch
      id='color-mode'
      isChecked={isDark}
      onChange={toggleColorMode}
    />
</FormControl>

  )
}
