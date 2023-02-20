import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

const UserCard = ({ size = 'md', image, firstName, lastName, username }) => {
  return (
    <Flex justifyContent='start'>
      <Avatar size={size} src={image} />
      <Box ml='3' fontSize={size} textAlign='left'>
        <Text fontWeight='bold'>
          {firstName} {lastName}
        </Text>
        <Text fontSize='sm' color='gray.600' fontWeight='normal'>
          {username}
        </Text>
      </Box>
    </Flex>
  );
};

export default UserCard;
