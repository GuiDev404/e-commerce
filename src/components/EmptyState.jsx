import { Box, Text } from '@chakra-ui/react'
import React from 'react'

const EmptyState = ({ children, message = '', flexPosition = 'center' } = {}) => {
  return (
    <Box width={{ base: '100%', sm: '90vw' }} height='300px' display='flex' justifyContent={flexPosition} alignItems={flexPosition} flexDirection='column' gap={8}  >
      {children}

      <Text color='gray.500' fontSize='lg' textAlign={{ base: 'center', sm: 'initial' }}> {message} </Text>
    </Box>
  )
}

export default EmptyState