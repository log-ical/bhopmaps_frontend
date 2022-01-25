import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
} from '@chakra-ui/react';
import React from 'react';

const DynamicAlert: React.FC<any> = ({ status, message, showAlert }) => {
    return (
        <>
            {showAlert ? (
                <Alert status={status} rounded='md'>
                    <AlertIcon />
                    <AlertDescription>{message}</AlertDescription>
                </Alert>
            ) : (
                <></>
            )}
        </>
    );
};

export default DynamicAlert;
