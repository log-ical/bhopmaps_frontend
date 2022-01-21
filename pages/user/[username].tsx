import React from 'react';
import {
    Heading,
    Text,
    VStack,
    Image,
    HStack,
    InputGroup,
    Input,
    InputLeftElement,
    Icon,
    Divider,
} from '@chakra-ui/react';
import { API_URL, UserContext } from 'src/api/UserContext';
import { GetServerSideProps } from 'next';
import fetch from 'node-fetch';
import { HiOutlineSearch } from 'react-icons/hi';
import config from '../../config.json';

const Profile: React.FC<{ data: any }> = (props) => {
    const { data } = props;
    const joined = new Date(props.data.userData?.createdAt).toLocaleDateString(
        'en-US',
        {
            weekday: 'short',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }
    );
    // Filtering
    const [searchByTitle, setSearchByTitle] = React.useState('');
    const handleSearchByTitle = (e: any) => {
        e.preventDefault();
        setSearchByTitle(e.target.value);
    };
    return (
        <>
            {data.statusCode != 400 ? (
                <VStack spacing={8} alignItems='flex-start'>
                    <VStack alignItems='flex-start'>
                        <Image
                            borderRadius={12}
                            src={data.userData?.avatar ? data.userData?.avatar : config.defaultAvatar}
                            boxSize={48}
                            alt='Avatar'
                            loading='eager'
                        />
                        <Heading>{data.userData?.username}</Heading>
                        <HStack>
                            <Text color='gray.500'>Registered since:</Text>
                            <Text fontWeight='bold' color='gray.500'>
                                {' '}
                                {joined}
                            </Text>
                        </HStack>
                    </VStack>
                    <Divider />
                    <HStack w='full'>
                        <InputGroup size='md'>
                            <Input
                                placeholder={config.searchTextPlaceHolder}
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
                </VStack>
            ) : (
                <Heading size='md'>{data.message}</Heading>
            )}
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({
    params,
    res,
}) => {
    const { username }: any = params;
    const result = await fetch(`${API_URL}/user/${username}`);
    const data: any = await result.json();

    return {
        props: {
            data,
        },
    };
};
export default Profile;
