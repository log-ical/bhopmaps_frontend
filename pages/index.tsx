import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import * as React from 'react';
import fetch from 'node-fetch';
import { API_URL } from 'src/api/UserContext';
import ListGridView from '@/src/components/ListGridView';
import { Heading } from '@chakra-ui/react';
import UserSearch from '@/src/components/UserSearch';
import { NextSeo } from 'next-seo';

type Map = {
    id: string;
    author: string;
    authorId: string;
    mapName: string;
    thumbnail: string;
    description: string;
    downloads: number;
    gameType: string;
    createdAt: Date;
    updatedAt: Date;
};

const Home: React.FC<any> = ({ data, users }) => {
    const description =
        'Bhopmaps is a site where you can find, share and download maps for the game CSS & CSGO.';
    const maps = data;

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
            <NextSeo
                title={`Bhopmaps CSS & CSGO`}
                description={description}
                openGraph={{
                    title: `Bhopmaps CSS & CSGO`,
                    images: [
                        {
                            url: `https://bhopmaps.s3.eu-central-1.amazonaws.com/bhopmaps_dark.png`,
                        },
                    ],
                    site_name: 'www.bhopmaps.app',
                }}
            />

            <Heading>Maps</Heading>
            <ListGridView data={maps} />
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
