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
} from '@chakra-ui/react';
import Router from 'next/router';
import React from 'react';
import { API_URL } from 'src/api/UserContext';

const Register: React.FC<any> = ({ props: any }) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [error, setError] = React.useState('');
    const [success, setSuccess] = React.useState(false);

    const handleRegister = (e: any) => {
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

        // Handle registering
        const authUrl = `${API_URL}/register`;
        console.log('Sending request to:', authUrl);
        // send to server
        fetch(authUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });

        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
            setError('');
            Router.push('/auth/login');
        }, 2000);
    };
    return (
        <>
            <VStack spacing={4}>
                <Heading>Register an account</Heading>
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
                        <Button type='submit' onClick={handleRegister}>
                            Submit
                        </Button>
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
