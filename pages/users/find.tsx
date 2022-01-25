import UserSearch from '@/src/components/UserSearch';
import { GetServerSideProps } from 'next';
import React from 'react';
import { API_URL } from 'src/api/UserContext';
import fetch from 'node-fetch'

const Find: React.FC<any> = ({ users }) => {
    return (
        <>
            <UserSearch data={users} />
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    const userResult = await fetch(`${API_URL}/users`);
    const users: any = await userResult.json();

    return {
        props: {
            users,
        },
    };
};

export default Find;
