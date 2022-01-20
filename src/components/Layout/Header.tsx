import React, { useContext } from 'react';
import {
    HStack,
    useColorMode,
    Link,
    Heading,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuGroup,
    MenuItem,
    MenuDivider,
    Text,
    Image,
    Avatar,
} from '@chakra-ui/react';
import LogoDark from '../../../public/logo_dark.svg';
import LogoLight from '../../../public/logo_light.svg';

import NextLink from 'next/link';
import NextImage from 'next/image';

import { IoChevronDown, IoMoon, IoSunny } from 'react-icons/io5';
import { AiFillPlusCircle, AiFillHome, AiOutlineLogout } from 'react-icons/ai';
import { FaUserAlt } from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';
import { UserContext, API_URL } from 'src/api/UserContext';
import Router from 'next/router';

const Header: React.FC<any> = ({ props: any }) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const { user, setUser } = useContext(UserContext);

    const handleLogout = () => {
        const authUrl = `${API_URL}/logout`;
        // send to server
        fetch(authUrl, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        setUser(null);
    };

    const handleProfile = () => {
        Router.push(`/user/${user?.username}`);
    }
    return (
        <HStack
            as='nav'
            justifyContent='space-between'
            alignItems='center'
            py={4}
        >
            <NextLink href='/' passHref>
                <Link>
                    <HStack>
                        <NextImage
                            src={colorMode === 'light' ? LogoLight : LogoDark}
                            alt='Logo'
                            width={32}
                            height={32}
                        />
                        <Heading size='md'>MAPS</Heading>
                    </HStack>
                </Link>
            </NextLink>

            <HStack alignItems='center' spacing={{ base: 2, md: 4 }}>
                {user ? (
                    <Menu closeOnSelect>
                        <HStack>
                            <Avatar
                                src={user?.avatar}
                                name={user?.username}
                                size='sm'
                            />
                            <MenuButton
                                size='sm'
                                variant='ghost'
                                as={Button}
                                rightIcon={<IoChevronDown />}
                            >
                                <Text>{user?.username}</Text>
                            </MenuButton>
                        </HStack>

                        <MenuList
                            bg={colorMode === 'light' ? 'white' : 'gray.800'}
                        >
                            <MenuItem icon={<AiFillHome />}>
                                <NextLink href='/' passHref>
                                    Home
                                </NextLink>
                            </MenuItem>
                            <MenuItem icon={<AiFillPlusCircle />}>
                                <NextLink href='/' passHref>
                                    New Map
                                </NextLink>
                            </MenuItem>
                            <MenuDivider />
                            <MenuGroup title='Account'>
                                <MenuItem icon={<FaUserAlt />} onClick={handleProfile}>
                                        Profile
                                </MenuItem>
                                <MenuItem icon={<IoMdSettings />}>
                                    <NextLink href='/' passHref>
                                        Settings
                                    </NextLink>
                                </MenuItem>
                                <MenuItem
                                    icon={<AiOutlineLogout />}
                                    color='red.400'
                                    onClick={handleLogout}
                                >
                                    Logout
                                </MenuItem>
                            </MenuGroup>
                        </MenuList>
                    </Menu>
                ) : (
                    <>
                        <NextLink href='/auth/login' passHref>
                            <Button size='sm' variant='solid'>
                                Login
                            </Button>
                        </NextLink>
                        <NextLink href='/auth/register' passHref>
                            <Button size='sm' variant='solid'>
                                Register
                            </Button>
                        </NextLink>
                    </>
                )}

                <IconButton
                    aria-label='toggle theme'
                    variant='ghost'
                    size='sm'
                    onClick={toggleColorMode}
                    icon={colorMode === 'light' ? <IoMoon /> : <IoSunny />}
                >
                    Change Theme
                </IconButton>
            </HStack>
        </HStack>
    );
};

export default Header;
