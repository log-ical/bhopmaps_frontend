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
    Avatar,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    ModalFooter,
    ModalContent,
    FormControl,
    VStack,
    FormLabel,
    Input,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    Divider,
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

    const usernameFetched = user?.username;
    const avatarFetched = user?.avatar;

    const [username, setUsername] = React.useState(
        usernameFetched ? usernameFetched : ''
    );
    const [avatar, setAvatar] = React.useState(
        avatarFetched ? avatarFetched : ''
    );

    const [errorModal, setErrorModal] = React.useState('');

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [isOpenDelete, setIsOpenDelete] = React.useState(false);
    const onCloseDelete = () => setIsOpenDelete(false);
    const cancelRef: React.RefObject<any> | undefined = React.useRef();

    const handleDeleteUser = async () => {
        const response = await fetch(`${API_URL}/user/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
    };

    function handleLogout() {
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
    }

    const handleHome = () => {
        Router.push('/');
    };
    const handleProfile = () => {
        Router.push(`/user/${user?.username}`);
    };

    const handleNewMap = () => {
        Router.push('/maps/upload');
    };

    const handleEditUser = () => {
        const authUrl = `${API_URL}/user/edit`;

        let bodyUsername, bodyAvatar;

        if (username === '') {
            bodyUsername = user?.username;
        }

        if (
            avatar.toLowerCase().endsWith('.jpg') ||
            avatar.toLowerCase().endsWith('.png')
        ) {
            bodyAvatar = avatar;
        } else if (avatar === '') {
            bodyAvatar = user?.avatar;
        } else {
            bodyAvatar = user?.avatar;
            setErrorModal('Avatar must be a .jpg or .png url');
            setTimeout(() => {
                setErrorModal('');
            }, 2000);

            return;
        }

        fetch(authUrl, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: bodyUsername ? bodyUsername : username,
                avatar: bodyAvatar ? bodyAvatar : avatar,
            }),
        });
    };

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

            <HStack alignItems='center' spacing={{ base: 0, md: 4 }}>
                {user ? (
                    <>
                        <Menu closeOnSelect>
                            <HStack spacing={2}>
                                <Avatar
                                    src={user?.avatar}
                                    name={user?.username}
                                    size='sm'
                                    loading='lazy'
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
                                bg={
                                    colorMode === 'light' ? 'white' : 'gray.800'
                                }
                            >
                                <MenuItem
                                    icon={<AiFillHome />}
                                    onClick={handleHome}
                                >
                                    Home
                                </MenuItem>
                                <MenuItem
                                    icon={<AiFillPlusCircle />}
                                    onClick={handleNewMap}
                                >
                                    New Map
                                </MenuItem>
                                <MenuDivider />
                                <MenuGroup title='Account'>
                                    <MenuItem
                                        icon={<FaUserAlt />}
                                        onClick={handleProfile}
                                    >
                                        Profile
                                    </MenuItem>
                                    <MenuItem
                                        icon={<IoMdSettings />}
                                        onClick={onOpen}
                                    >
                                        Settings
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

                        <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Change your settings</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <FormControl isRequired>
                                        <VStack alignItems='flex-start'>
                                            <FormLabel htmlFor='username'>
                                                Username
                                            </FormLabel>
                                            <Input
                                                id='username'
                                                type='text'
                                                value={username}
                                                placeholder={user?.username}
                                                onChange={(e) =>
                                                    setUsername(e.target.value)
                                                }
                                            />

                                            <FormLabel htmlFor='avatar'>
                                                Avatar
                                            </FormLabel>
                                            <Avatar
                                                src={
                                                    avatar
                                                        ? avatar
                                                        : user?.avatar
                                                }
                                                boxSize={24}
                                                alt='Modal Avatar'
                                            />
                                            <Input
                                                id='avatar'
                                                type='text'
                                                value={avatar}
                                                placeholder='Enter a url'
                                                onChange={(e) =>
                                                    setAvatar(e.target.value)
                                                }
                                            />
                                        </VStack>
                                    </FormControl>
                                </ModalBody>

                                <ModalFooter>
                                    <HStack>
                                        {errorModal && (
                                            <Alert status='error' rounded='md'>
                                                <AlertIcon />
                                                <AlertDescription>
                                                    {errorModal}
                                                </AlertDescription>
                                            </Alert>
                                        )}
                                        <Button
                                            colorScheme='red'
                                            onClick={() =>
                                                setIsOpenDelete(true)
                                            }
                                        >
                                            Delete Account
                                        </Button>
                                        <Button
                                            variant='solid'
                                            colorScheme='blue'
                                            type='submit'
                                            onClick={() => {
                                                handleEditUser();
                                                setTimeout(() => {
                                                    Router.reload();
                                                    onClose();
                                                }, 2500);
                                            }}
                                        >
                                            Save
                                        </Button>

                                        <AlertDialog
                                            isOpen={isOpenDelete}
                                            leastDestructiveRef={cancelRef}
                                            onClose={onClose}
                                        >
                                            <AlertDialogOverlay>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader
                                                        fontSize='lg'
                                                        fontWeight='bold'
                                                    >
                                                        Delete Account
                                                    </AlertDialogHeader>

                                                    <AlertDialogBody>
                                                        Are you sure? You cant
                                                        undo this action
                                                        afterwards.
                                                    </AlertDialogBody>

                                                    <AlertDialogFooter>
                                                        <Button
                                                            ref={cancelRef}
                                                            onClick={
                                                                onCloseDelete
                                                            }
                                                        >
                                                            Cancel
                                                        </Button>
                                                        <Button
                                                            colorScheme='red'
                                                            onClick={() => {
                                                                onCloseDelete();
                                                                handleDeleteUser();
                                                                Router.reload();
                                                            }}
                                                            ml={3}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialogOverlay>
                                        </AlertDialog>
                                    </HStack>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </>
                ) : (
                    <HStack>
                        <NextLink href='/auth/login' passHref>
                            <Button size='sm' variant='ghost'>
                                Login
                            </Button>
                        </NextLink>
                        <NextLink href='/auth/register' passHref>
                            <Button size='sm' variant='solid'>
                                Register
                            </Button>
                        </NextLink>
                    </HStack>
                )}
                <IconButton
                    aria-label='toggle theme'
                    variant='ghost'
                    size='sm'
                    onClick={toggleColorMode}
                    icon={colorMode === 'light' ? <IoMoon /> : <IoSunny />}
                />
            </HStack>
        </HStack>
    );
};

export default Header;
