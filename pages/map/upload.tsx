import {
    FormControl,
    FormLabel,
    Input,
    Textarea,
    VStack,
    Text,
    HStack,
    Button,
    Alert,
    AlertTitle,
    AlertIcon,
    Link,
    Spinner,
} from '@chakra-ui/react';
import Router from 'next/router';
import React from 'react';
import { API_URL, UserContext } from 'src/api/UserContext';

const Upload = () => {
    const [mapName, setMapname] = React.useState('');
    const [thumbnail, setThumbnail] = React.useState('');
    const fileInput = React.useRef();
    const [description, setDescription] = React.useState('');
    const [error, setError] = React.useState('');
    const [success, setSuccess] = React.useState(false);
    const [submitting, setSubmitting] = React.useState(false);

    const { user } = React.useContext(UserContext);

    function handleSubmit(e: any) {
        e.preventDefault();
        setSubmitting(true);

        const formData = new FormData();
        formData.append('mapName', mapName);
        formData.append('thumbnail', thumbnail);
        formData.append('file', fileInput.current.files![0]);
        formData.append('description', description);
        try {
            fetch(`${API_URL}/map/new`, {
                method: 'POST',
                body: formData,
                credentials: 'include',
            }).then((res) => {
                if (res.status === 400) {
                    setError(res.statusText);
                    setSubmitting(false);
                    setTimeout(() => {
                        setError('');
                    }, 2000);
                } else if (res.status === 401) {
                    setError(res.statusText);
                    setSubmitting(false);
                    setTimeout(() => {
                        setError('');
                    }, 2000);
                } else {
                    setSuccess(true);
                    setSubmitting(false);
                    setTimeout(() => {
                        Router.push('/');
                    }, 2000);
                }
            });
        } catch (e) {
            return;
        }
    }

    return (
        <>
            {user ? (
                <FormControl isRequired>
                    <VStack alignItems='flex-start' spacing={4}>
                        <FormLabel htmlFor='mapName'>Map name</FormLabel>
                        <Input
                            id='username'
                            type='text'
                            value={mapName}
                            onChange={(e) => setMapname(e.target.value)}
                        />

                        <FormLabel htmlFor='thumbnail'>
                            Choose thumbnail
                        </FormLabel>
                        <Input
                            id='thumbnail'
                            type='text'
                            value={thumbnail}
                            accept='.zip'
                            onChange={(e) => setThumbnail(e.target.value)}
                        />

                        <HStack justifyContent='space-between' w='full'>
                            <FormLabel htmlFor='description'>
                                Description
                            </FormLabel>
                            <Text fontSize={11} color='gray.500'>
                                MARKDOWN SUPPORTED
                            </Text>
                        </HStack>
                        <Textarea
                            id='description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            size='sm'
                            resize='vertical'
                        />

                        <FormLabel htmlFor='file'>Choose file</FormLabel>
                        <Input
                            id='file'
                            type='file'
                            ref={fileInput}
                            variant='unstyled'
                        />
                        {submitting ? (
                            <Spinner />
                        ) : (
                            <Button
                                type='submit'
                                colorScheme='blue'
                                onClick={handleSubmit}
                            >
                                Submit
                            </Button>
                        )}

                        {error && (
                            <Alert variant='subtle' status='error'>
                                <AlertIcon />
                                <AlertTitle>Error</AlertTitle>
                                {error}
                            </Alert>
                        )}

                        {success && (
                            <Alert variant='subtle' status='success'>
                                <AlertIcon />
                                <AlertTitle>Success</AlertTitle>
                                Succesfully uploaded map!
                            </Alert>
                        )}
                    </VStack>
                </FormControl>
            ) : (
                <VStack>
                    <Text>You need to be logged in to upload maps</Text>
                    <Link color='blue.600' href='/auth/login'>
                        Login now to upload maps!
                    </Link>
                </VStack>
            )}
        </>
    );
};

export default Upload;
