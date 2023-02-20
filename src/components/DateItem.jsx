import React from 'react';
import { Text } from '@chakra-ui/react';

const DataItem = ({ title, desc }) => {
  return (
    <React.Fragment>
      <dt> {title} </dt>

      <Text fontSize='sm' color='gray.600' mb={2} ms={4} as='dd'>
        {desc}
      </Text>
    </React.Fragment>
  );
};

export default React.memo(DataItem);
