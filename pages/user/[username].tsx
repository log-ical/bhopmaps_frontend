import React from 'react';
import {
    Heading,
    Text,
    VStack,
    Image,
    HStack,
    Divider,
    Button,
} from '@chakra-ui/react';
import { API_URL } from 'src/api/UserContext';
import { GetServerSideProps } from 'next';
import fetch from 'node-fetch';
import config from '../../config.json';
import NextLink from 'next/link';
import { createDate } from 'src/utils/createDate';
import ListGridView from '@/src/components/ListGridView';

const Profile: React.FC<{ data: any; maps: any }> = ({ data, maps }) => {
    return (
        <>
            {data.statusCode != 400 ? (
                <>
                    <VStack spacing={8} alignItems='flex-start'>
                        <VStack alignItems='flex-start'>
                            <Image
                                borderRadius={12}
                                src={
                                    data.userData?.avatar
                                        ? data.userData?.avatar
                                        : config.defaultAvatar
                                }
                                boxSize={48}
                                alt='Avatar'
                                loading='eager'
                            />
                            <Heading>{data.userData?.username}</Heading>
                            <HStack>
                                <Text color='gray.500'>Registered since:</Text>
                                <Text fontWeight='bold' color='gray.500'>
                                    {' '}
                                    {createDate(data.userData?.createdAt)}
                                </Text>
                            </HStack>
                            <HStack>
                                <NextLink href='/' passHref>
                                    <Button size='md' variant='solid'>
                                        Back
                                    </Button>
                                </NextLink>
                            </HStack>
                        </VStack>
                        <Divider />
                    </VStack>
                    {maps.length > 0 ? (
                        <ListGridView data={maps} />
                    ) : (
                        <Text
                            color='gray.500'
                            justifyContent='center'
                            width='stretch'
                        >
                            This user has no maps uploaded
                        </Text>
                    )}
                </>
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

    const mapsResult = await fetch(
        `${API_URL}/map/author/${data.userData?.id}`
    );

    const maps: any = await mapsResult.json();

    return {
        props: {
            data,
            maps,
        },
    };
};
export default Profile;
