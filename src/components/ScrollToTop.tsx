import React from 'react';
import { BiArrowToTop } from 'react-icons/bi';
import { IconButton, useColorMode } from '@chakra-ui/react';

export default function ScrollButton() {
    const [showScrollToTop, setScrollToTop] = React.useState(false);
    const { colorMode, toggleColorMode } = useColorMode();

    React.useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                setScrollToTop(true);
            } else {
                setScrollToTop(false);
            }
        });
    }, []);

    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <>
            {showScrollToTop && (
                <IconButton
                    position='fixed'
                    bottom={5}
                    right={5}
                    aria-label='back to the top'
                    variant='solid'
                    size='lg'
                    bg={colorMode === 'light' ? 'gray.200' : 'gray.800'}
                    onClick={scrollTop}
                    icon={<BiArrowToTop />}
                />
            )}
        </>
    );
}
