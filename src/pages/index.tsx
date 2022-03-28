import React, { useState, Key } from "react";
import { ApolloClient, createHttpLink, InMemoryCache, gql } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Client } from '@notionhq/client';

// import projects from '../data/projectData';

import {
  Badge,
  Button,
  IconButton,
  Flex,
  HStack,
  Image,
  Link as ChakraLink,
  Text,
  SimpleGrid,
  Spacer,
  useColorModeValue
} from '@chakra-ui/react'
import { LinkIcon } from '@chakra-ui/icons'
import { FaDev } from 'react-icons/fa';
import { BsGlobe, BsGithub, BsTools, BsFileEarmarkPdfFill, BsPencil } from 'react-icons/bs';
import { MdWork } from 'react-icons/md';
import { Layout } from '../components/Layout'


const Index = ({ profile, items }) => {

  const gray = useColorModeValue('gray.700', 'gray.300')
  const blue = useColorModeValue('blue.800', 'white')

  const [filter, setNewFilter] = useState("");

  const handleFilterChange = (event) => {
    console.log("🚀 ~ file: index.tsx ~ line 36 ~ handleFilterChange ~ event.target.value", event.target.value)
    setNewFilter(event.target.value);

  };

  const filteredItems = !filter
    ? items
    : items.filter((item) =>
      // item.itemType.toLowerCase().includes(filter.toLowerCase())
      item.itemType.includes(filter)
    );

  const skills = profile.properties.skills.multi_select
  const resume = profile.properties.resume.files[0].name
  return (

    <Layout
      fullName={profile.properties.Name.title[0].plain_text}
      first={profile.properties.first.rich_text[0].plain_text}
      last={profile.properties.last.rich_text[0].plain_text}
      description={profile.properties.description.rich_text[0].plain_text}
      position={profile.properties.position.rich_text[0].plain_text}
      employer={profile.properties.employer.rich_text[0].plain_text}
      employerURL={profile.properties.employerURL.url}
    >

      <HStack py={6}>
        <Button leftIcon={<MdWork />} variant='outline' size='sm' value='Work' onClick={handleFilterChange}>
          Work
        </Button>
        <Button leftIcon={<BsGithub />} variant='outline' size='sm' value='Code' onClick={handleFilterChange}>
          Code
        </Button>
        <Button leftIcon={<BsPencil />} variant='outline' size='sm' value='Writing' onClick={handleFilterChange}>
          Writing
        </Button>
        <Spacer />
        <Button aria-label="Download Resume" size='sm' variant='solid' borderRadius={3} color='white' bgColor='blue' leftIcon={<BsTools />} value='Skills' onClick={handleFilterChange}>
          Skills
        </Button>
        <ChakraLink isExternal href={resume}>
                      <Button aria-label="Download Resume" size='sm' variant='solid' borderRadius={3} color='white' bgColor='blue' leftIcon={<BsFileEarmarkPdfFill />}>
                        Resume
                      </Button>
                    </ChakraLink>
      </HStack>


      {filter === 'Skills' ?
        <Flex wrap='wrap' gap='9px' >
          {skills.map((skill) => {
            return (<Badge size='xl' key={skill.id} variant='outline' >{skill.name}</Badge>)
          })}
        </Flex>:null
      }



      <SimpleGrid
        minChildWidth={{ base: '100%', sm: '500px', md: '455px' }}
        spacing={{ base: '35px', sm: '40px', md: '70px' }}

      >


        {filteredItems.map((item) => {

          // const date = new Date(item.date).toLocaleDateString('en-us', { year: 'numeric', month: 'short' });

          const imageAlt = 'Thumbnail image for ' + item.title

          return (
            <Flex 
              key={item.id}
              alignItems='flex-start'
              direction={{ base: 'column', sm: 'row', md: 'row' }}
            >

              <Image
                display={{ base: 'none', sm: 'block', md: 'block' }}
                border='1px'
                width={{ base: '100%', sm: '50%', md: '30%' }}
                height='150px'
                objectFit='cover'
                src={item.thumbnail}
                alt={imageAlt}
                mr='.5em'
              />

              <Flex direction='column' justifyItems='start' h='100%' w='100%'>
                <Text fontSize='26px' fontWeight='bold' lineHeight={1} >{item.title}</Text>

                <Text
                  color={gray}
                  mb={2}
                  fontSize='14px'
                  noOfLines={2}
                >{item.description}</Text>

                <Image
                  display={{ base: 'block', sm: 'none', md: 'none' }}
                  border='1px'
                  width={{ base: '100%', sm: '50%', md: '30%' }}
                  height='150px'
                  objectFit='cover'
                  src={item.thumbnail}
                  alt={imageAlt}
                  mb='0.5em'
                />

                <Flex
                  direction={{ base: 'row', sm: 'column', md: 'column' }}  
                  justify='space-between'
                  flex='1'
                >
      <Flex
        wrap='wrap' gap='8px' alignItems='center'

      >
                  {item.topics.map((topic: String, i: Key) => {
                    return (<Badge key={i} color={blue} variant='outline' >{topic}</Badge>)
                  })}
                </Flex>
<Spacer />
                <HStack>
                  {item.itemType === 'Code' ?
                    <ChakraLink isExternal href={item.url + '#readme'} >
                      <Button aria-label="Link to Source Code" size='xs' variant='solid' borderRadius={3} colorScheme='gray' leftIcon={<BsGithub />}>
                        Source
                      </Button>
                    </ChakraLink> : null
                  }
                  {item.itemType === 'Code' ?
                    <ChakraLink isExternal href={item.homepageUrl}>
                      <Button aria-label="Link to Demo" size='xs' variant='solid' borderRadius={3} color='white' bgColor='blue' leftIcon={<LinkIcon />}>
                        Demo
                      </Button>
                    </ChakraLink> : null
                  }
                  {item.itemType === 'Writing' ?
                    <ChakraLink isExternal href={item.url}>
                      <Button aria-label="Link to Article" size='xs' variant='solid' borderRadius={3} color='white' bgColor='blue' leftIcon={<FaDev />}>
                        Article
                      </Button>
                    </ChakraLink> : null
                  }
                  {item.itemType === 'Work' ?
                    <ChakraLink isExternal href={item.url}>
                      <Button aria-label="Link to Website" size='xs' variant='solid' borderRadius={3} color='white' bgColor='blue' leftIcon={<BsGlobe />}>
                        URL
                      </Button>
                    </ChakraLink> : null
                  }
                </HStack>
                </Flex>




              </Flex>

            </Flex>
          )
        })}
      </SimpleGrid>
    </Layout>
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

  // Get posts from Github with graphql
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

  function notionCleanup(object) {

    const withProps = {
      id: object.id,
      date: object.properties.date.date.start,
      title: object.properties.Title.title[0].plain_text,
      url: object.properties.url.url,
      source: object.properties.source.url,
      description: object.properties.description.rich_text[0].plain_text,
      thumbnail: object.properties.thumbnail.files[0].name,
      itemType: 'Work',
    };

    const getTopics = object.properties.Topics.multi_select.map(topic => topic.name);

    const newObj = { ...withProps, topics: getTopics };

    return newObj;
  }
  const projects = projectsDB.results.map(project => notionCleanup(project))

  const items = [...projects, ...repos, ...articles].sort(function (a, b) {
    return +new Date(b.date) - +new Date(a.date);
  });

  return {
    props: {
      profile,
      items
    },
  };
}

export default Index