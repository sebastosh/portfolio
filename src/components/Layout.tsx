import { Stack, StackProps } from '@chakra-ui/react'

export const Layout = (props: StackProps) => (
  <Stack
    spacing="2rem"
    width="100%"
    maxWidth="128rem"
    py="1rem"
    {...props}
  />
)
