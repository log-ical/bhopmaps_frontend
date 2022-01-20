import React, { useContext } from 'react';
import {
    Container,
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
} from '@chakra-ui/react';
import Router from 'next/router';
import { AUTH_URL, UserContext } from 'src/api/UserContext';

const Login = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [loading, setLoading] = React.useState(false);

    const [error, setError] = React.useState('');

    const { user, setUser } = useContext(UserContext);

    const handleLogin = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        if (username === '' || password === '') {
            setError('Username and password are required');
            setTimeout(() => {
                setError('');
                setLoading(false);
            }, 3000);
            return;
        }
        const authUrl = `${AUTH_URL}/login`;
        // fetch from server
        const getToken = fetch(authUrl, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });

        if ((await getToken).status === 201) {
            const rawUser = await fetch(`${AUTH_URL}/user`, {
                credentials: 'include',
            });

            const userData = await rawUser.json();

            if ((await userData).status === 401) {
                setError('Internal Server Error');
                setTimeout(() => {
                    setError('');
                    setLoading(false);
                }, 3000);
                return;
            } else {
                console.log('userData', userData);
                await setUser(userData);
                setLoading(false);
                Router.push('/');
            }
        } else {
            setError('Invalid username or password');
            setTimeout(() => {
                setError('');
                setLoading(false);
            }, 3000);
        }
    };
    return (
        <>
            <VStack spacing={4}>
                <VStack>
                    <Heading>Welcome Back</Heading>
                    <Text>Please enter your details</Text>
                </VStack>

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

                        {loading ? (
                            <Alert rounded='md' w='min-content'>
                                <AlertIcon />
                                <AlertTitle>Submitting...</AlertTitle>
                            </Alert>
                        ) : (
                            <Button type='submit' onClick={handleLogin}>
                                Submit
                            </Button>
                        )}
                    </VStack>
                </FormControl>
            </VStack>
        </>
    );
};

export default Login;
