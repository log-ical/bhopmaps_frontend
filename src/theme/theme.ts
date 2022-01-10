import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const colorModeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
};

const styles = {
    global: (props: any) => ({
        body: {
            color: mode('gray.800', 'whiteAlpha.900')(props),
            bg: mode('gray.50', 'gray.900')(props),
        },
    }),
};

const theme = extendTheme({
    colorModeConfig,
    styles,
});

export default theme;
