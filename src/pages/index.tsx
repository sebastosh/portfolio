import React, { useState, Key } from "react";
import { ApolloClient, createHttpLink, InMemoryCache, gql } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Client } from '@notionhq/client';
import Head from 'next/head';

// import profile from '../data/profileData';
import projects from '../data/projectData';


import {
  Badge,
  Button,
  Container,
  Center,
  Flex,
  Heading,
  HStack,
  Link as ChakraLink,
  Text,
  SimpleGrid,
  Spacer,
  Stack,
  useColorModeValue
} from '@chakra-ui/react'
import { AtSignIcon, CheckCircleIcon, LinkIcon } from '@chakra-ui/icons'
import { DiGithubBadge } from 'react-icons/di';
import { BsGlobe, BsGithub } from 'react-icons/bs';
import { Layout } from '../components/Layout'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { Footer } from '../components/Footer'

const Index = ({ profile, items, notion }) => {

  const [filter, setNewFilter] = useState("");

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const filteredItems = !filter
    ? items
    : items.filter((item) =>
      // item.itemType.toLowerCase().includes(filter.toLowerCase())
      item.itemType.includes(filter)
    );

  return (
    <Container height="100vh">
      <Head>
        <title>{profile.properties.Name.title[0].plain_text}</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta
          name='description'
          content={profile.properties.description.rich_text[0].plain_text}
        />
        <meta name='og:title' content={profile.properties.Name.title[0].plain_text} />
        <link rel='icon' href='favicon.ico' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
        <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
        <link rel='manifest' href='/site.webmanifest' />
      </Head>

      <Layout>
        <Heading bgGradient='linear(to-l, #7928CA, #FF0080)'
          bgClip='text'>
          <ChakraLink href='/'>
            {profile.properties.Name.title[0].plain_text}
          </ChakraLink></Heading>
        <Text>
          {profile.properties.position.rich_text[0].plain_text} at the <ChakraLink
            isExternal
            href={profile.properties.employerURL.url}
          >
            {profile.properties.employer.rich_text[0].plain_text} <LinkIcon />
          </ChakraLink>.
        </Text>
        <Text>{profile.properties.description.rich_text[0].plain_text}</Text>

        <HStack spacing={5} mb={10}>
          <Button size='sm' value='Work' onClick={handleFilterChange}>
            Work
          </Button>
          <Button size='sm' value='Code' onClick={handleFilterChange}>
            Code
          </Button>
          <Button size='sm' value='Writing' onClick={handleFilterChange}>
            Writing
          </Button>
        </HStack>
        <SimpleGrid minChildWidth='300px' spacing='30px' >

          {filteredItems.map((item) => {

            // const date = new Date(item.date).toLocaleDateString('en-us', { year: 'numeric', month: 'short' });

            const border = useColorModeValue('brand.dark', '')

            return (

              <Stack spacing={2} key={item.id} direction='column' h='140px'>

                <Text fontSize={20} fontWeight='bold' >{item.title}</Text>




                <HStack wrap='wrap' alignContent='flex-start'>
                <Badge colorScheme='green' variant='outline' >{item.itemType}</Badge>
                  {item.topics.map((topic: String, i: Key) => {
                    return (<Badge key={i} colorScheme='cyan' variant='outline' >{topic}</Badge>)
                  })}
                </HStack>
                <Text>{item.description}</Text>
                <HStack>
                  {item.itemType === 'Code' ? <ChakraLink isExternal href={item.url + '#readme'} ><Button variant='solid' colorScheme='blue' size='xs'><BsGithub /> Source</Button> </ChakraLink> : null}
                  {item.itemType === 'Code' ? <ChakraLink isExternal href={item.homepageUrl}><Button variant='solid' colorScheme='blue' size='xs'><LinkIcon /> Demo</Button></ChakraLink> : null}
                  {item.itemType === 'Writing' ? <ChakraLink isExternal href={item.url}><Button variant='solid' colorScheme='blue' size='xs'><LinkIcon boxSize='1.5em' pr='4px'/> Read More</Button></ChakraLink> : null}
                  {item.itemType === 'Work' ? <ChakraLink isExternal href={item.url}><Button variant='solid' colorScheme='blue' size='xs'><BsGlobe size='1.2em'/> URL</Button></ChakraLink> : null}
                </HStack>
           







              </Stack>

            )

          })
          }
        </SimpleGrid>


        <Center >





        </Center>


      </Layout>
      <Footer />
      <DarkModeSwitch />

    </Container>
  )
}

export async function getStaticProps() {
  function gitHubCleanup(obj) {
    const withDate = { ...obj, date: obj.refs.nodes[0].target.date };
    delete withDate.refs;

    const getTopics = obj.repositoryTopics.nodes.map(topic => topic.topic.name);

    const newObj = { ...withDate, topics: getTopics, __typename: 'Code' };
    delete newObj.repositoryTopics;

    return newObj;
  }

  function devToCleanup(obj) {

    const newObj = { ...obj, itemType: 'Writing' };

    return newObj;
  }

  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const httpLink = createHttpLink({
    uri: 'https://api.github.com/graphql',
  });

  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
    },
  }));

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
        {
          user(login: "sebastosh") {
          pinnedItems(first: 6, types: [REPOSITORY]) {
            edges {
              node {
                ... on Repository {
                  id
                  name
                  url
                  homepageUrl
                  description
                  openGraphImageUrl
                  usesCustomOpenGraphImage
                  refs(refPrefix: "refs/heads/", last: 1) {
                    nodes {
                      name
                      target {
                        ... on Commit {
                          date: pushedDate
                        }
                      }
                    }
                  }
                  repositoryTopics(first: 10) {
                    nodes {
                      topic {
                        name
                      }
                    }
                  }
                }
              }
            }
          }
          }
        }
      `,
  });

  const { user } = data;
  const pinnedRepos = user.pinnedItems.edges.map((edge: any) => edge.node);

  const pinnedFlat = pinnedRepos.map(obj => gitHubCleanup(obj));
  const pinnedRename = pinnedFlat.map(({ name, __typename, openGraphImageUrl, ...rest }) => ({ title: name, itemType: __typename, thumbnail: openGraphImageUrl, ...rest }));

  const repos = pinnedRename;

  // Get posts from Dev.to
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Api-Key', process.env.DEV_TOKEN!);
  const devPosts = await fetch('https://dev.to/api/articles/me', {
    headers: requestHeaders,
  });
  const articlesArray = await devPosts.json();

  const articles = articlesArray.map(({ tag_list, published_at, type_of, cover_image, ...rest }) => ({ topics: tag_list, date: published_at, itemType: type_of, thumbnail: cover_image, ...rest })).map(article => devToCleanup(article));

  //Notion Profile and Projects Data
  const getNotion = new Client({ auth: process.env.NOTION_TOKEN });
  const databaseId = `${process.env.NOTION_PROJECTS_ID}`;
  const projectsDB = await getNotion.databases.query({
    database_id: databaseId,
  });

  const pageId = '1539b72fb7684bb8afe08e4045494cce';
  const profile = await getNotion.pages.retrieve({ page_id: pageId });


  const notion = [profile, projectsDB]


  const items = [...projects, ...repos, ...articles].sort(function (a, b) {
    return +new Date(b.date) - +new Date(a.date);
  });

  return {
    props: {
      profile,
      items,
      notion,
    },
  };
}

export default Index