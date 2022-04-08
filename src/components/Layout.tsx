import {
  Container,
  Flex,
  Heading,
  Link as ChakraLink,
  Stack,
  Center,
  Text,
  VStack
} from '@chakra-ui/react'
import { ReactNode } from 'react';
import Head from 'next/head';


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
};


export const Layout = ({ children, fullName, first, last, description }: Props) => {

  return (
    <Container
      mb={8}
      maxWidth='100vw'
      w={{ base: '100%', sm: '80%', md: '60%' }}
      p={{ base: '0.7rem', sm: '1rem', md: '1rem' }}
      border='1px'
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
        <link rel='icon' href='/favicon.ico' />
        <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
        <link rel='manifest' href='/site.webmanifest' />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#E2E8F0"></meta>
      </Head>



      {children}

      <Footer />



    </Container>
  )
}
