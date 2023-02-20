import { Box, Divider, Heading, VStack } from '@chakra-ui/react';
import React from 'react';

const Header = ({ title, children, withDivider = false, size = '2xl', space = 8 }) => {
  return (
    <>
      <Box
        as='header'
        mt={space}
        mb={!withDivider ? space : 0}
        display='flex'
        flexDirection={{ base: 'column', sm: 'row' }}
        justifyContent='space-between'
        alignItems={{ base: 'self-start', sm: 'center' }}
      >
        <Heading fontSize={size}>{title}</Heading>
        {children}
      </Box>
      {withDivider && <Divider orientation='horizontal' width='100%' mb={space} />}
    </>
  );
};

export default React.memo(Header);
