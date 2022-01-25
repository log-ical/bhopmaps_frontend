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
    ListItem,
    Button,
    Tag,
    TagLabel,
    TagRightIcon,
    Grid,
    GridItem,
    Divider,
} from '@chakra-ui/react';
import { HiDownload, HiOutlineSearch } from 'react-icons/hi';
import Head from 'next/head';
import * as React from 'react';
import NextLink from 'next/link';
import { formatNumber } from 'src/utils/numberFormatter';
import { BsFillGridFill, BsList } from 'react-icons/bs';
import { createDate } from 'src/utils/createDate';
import config from '../../config.json';
import { Map } from 'src/api/types';
import Router from 'next/router';

const ListGridView: React.FC<any> = ({ data }) => {
    const maps = data;
    const description = config.description;

    const cardBackground = useColorModeValue('gray.50', 'gray.800');
    const hoverBg = useColorModeValue('gray.200', 'gray.700');
    const { colorMode, toggleColorMode } = useColorMode();

    const [isListView, setView] = React.useState(true);
    const [gridButtonLabel, setGridButtonLabel] = React.useState('Grid View');
    const [gridButtonIcon, setGridButtonIcon] = React.useState(<BsList />);

    const handleGridView = () => {
        setGridButtonLabel(isListView ? 'List View' : 'Grid View');
        setView(!isListView);
        setGridButtonIcon(isListView ? <BsList /> : <BsFillGridFill />);
    };

    // Load More Button
    const [currentPostCount, setCurrentPostCount] = React.useState(8);
    const [showLoadMoreButton, setShowLoadMoreButton] = React.useState(true);
    const handlePostCount = (e: any) => {
        e.preventDefault();
        let newCount = currentPostCount + 2;
        // Increment by 2
        setCurrentPostCount(newCount);

        // If the new count is greater than the total count, hide the button
        if (newCount >= maps.length) {
            setCurrentPostCount(maps.length);
            setShowLoadMoreButton(false);
        } else {
            setShowLoadMoreButton(true);
        }
    };

    // Filtering
    const [searchByTitle, setSearchByTitle] = React.useState('');
    const handleSearchByTitle = (e: any) => {
        e.preventDefault();
        setSearchByTitle(e.target.value);
    };

    const searchTextPlaceholder = config.searchTextPlaceHolder;
    return (
        <>
            <Head>
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1'
                />
                <meta charSet='utf-8' />
                <meta name='Description' content={description}></meta>
                <title>Bhopmaps CSS & CSGO</title>
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
                <Button leftIcon={gridButtonIcon} onClick={handleGridView}>
                    {gridButtonLabel}
                </Button>
            </HStack>
            {isListView ? (
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
                                <NextLink href={`/maps/${map.id}`}>
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
                                                            colorMode ===
                                                            'light'
                                                                ? 'gray.700'
                                                                : 'white'
                                                        }
                                                    >
                                                        {map.mapName}
                                                    </Heading>
                                                    <HStack>
                                                        <Tag colorScheme='cyan'>
                                                            <TagLabel>
                                                                {formatNumber(
                                                                    map.downloads
                                                                )}
                                                            </TagLabel>
                                                            <TagRightIcon
                                                                boxSize='12px'
                                                                as={HiDownload}
                                                            />
                                                        </Tag>
                                                        {map.gameType ===
                                                        'CSS' ? (
                                                            <Tag colorScheme='green'>
                                                                {map.gameType}
                                                            </Tag>
                                                        ) : (
                                                            <Tag colorScheme='blue'>
                                                                {map.gameType}
                                                            </Tag>
                                                        )}
                                                    </HStack>
                                                    <Text color='gray.500'>
                                                        by {map.author}
                                                    </Text>
                                                </VStack>

                                                <VStack alignItems='flex-end'>
                                                    <Image
                                                        src={map.thumbnail}
                                                        alt='Map thumbnail'
                                                        rounded='md'
                                                        width='120px'
                                                    />

                                                    <Text color='gray.500'>
                                                        {createDate(
                                                            map.createdAt
                                                        )}
                                                    </Text>
                                                </VStack>
                                            </HStack>
                                        </Stack>
                                    </VStack>
                                </NextLink>
                            </ListItem>
                        ))}
                </List>
            ) : (
                <Grid
                    templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)' }}
                    gap={6}
                >
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
                            <GridItem key={map.id}>
                                <NextLink href={`/maps/${map.id}`}>
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
                                            <VStack alignItems='flex-start'>
                                                <Image
                                                    src={map.thumbnail}
                                                    alt='Map thumbnail'
                                                    rounded='md'
                                                    width='container.md'
                                                />
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
                                                <HStack>
                                                    <Tag colorScheme='cyan'>
                                                        <TagLabel>
                                                            {formatNumber(
                                                                map.downloads
                                                            )}
                                                        </TagLabel>
                                                        <TagRightIcon
                                                            boxSize='12px'
                                                            as={HiDownload}
                                                        />
                                                    </Tag>
                                                    {map.gameType === 'CSS' ? (
                                                        <Tag colorScheme='green'>
                                                            {map.gameType}
                                                        </Tag>
                                                    ) : (
                                                        <Tag colorScheme='blue'>
                                                            {map.gameType}
                                                        </Tag>
                                                    )}
                                                </HStack>
                                                <Text color='gray.500'>
                                                    by {map.author}
                                                </Text>
                                                <Text color='gray.500'>
                                                    {createDate(map.createdAt)}
                                                </Text>
                                            </VStack>
                                        </Stack>
                                    </VStack>
                                </NextLink>
                            </GridItem>
                        ))}
                </Grid>
            )}
            {showLoadMoreButton && (
                <>
                    <Button variant='ghost' onClick={handlePostCount}>
                        Load more
                    </Button>
                    <Divider />
                </>
            )}
        </>
    );
};

export default ListGridView;
