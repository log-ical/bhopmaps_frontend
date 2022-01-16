import React from 'react';
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
} from '@chakra-ui/react';
import LogoDark from '../../../public/logo_dark.svg';
import LogoLight from '../../../public/logo_light.svg';

import NextLink from 'next/link';
import NextImage from 'next/image';

import { IoChevronDown, IoMoon, IoSunny } from 'react-icons/io5';
import { AiFillPlusCircle, AiFillHome, AiOutlineLogout } from 'react-icons/ai';
import { FaUserAlt } from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';

const Header: React.FC<any> = ({ props: any }) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const session = true;

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
                            width={48}
                            height={48}
                        />
                        <Heading size='md'>MAPS</Heading>
                    </HStack>
                </Link>
            </NextLink>

            <HStack alignItems='center' spacing={{ base: 0, md: 4 }}>
                {session ? (
                    <Menu closeOnSelect>
                        <HStack>
                            <MenuButton
                                size='sm'
                                variant='ghost'
                                as={Button}
                                rightIcon={<IoChevronDown />}
                            >
                                <Text>TestUser</Text>
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
                                <MenuItem icon={<FaUserAlt />}>
                                    <NextLink href='/' passHref>
                                        Profile
                                    </NextLink>
                                </MenuItem>
                                <MenuItem icon={<IoMdSettings />}>
                                    <NextLink href='/' passHref>
                                        Settings
                                    </NextLink>
                                </MenuItem>
                                <MenuItem
                                    icon={<AiOutlineLogout />}
                                    color='red.400'
                                    onClick={() =>
                                        console.log('Logout Btn clicked')
                                    }
                                >
                                    Logout
                                </MenuItem>
                            </MenuGroup>
                        </MenuList>
                    </Menu>
                ) : (
                    <>Login Placeholder</>
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
