import { Code, HStack, Text , Link as ChakraLink, Button } from '@chakra-ui/react'

export const Footer = () => (
  <HStack
    position="fixed"
    bottom="0"
    maxWidth="48rem"
    p={3}
    backgroundColor='bg'
    border='1px'
  >  
            <Text>
          Built with <Code>Next.js</Code> + <Code>chakra-ui</Code> + <Code>TypeScript</Code>.
        </Text>

    <ChakraLink
      isExternal
      href="https://github.com/vercel/next.js/blob/canary/examples/with-chakra-ui-typescript"
      flexGrow={3}
      mx={2}
    >
      <Button variant="solid" colorScheme="green">
        View Repo
      </Button>
    </ChakraLink>
  </HStack>
)
