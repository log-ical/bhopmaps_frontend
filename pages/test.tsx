import React, { useContext } from 'react';
import { UserContext } from 'src/api/UserContext';
import { Text } from '@chakra-ui/react';

const Test = () => {
    const { user } = useContext(UserContext);
  return (
    <Text>{user?.username}</Text>
    )
};

export default Test;
