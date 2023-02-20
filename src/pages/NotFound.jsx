import { Box, Link as LinkUI } from '@chakra-ui/react';
import { Browser } from 'react-kawaii';
import { Link } from 'react-router-dom';
import EmptyState from '../components/EmptyState';

const NotFound = () => {
  return (
    <Box width='full' height='100vh' display='grid' placeItems='center' >
      <EmptyState message='Pagina no encontrada'>
        <Browser size={150} mood='shocked'  color='#4784ff' />
      </EmptyState>

      <LinkUI as={Link} color='gray.700' mr='.8rem' to='/' textTransform='uppercase'>
        Volver al inicio
      </LinkUI>
    </Box>
  );
};

export default NotFound;
