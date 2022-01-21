import {
    HStack,
    Icon,
    InputGroup,
    Input,
    InputLeftElement,
    List,
    VStack,
    useColorModeValue,
    useColorMode,
    Stack,
    Heading,
    Image,
    Text,
    AspectRatio,
    ListItem,
    Button,
} from '@chakra-ui/react';
import { HiOutlineSearch } from 'react-icons/hi';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import * as React from 'react';
import fetch from 'node-fetch';
import { API_URL } from 'src/api/UserContext';
import NextLink from 'next/link';

type Map = {
    id: string;
    author: string;
    authorId: string;
    mapName: string;
    thumbnail: string;
    description: string;
    download: string;
    createdAt: Date;
    updatedAt: Date;
};

const Home: React.FC<any> = ({ data }) => {
    const description =
        'bhopmaps.com is a platform for CSS & CSGO bunnyhop maps.';
    const maps = data;

    const cardBackground = useColorModeValue('gray.50', 'gray.800');
    const hoverBg = useColorModeValue('gray.200', 'gray.700');
    const { colorMode, toggleColorMode } = useColorMode();

    // Load More Button
    const [currentPostCount, setCurrentPostCount] = React.useState(3);
    const [showLoadMoreButton, setShowLoadMoreButton] = React.useState(true);
    const handlePostCount = (e: any) => {
        e.preventDefault();
        let newCount = currentPostCount + 2;
        // Increment by 2
        setCurrentPostCount(newCount);

        if (newCount >= maps.length) {
            setCurrentPostCount(maps.length);
            setShowLoadMoreButton(false);
        } else {
            setShowLoadMoreButton(true);
        }
    };

    const createDate = (date: Date) => {
        const dateObj = new Date(date).toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

        return dateObj;
    };

    // Filtering
    const [searchByTitle, setSearchByTitle] = React.useState('');
    const handleSearchByTitle = (e: any) => {
        e.preventDefault();
        setSearchByTitle(e.target.value);
    };

    const searchTextPlaceholder = 'Search Maps';
    return (
        <>
            <Head>
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1'
                />
                <meta charSet='utf-8' />
                <meta name='Description' content={description}></meta>
                <title>BhopMaps</title>
                <link
                    rel='apple-touch-icon'
                    sizes='180x180'
                    href='/apple-touch-icon.png'
                />
                <link
                    rel='icon'
                    type='image/png'
                    sizes='32x32'
                    href='/favicon-32x32.png'
                />
                <link
                    rel='icon'
                    type='image/png'
                    sizes='16x16'
                    href='/favicon-16x16.png'
                />
                <link rel='manifest' href='/site.webmanifest' />
            </Head>
            <HStack w='full'>
                <InputGroup size='md'>
                    <Input
                        placeholder={searchTextPlaceholder}
                        value={searchByTitle}
                        onChange={handleSearchByTitle}
                        rounded='md'
                        variant='filled'
                    />
                    <InputLeftElement>
                        <Icon
                            as={HiOutlineSearch}
                            w={6}
                            h={6}
                            color='gray.600'
                        />
                    </InputLeftElement>
                </InputGroup>
            </HStack>
            <List spacing={6}>
                {maps
                    .filter((maps: any) =>
                        maps.mapName
                            .toLowerCase()
                            .includes(searchByTitle.toLowerCase())
                    )
                    .sort((a: any, b: any) => {
                        const aDate = new Date(a.createdAt);
                        const bDate = new Date(b.createdAt);
                        return bDate.getTime() - aDate.getTime();
                    })
                    .slice(0, currentPostCount)
                    .map((map: Map) => (
                        <ListItem key={map.id}>
                            <NextLink href={`/map/${map.id}`}>
                                <VStack
                                    bg={cardBackground}
                                    w='full'
                                    p={{ base: 4, md: 6 }}
                                    rounded='md'
                                    alignItems='stretch'
                                    transitionProperty='all'
                                    transitionDuration='slow'
                                    transitionTimingFunction='ease-out'
                                    _hover={{
                                        bg: hoverBg,
                                        transform: 'scale(1.025, 1.025)',
                                    }}
                                    cursor='pointer'
                                >
                                    <Stack
                                        w='full'
                                        justifyContent='space-between'
                                        direction={{
                                            base: 'column',
                                            md: 'row',
                                        }}
                                    >
                                        <HStack
                                            justifyContent='space-between'
                                            width='stretch'
                                        >
                                            <VStack alignItems='flex-start'>
                                                <Heading
                                                    size='md'
                                                    color={
                                                        colorMode === 'light'
                                                            ? 'gray.700'
                                                            : 'white'
                                                    }
                                                >
                                                    {map.mapName}
                                                </Heading>
                                                <Text color='gray.500'>
                                                    by {map.author}
                                                </Text>
                                            </VStack>

                                            <VStack alignItems='flex-end'>
                                                <Image
                                                    src={map.thumbnail}
                                                    alt='Map thumbnail'
                                                    rounded='md'
                                                    width={20}
                                                />

                                                <Text color='gray.500'>
                                                    {createDate(map.createdAt)}
                                                </Text>
                                            </VStack>
                                        </HStack>
                                    </Stack>
                                </VStack>
                            </NextLink>
                        </ListItem>
                    ))}
            </List>
            {showLoadMoreButton && (
                <Button variant='ghost' onClick={handlePostCount}>
                    Load more
                </Button>
            )}
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    const result = await fetch(`${API_URL}/maps`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data: any = await result.json();

    return {
        props: {
            data,
        },
    };
};

export default Home;
