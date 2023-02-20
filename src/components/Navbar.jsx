import {
  Badge,
  HStack,
  Link as LinkUI,
  Icon,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
  MenuDivider,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  useDisclosure,
  IconButton,
  DrawerCloseButton,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { HamburgerIcon } from '@chakra-ui/icons';

import { ShopIcon } from './Icons';
import UserCard from './UserCard';

import useAuth from '../hooks/useAuth';
import useCarrito from '../hooks/useCarrito';

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { calcResume } = useCarrito();
  const logout = useAuth((state) => state.logout);
  const user = useAuth((state) => state.user);
  
  const { cantidadProductos } = calcResume()

  const handleLogout = () => {
    logout();
    onClose()
  };

  const navbarContent = (
    <>
      <HStack 
        mt={{ base: '4', sm: 0 }}
        spacing={5}
        flexBasis={{ base: '100%', sm: 'fit-content' }} 
        order={{ base: 1, sm: 0 }}
      >
        <LinkUI as={Link} to='/' color='green.500'>
          Inicio
        </LinkUI>
      </HStack>

      <HStack spacing={{ base: 2, sm: 8 }}>
        <Link to='/carrito'>
          <Icon fontSize='3xl'>
            <ShopIcon />
          </Icon>

          <Badge
            ml='1'
            fontSize='.7rem'
            borderRadius={999}
            colorScheme='red'
            position='absolute'
            variant='solid'
            marginLeft={-1}
            top={0}
          >
            {cantidadProductos}
          </Badge>
        </Link>

        {user ? (
          <Menu>
            <MenuButton as={Button} bgColor='transparent'>
              <UserCard
                size='sm'
                image={user.image}
                firstName={user.firstName}
                lastName={user.lastName}
                username={user.email}
              />
            </MenuButton>
            <MenuList alignSelf='end'>
              <MenuGroup title='Cuenta'>
                <MenuItem as={Link} to='/account'> Mi cuenta </MenuItem>
                <MenuItem onClick={handleLogout}> Cerrar sesión </MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuGroup title='Ayuda'>
                <MenuItem as={Link} to='/help/docs' >Docs</MenuItem>
                <MenuItem as={Link} to='/help/faq'>FAQ</MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        ) : (
          <Button colorScheme='blue' as={Link} to='/auth/login'>
            Iniciar sesión
          </Button>
        )}
      </HStack>
    </>
  );

  return (
    <>
      <Box
        display={{ base: 'inherit', sm: 'none' }}
        justifyContent='flex-end'
        w='100%'
      >

        <IconButton
          colorScheme='green'
          aria-label='Toggle menu'
          icon={<HamburgerIcon />}
          onClick={onOpen}
          marginY={4}
        />

        <Drawer placement='top' onClose={onClose} isOpen={isOpen}>
          <DrawerCloseButton colorScheme='blue' zIndex={9999} />
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth='1px' display='flex' flexWrap='wrap'>{navbarContent}
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
        
      </Box>

      <Box
        as='nav'
        my={5}
        display={{ base: 'none', sm: 'flex' }}
        justifyContent='space-between'
        alignItems='center'
      >
        {navbarContent}
      </Box>
    </>
  );
};

export default Navbar;
