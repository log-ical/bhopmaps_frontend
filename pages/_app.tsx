import type { AppProps } from 'next/app';
import { ChakraProvider, ScaleFade, Spinner } from '@chakra-ui/react';
import theme from '@/src/theme/theme';
import Layout from '@/src/components/Layout/Layout';
import React, { useMemo } from 'react';
import { API_URL, UserContext } from 'src/api/UserContext';

function MyApp({ Component, pageProps, router }: AppProps) {
    const [user, setUser] = React.useState(null);
    const [fetchError, setFetchError] = React.useState('');

    // Use useEffect to check if user is logged in
    React.useEffect(() => {
        const checkUser = async () => {
            try {
                const rawUser = await fetch(`${API_URL}/user`, {
                    credentials: 'include',
                });
                if (rawUser.status === 401) {
                    setUser(null);
                    throw new Error('Unauthorized');
                }

                if (rawUser.status === 200) {
                    const userData = await rawUser.json();
                    setUser(userData);
                } else {
                    setUser(null);
                }
            } catch (e) {
                setFetchError('Error fetching user');
            }
        };

        checkUser();
    }, []);

    const userContext = useMemo(() => {
        return {
            user,
            setUser,
        };
    }, [user, setUser]);

    return (
        <ChakraProvider theme={theme}>
            <UserContext.Provider value={userContext}>
                <ScaleFade key={router.route} initialScale={0.9} in={true}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </ScaleFade>
            </UserContext.Provider>
        </ChakraProvider>
    );
}

export default MyApp;
