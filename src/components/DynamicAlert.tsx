import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
} from '@chakra-ui/react';
import React from 'react';

const DynamicAlert: React.FC<any> = ({status, message, showAlert}) => {

    return (
        <>
            {showAlert ? (
                <Alert status={status} rounded='md'>
                    <AlertIcon />
                    <AlertTitle mr={2}>
                        Error
                    </AlertTitle>
                    <AlertDescription>{message}</AlertDescription>
                </Alert>
            ) : (
                <></>
            )}
        </>
    );
};

export default DynamicAlert;
