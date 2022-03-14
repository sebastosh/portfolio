import {
    Container,
    Flex,
    Heading,
    Link as ChakraLink,
    Stack,
    Text
  } from '@chakra-ui/react'

  import { DarkModeSwitch } from './DarkModeSwitch'

  export const Nav = () => {
  
    return (
      <Flex 
        justifyContent='space-between'
      >
          <Text>TEST</Text>
              <DarkModeSwitch />
  
    

      </Flex>
    )
  }

  export default Nav
  