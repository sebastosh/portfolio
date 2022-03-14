import { Code, Center, Text , Link as ChakraLink, Button } from '@chakra-ui/react'
import { BsGithub } from 'react-icons/bs';

export const Footer = () => (
  <Center borderTop='1px' mt={4} p={8}>  
            <Text>
          Built with Next.js + chakra-ui + TypeScript
        </Text>
    <ChakraLink
      isExternal
      href="https://github.com/sebastosh/portfolio"
      mx={2}
    >
      <Button size='sm' variant="solid" colorScheme='gray' leftIcon={<BsGithub />}>
        View Source
      </Button>
    </ChakraLink>
  </Center>
)
