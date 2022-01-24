import {
    FormControl,
    FormLabel,
    Heading,
    Input,
    Button,
    VStack,
    Text,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    HStack,
    Link,
} from '@chakra-ui/react';
import Router, { useRouter } from 'next/router';
import React from 'react';
import { API_URL } from 'src/api/UserContext';

const Register: React.FC<any> = ({ props: any }) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [error, setError] = React.useState('');
    const [success, setSuccess] = React.useState(false);
    const router = useRouter();

    const handleRegister = async (e: any) => {
        e.preventDefault();

        if (username === '' || password === '') {
            setError('Username and password are required');
            setTimeout(() => {
                setError('');
            }, 3000);
            return;
        }

        if (username.length < 3) {
            setError('Username must be at least 3 characters');
            setTimeout(() => {
                setError('');
            }, 3000);
            return;
        }

        const existingUser = await fetch(`${API_URL}/user/${username}`)
        const existingUserData = await existingUser.json();

        if (existingUserData.username === username) {
            setError('Username already exists');
            setTimeout(() => {
                setError('');
            }, 2000);
            return;
        }

        // get url params
        const { query } = router;
        const { key } = query;

        // Handle registering
        const authUrl = `${API_URL}/register`;
        console.log('Sending request to:', authUrl);
        // send to server
        const request = fetch(authUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': `${key}`,
            },
            body: JSON.stringify({
                username,
                password,
            }),
        }).then((response) => {
            if (response.status === 401) {
                setError('You have to provide an API-KEY');
                setTimeout(() => {
                    setError('');
                }, 3000);
                return;
            } else {
                setSuccess(true);
                setTimeout(() => {
                    setSuccess(false);
                    setError('');
                    Router.push('/auth/login');
                }, 2000);
            }
            return response.json();
        });
    };
    return (
        <>
            <VStack spacing={4}>
                <Heading>REGISTER AN ACCOUNT</Heading>
                {error && (
                    <Alert status='error' rounded='md'>
                        <AlertIcon />
                        <AlertTitle mr={2}>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <FormControl isRequired>
                    <VStack spacing={4} alignItems='flex-start'>
                        <FormLabel htmlFor='username'>Username</FormLabel>
                        <Input
                            id='username'
                            type='text'
                            value={username}
                            onChange={(e) => {
                                e.preventDefault();
                                setUsername(e.target.value);
                            }}
                        />
                        <FormLabel htmlFor='password'>Password</FormLabel>
                        <Input
                            id='password'
                            type='password'
                            value={password}
                            onChange={(e) => {
                                e.preventDefault();
                                setPassword(e.target.value);
                            }}
                        />
                        <HStack
                            display='flex'
                            justifyContent='space-between'
                            width='stretch'
                        >
                            <Button
                                isLoading={success}
                                colorScheme='blue'
                                type='submit'
                                onClick={handleRegister}
                            >
                                Submit
                            </Button>
                            <HStack>
                                <Text color='gray.500' fontWeight='bold'>
                                    Already have an account?
                                </Text>
                                <Link
                                    color='blue.600'
                                    to='/auth/login'
                                    href='/auth/login'
                                >
                                    Click here
                                </Link>
                            </HStack>
                        </HStack>

                        {success && (
                            <Alert
                                status='success'
                                rounded='md'
                                variant='subtle'
                            >
                                <AlertIcon />
                                <AlertTitle mr={2} fontSize='lg'>
                                    Success
                                </AlertTitle>
                                <AlertDescription>
                                    You have successfully registered an account.
                                </AlertDescription>
                            </Alert>
                        )}
                    </VStack>
                </FormControl>
            </VStack>
        </>
    );
};

export default Register;
