import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, HStack, Text, useToast, VStack, Icon } from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { Ghost } from 'react-kawaii'
import { shallow } from 'zustand/shallow'

import useCarrito from "../hooks/useCarrito";

import { ShopCartOffIcon } from "../components/Icons";
import AddProduct from "../components/AddProduct";
import ListOfProducts from "../components/ListOfProducts";
import EmptyState from "../components/EmptyState";
import Header from "../components/Header";

const Carrito = () => {
  const { carrito, vaciarCarrito, activeProduct, calcResume } = useCarrito(state=> ({ 
    carrito: state.products, 
    vaciarCarrito: state.removeAllProducts,
    activeProduct: state.activeProduct,
    calcResume: state.calcResume
  }), shallow);
  
  const navigate = useNavigate()
  const toast = useToast();
  let toastIdRef = useRef()

  const { total, cantidadProductos } = calcResume();

  useEffect(() => {
    const toastConfig = {
      status: 'info',
      isClosable: false,
      render: () => (
        <Button colorScheme='blue' size='lg' width='100%' py='2rem' onClick={toCheckout}>
          <HStack spacing={5}  w='full'>
            <Icon as={InfoIcon} alignSelf='start' mt={1} /> 
            <VStack alignItems='flex-start'>
              <Text fontSize='md'> Total a pagar ${total.toFixed(2)} </Text>
              <Text fontSize='sm' fontWeight='normal' > Hay {cantidadProductos} productos </Text>
            </VStack>
          </HStack>
        </Button>
      ),
      duration: null,
    }

    if(activeProduct) {
      return ()=> toast.close(toastIdRef)
    }

    if(total !== 0){
      toastIdRef = toast(toastConfig);
  
      if (toast.isActive(toastIdRef)) {
        toast.update(toastIdRef, toastConfig)
      } 
    }

    return ()=> {
      toast.close(toastIdRef)
    }
  }, [toast, total, cantidadProductos, toastIdRef, activeProduct]);

  const toCheckout = ()=> navigate('/checkout')

  return (
    <>
      <Header title='Mi carrito'>
        <Button
          leftIcon={<ShopCartOffIcon />}
          isDisabled={cantidadProductos === 0}
          onClick={vaciarCarrito}
          variant='solid'
          width={{ base: '100%', md: '25%', sm: '40%' }}
        >
          Vaciar carrito
        </Button>
      </Header>

      <ListOfProducts
        products={carrito}
        fallback={
          <EmptyState message='No hay productos en el carrito'>
            <Ghost size={150} mood='sad' color='#E0E4E8' />
          </EmptyState>
        }
      />

      <AddProduct />
    </>
  );
};

export default Carrito;