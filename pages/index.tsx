import {
    HStack,
    Icon,
    InputGroup,
    Input,
    InputLeftElement,
} from '@chakra-ui/react';
import { HiOutlineSearch } from 'react-icons/hi';
import type { NextPage } from 'next';
import Head from 'next/head';
import * as React from 'react';

const Home: NextPage = () => {
    const description =
        'bhopmaps.com is a platform for CSS & CSGO bunnyhop maps.';

    // Multiple Filtering
    const [searchByTitle, setSearchByTitle] = React.useState('');
    const handleSearchByTitle = (e: any) => {
        e.preventDefault();
        setSearchByTitle(e.target.value);
    };

    const handleDeleteInput = (e: any) => {
        e.preventDefault();
        setSearchByTitle('');
    };

    const [searchTextPlaceholder, setSearchTextPlaceholder] =
        React.useState('Search Maps');
    return (
        <>
            <Head>
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1'
                />
                <meta charSet='utf-8' />
                <meta name='Description' content={description}></meta>
                <title>khenzy.dev</title>
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
        </>
    );
};

export default Home;
