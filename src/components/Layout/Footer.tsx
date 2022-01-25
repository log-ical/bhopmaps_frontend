import { Button, HStack, Text, useColorMode } from '@chakra-ui/react';
import React from 'react';
import NextImage from 'next/image';
import LogoDark from '../../../public/logo_dark.svg';
import LogoLight from '../../../public/logo_light.svg';
import Router from 'next/router';

const Footer: React.FC<any> = ({ props: any }) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const handleRouteSearchUser = (e: any) => {
        e.preventDefault();
        Router.push('/users/find');
    };
    return (
        <>
            <HStack justifyContent='center' spacing={{ base: 0, sm: 2 }} py={2}>
                <NextImage
                    src={colorMode === 'light' ? LogoLight : LogoDark}
                    alt='Logo'
                    width={32}
                    height={32}
                />
                <Text fontWeight='bold'>© 2022 bhopmaps</Text>
                <Button size='sm' onClick={handleRouteSearchUser}>
                    Search users
                </Button>
            </HStack>
        </>
    );
};

export default Footer;
