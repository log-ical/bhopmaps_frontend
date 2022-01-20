import React, { useContext } from 'react';
import { Heading, Text, VStack, Image } from '@chakra-ui/react';
import { API_URL, UserContext } from 'src/api/UserContext';
import { GetServerSideProps } from 'next';
import fetch from 'node-fetch';

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

    console.log(props);
    return (
        <>
            {data.statusCode != 400 ? (
                <VStack spacing={2} alignItems='flex-start'>
                    <Image
                        src={data.userData?.avatar}
                        boxSize={48}
                        alt='Avatar'
                    />
                    <Heading>{data.userData?.username}</Heading>
                    <Text>{joined}</Text>
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
    const { username } = params;
    const result = await fetch(`${API_URL}/user/${username}`);
    const data: any = await result.json();

    return {
        props: {
            data,
        },
    };
};
export default Profile;
