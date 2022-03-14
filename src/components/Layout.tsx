import {
  Center,
  Container,
  Heading,
  Link as ChakraLink,
  Stack, StackProps,
  Text
} from '@chakra-ui/react'
import { LinkIcon } from '@chakra-ui/icons'
import { ReactNode } from 'react';
import Head from 'next/head';

import { DarkModeSwitch } from './DarkModeSwitch'
import { Footer } from './Footer'

type Props = {
  children?: ReactNode
  fullName?: string
  first?: string
  last?: string
  description?: string
  position?: string
  employer?: string
  employerURL?: string
  menu?: string
};


export const Layout = ({ children, fullName, first, last, description, position, employer, employerURL }: Props) => {

  return (
    <Container position='relative' mb={8} maxWidth='70vw' width={{ base: '100%', sm: '90%', md: '80%' }} >
            <DarkModeSwitch />

    <Stack
      width="100%"
      maxWidth="128rem"
      py="1rem"
    >      
      <Head>
        <title>{first} {last}</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta
          name='description'
          content={description}
        />
        <meta name='og:title' content={fullName} />
        <link rel='icon' href='favicon.ico' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
        <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
        <link rel='manifest' href='/site.webmanifest' />
      </Head>
      <Stack>
      <Heading fontSize='20px' >
        <ChakraLink href='/'>
          {first} <span>{last}</span>
        </ChakraLink>
        </Heading>
      <Text>
        {position} at the <ChakraLink
          isExternal
          href={employerURL}
        ><LinkIcon /> {employer} 
        </ChakraLink>.
      </Text>
      <Text>{description}</Text>
      
      </Stack>
      





      {children}
    </Stack>
    <Footer />

    </Container>
  )
}
