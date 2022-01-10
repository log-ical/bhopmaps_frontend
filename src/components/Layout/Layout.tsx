import React from 'react';
import {
    Container,
    useColorMode,
    useColorModeValue,
    VStack,
} from '@chakra-ui/react';

const Layout: React.FC<any> = ({ children }) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const backgroundColor = useColorModeValue('white', '');
    return (
        <Container
            display='flex'
            maxW='container.sm'
            bg={backgroundColor}
            minH={{ base: 'auto', md: '100vh' }}
            px={{ base: 4, lg: 6 }}
            centerContent
        >
            <VStack flex={1} spacing={16} alignItems='stretch' w='full'>
                {/* {header palceholder} */}
                {children}
                {/* {footer palceholder} */}
            </VStack>
        </Container>
    );
};

export default Layout;
