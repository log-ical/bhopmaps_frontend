import React from 'react';
import {
    Container,
    useColorModeValue,
    VStack,
} from '@chakra-ui/react';
import Header from './Header';
import Footer from './Footer';

const Layout: React.FC<any> = ({ children }) => {
    const backgroundColor = useColorModeValue('white', '');
    return (
        <Container
            display='flex'
            maxW='container.sm'
            bg={backgroundColor}
            minH='100vh'
            px={{ base: 4, lg: 6 }}
            centerContent
        >
            <VStack flex={1} spacing={16} alignItems='stretch' w='full'>
                <Header/>
                {children}
                <Footer/>
            </VStack>
        </Container>
    );
};

export default Layout;
