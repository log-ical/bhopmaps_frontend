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
    RadioGroup,
    Stack,
    Radio,
} from '@chakra-ui/react';
import Router from 'next/router';
import React from 'react';
import { API_URL, UserContext } from 'src/api/UserContext';

const Upload = () => {
    const [mapName, setMapname] = React.useState('');
    const [thumbnail, setThumbnail] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [error, setError] = React.useState('');
    const [gameType, setGameType] = React.useState('CSS');
    const [success, setSuccess] = React.useState(false);
    const fileInput: any = React.useRef();
    const thumbnailInput: any = React.useRef();
    const [submitting, setSubmitting] = React.useState(false);
    const maxFileSize = 100000000;
    const maxThumbnailSize = 1000000;

    const fileTypes =
        'zip,application/octet-stream,application/zip,application/x-zip,application/x-zip-compressed';
    const fileTypesThumbnail = 'image/png,image/jpeg,image/jpg';

    const { user } = React.useContext(UserContext);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setSubmitting(true);

        // Handling fileInput
        if (fileInput.current.files[0].size > maxFileSize) {
            setError('File size is too big');
            setSubmitting(false);
            return;
        }

        if (
            fileInput.current.files[0].type !== 'application/x-zip-compressed'
        ) {
            setError('File type is not zip');
            setSubmitting(false);
            return;
        }

        // Handling ThumbnailInput

        if (thumbnailInput.current.files[0].size > maxThumbnailSize) {
            setError('File size is too big');
            setSubmitting(false);
            return;
        }

        if (
            thumbnailInput.current.files[0].type !== 'image/png' &&
            thumbnailInput.current.files[0].type !== 'image/jpeg' &&
            thumbnailInput.current.files[0].type !== 'image/jpg'
        ) {
            setError('File type is not an image');
            setSubmitting(false);
            return;
        }

        const formData = new FormData();
        formData.append('mapName', mapName);
        formData.append('thumbnail', thumbnail);
        formData.append('file', fileInput.current.files![0]);
        formData.append('thumbnail', thumbnailInput.current.files![0]);
        formData.append('description', description);
        formData.append('gameType', gameType);

        try {
            fetch(`${API_URL}/map/new`, {
                method: 'POST',
                body: formData,
                credentials: 'include',
            }).then((res) => {
                if (description.length > 500) {
                    setError('Description must be less than 500 characters');
                    setSubmitting(false);
                    setTimeout(() => {
                        setError('');
                    }, 2000);

                    return;
                }
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

                    setTimeout(() => {
                        setSubmitting(false);
                        Router.push('/');
                    }, 2000);
                }
            });
        } catch (e) {
            return;
        }
    };

    return (
        <>
            {user ? (
                <FormControl isRequired>
                    <VStack alignItems='flex-start' spacing={4}>
                        <FormLabel htmlFor='mapName'>Map name</FormLabel>
                        <Input
                            isDisabled={submitting}
                            id='username'
                            type='text'
                            value={mapName}
                            onChange={(e) => setMapname(e.target.value)}
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
                            isDisabled={submitting}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            size='sm'
                            resize='vertical'
                            height={300}
                            maxHeight={400}
                        />
                        <Text fontSize='sm' color='gray.500'>
                            {description.length} / 500{' '}
                        </Text>

                        <FormLabel htmlFor='thumbnail'>
                            Choose thumbnail
                        </FormLabel>
                        <Input
                            isDisabled={submitting}
                            className='thumbnail-input'
                            id='thumbnail'
                            type='file'
                            ref={thumbnailInput}
                            variant='unstyled'
                            accept={fileTypesThumbnail}
                        />
                        <Text fontSize='x-small' color='gray.400'>
                            {'\u2022'} Maxiumum file size:{' '}
                            {maxFileSize * 10 ** -5}MB <br />
                            {'\u2022'} Allowed file formats: jpeg, jpg, png
                        </Text>

                        <FormLabel htmlFor='file'>
                            Choose file
                            <Text fontSize='x-small' color='gray.400'>
                                {'\u2022'} Maxiumum file size:{' '}
                                {maxFileSize * 10 ** -6}MB <br />
                                {'\u2022'} Allowed file formats: zip
                            </Text>
                        </FormLabel>

                        <Input
                            isDisabled={submitting}
                            className='file-input'
                            id='file'
                            type='file'
                            ref={fileInput}
                            variant='unstyled'
                            accept={fileTypes}
                        />

                        <FormLabel htmlFor='gameType'>Choose game</FormLabel>
                        <RadioGroup
                            isDisabled={submitting}
                            onChange={setGameType}
                            value={gameType}
                        >
                            <Stack direction='row'>
                                <Radio value='CSS'>CSS</Radio>
                                <Radio value='CSGO'>CSGO</Radio>
                            </Stack>
                        </RadioGroup>
                        <Button
                            isLoading={submitting}
                            type='submit'
                            colorScheme='blue'
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                        {error && (
                            <Alert variant='subtle' status='error' rounded='md'>
                                <AlertIcon />
                                <AlertTitle>Error</AlertTitle>
                                {error}
                            </Alert>
                        )}

                        {success && (
                            <Alert
                                variant='subtle'
                                status='success'
                                rounded='md'
                            >
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
