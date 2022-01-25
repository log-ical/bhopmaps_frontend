import {
    Avatar,
    Grid,
    GridItem,
    HStack,
    Icon,
    Input,
    InputGroup,
    InputLeftElement,
    VStack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import { User } from 'src/api/types';
import NextLink from 'next/link';

const UserSearch: React.FC<any> = ({ data }) => {
    const users = data;

    const hoverBg = useColorModeValue('gray.200', 'gray.700');
    // Filtering
    const [searchByUsername, setSearchByUsername] = React.useState('');
    const handleSearchByUsername = (e: any) => {
        e.preventDefault();
        setSearchByUsername(e.target.value);
    };
    return (
        <>
            <HStack w='full'>
                <InputGroup size='md'>
                    <Input
                        placeholder='Search users'
                        value={searchByUsername}
                        onChange={handleSearchByUsername}
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
            <Grid templateColumns={{ base: 'repeat(2, 1fr)', sm: 'repeat(5, 1fr)' }}
                    gap={6}>
                {users
                    .filter((users: any) =>
                        users.username
                            .toLowerCase()
                            .includes(searchByUsername.toLowerCase())
                    )
                    .map((user: User) => (
                        <GridItem key={user.username}>
                            <NextLink href={`/user/${user.username}`}>
                            <VStack
                            w='full'
                            p={4}
                            rounded='md'
                            transitionProperty='all'
                            transitionDuration='slow'
                            transitionTimingFunction='ease-out'
                            _hover={{
                                bg: hoverBg,
                                transform: 'scale(1.1, 1.025)',
                            }}
                            cursor='pointer'>
                                <Avatar src={user.avatar} />
                                <Text>{user.username}</Text>
                            </VStack>
                            </NextLink>
                        </GridItem>
                    ))}
            </Grid>
        </>
    );
};

export default UserSearch;
