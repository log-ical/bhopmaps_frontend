import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '@/src/theme/theme';
import Layout from '@/src/components/Layout/Layout';
import React, { useMemo } from 'react';
import { UserContext } from 'src/api/UserContext';

function MyApp({ Component, pageProps }: AppProps) {
    const [user, setUser] = React.useState(null);

    const userContext = useMemo(() => {
        return {
            user,
            setUser,
        };
    }, [user, setUser]);

    return (
        <ChakraProvider theme={theme}>
            <UserContext.Provider value={userContext}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </UserContext.Provider>
        </ChakraProvider>
    );
}

export default MyApp;
