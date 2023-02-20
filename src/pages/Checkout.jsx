import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Badge,
} from '@chakra-ui/react';
import { CreditCard } from 'react-kawaii';
import { useNavigate } from 'react-router-dom';
import EmptyState from '../components/EmptyState';
import useCarrito from '../hooks/useCarrito';
import { shallow } from 'zustand/shallow'

const Checkout = () => {
  const navigate = useNavigate()
  const { productos, updateMisCompras, removeAllProducts, calcResume } = useCarrito((state) => ({ 
    productos: state.products,
    updateMisCompras: state.updateMisCompras,
    removeAllProducts: state.removeAllProducts,
    calcResume: state.calcResume
  }), shallow);
  
  const { total, cantidadProductos } = calcResume()
  const today = new Date().toLocaleDateString();

  const handleConfirmarCompra = ()=> {
    const compra = {
      date: Date.now(),
      total: total.toFixed(2),
      cantidad: cantidadProductos
    }

    updateMisCompras(compra)
    removeAllProducts()
    navigate('/account')
  }

  return (
    <>
     <HStack as='header' justifyContent='space-between'>
      <Heading color="blackAlpha.800" my={8} size="lg"> Pago </Heading>
    </HStack>

      {!productos.length ? (
        <EmptyState message='No tiene productos en el carrito para poder realizar un pago'>
          <CreditCard size={120} mood='sad' color='#83D1FB' />
        </EmptyState>
      ) : (
        <Grid gridTemplateColumns={{ base: '1fr', md: '1fr 300px' }} gap={5}>
          <GridItem order={{ base: 1, sm: 0 }}>
            {productos.map((producto) => {
              return (
                <Card
                  key={producto.id}
                  direction={{ base: 'column', sm: 'row' }}
                  overflow='hidden'
                  variant='outline'
                  size='sm'
                  mb={4}
                  rounded='md'
                  minHeight={150}
                >
                  <Box minWidth={{ base: '100%', sm: '25%' }} overflow='hidden' mr={4}>
                    <Image
                      h='100%'
                      loading='lazy'
                      objectFit='cover'
                      maxW={{ base: '100%', sm: '200px' }}
                      src={producto.thumbnail}
                      alt='Caffe Latte'
                    />
                  </Box>

                  <Stack spacing={0}>
                    <CardBody>
                      <Heading size='md'>{producto.title}</Heading>

                      <Text>{producto.description}</Text>
                    </CardBody>

                    <CardFooter
                      fontSize='md'
                      display='flex'
                      alignItems='center'
                      gap={4}
                    >
                      <Badge
                        variant='subtle'
                        colorScheme='green'
                        verticalAlign='middle'
                      >
                        × {producto.cantidad}
                      </Badge>
                      <Text> ${(producto.cantidad * producto.priceWithDiscount).toFixed(2)} </Text>
                    </CardFooter>
                  </Stack>
                </Card>
              );
            })}
          </GridItem>

          <GridItem position={{ base: 'relative', sm: 'sticky' }} top={{ base: 0, sm: 10 }} height={{ base: 'fit-content', sm: 0 }}>
            <Box border='1px solid' borderColor='gray.200' rounded='md' p={4}>
              <Stat>
                <StatLabel>Resumen de la compra </StatLabel>
                <StatNumber>${total.toFixed(2)}</StatNumber>
                <StatHelpText>{cantidadProductos} productos</StatHelpText>
                <StatHelpText fontSize='xs' mt={4}>
                  {today}
                </StatHelpText>
              </Stat>

              <Button size='sm' colorScheme='green' onClick={handleConfirmarCompra}>
                CONFIRMAR COMPRA
              </Button>
            </Box>
          </GridItem>
        </Grid>
      )}
    </>
  );
};

export default Checkout;
