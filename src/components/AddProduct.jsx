import { useEffect, useState } from "react";
import { Alert, Badge, Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader,
  DrawerOverlay, IconButton, Text, HStack, useDisclosure, Tag } from "@chakra-ui/react";
import { MinusIcon, AddIcon } from "@chakra-ui/icons";

import useCarrito from "../hooks/useCarrito";
import Slider from "./Slider";

const AddProduct = () => {
  const [count, setCount] = useState(1)
  const { isOpen, onClose, onOpen } = useDisclosure()
  const { activeProduct, products, addProduct, updateProduct, setActiveProduct, removeProduct } = useCarrito();
  
  const productInCarrito = products.find(p=> p.id === activeProduct?.id);

  const positiveCount = productInCarrito ? 'Actualizar' : 'Agregar'
  const messageCantidad = (count === 0 && productInCarrito) ? 'Sacar del carrito' : positiveCount

  useEffect(()=> {
    if(activeProduct) {
      setCount(productInCarrito?.cantidad ?? 1)
      onOpen()
    } else {
      onClose()
    }
  }, [activeProduct, productInCarrito])

  const agregarAlCarrito = ()=> {
    const product = { 
      ...activeProduct, 
      cantidad: count,
    };

    if(productInCarrito){
      if(count === 0){
        removeProduct(productInCarrito.id)
        setActiveProduct(null)
        return;
      }

      updateProduct(product)
    } else {
      addProduct(product)
    }
  }

  const addItems = ()=> setCount(prevCount=> prevCount + 1)
  const minusItems = ()=> setCount(prevCount=> prevCount - 1)

  const handleOnClose = ()=> {
    setActiveProduct(null)
    setCount(1)
  }

  return Boolean(activeProduct) && (
    <Drawer isOpen={isOpen} placement="right" onClose={handleOnClose} size="sm">
      <DrawerOverlay />
      <DrawerContent overflowY="auto" zIndex={9999}>
        <DrawerCloseButton 
          size='md'
          bgColor='white'
          border='1px solid'
          borderColor='gray.100'
          color='black'
          zIndex={999}
        />
        
        <DrawerHeader fontSize="2xl" mb={0} pb={0}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems='center'
            overflowX="hidden"
            mb={3}
            height='350px'
          >
           <Slider images={activeProduct.images.reverse()} />
          </Box>
          
          {activeProduct.title}
        </DrawerHeader>

        <DrawerBody overflow="visible">
          {activeProduct.brand && <Tag colorScheme='green' size='sm' mb={4}>{activeProduct.brand}</Tag>}
          <Text color='blackAlpha.800'> {activeProduct.description} </Text>

          <HStack mt={10} mb={3} justifyContent="space-between">
            <Text> Cantidad </Text>
            <HStack>
              <IconButton
                isDisabled={(!productInCarrito && count <= 1) || (count === 0 && productInCarrito)}
                onClick={minusItems}
                aria-label="minus item"
                size="xs"
                colorScheme="green"
                borderRadius="full"
                icon={<MinusIcon />}
              />

              <Text> {count} </Text>

              <IconButton
                onClick={addItems}
                aria-label="add item"
                size="xs"
                colorScheme="green"
                borderRadius="full"
                icon={<AddIcon />}
              />
            </HStack>
          </HStack>
        </DrawerBody>

        <DrawerFooter>
          <Alert
            onClick={agregarAlCarrito}
            transition="all .3s ease"
            _hover={{ bg: "green.500", color: "white" }}
            status="success"
            as="button"
            borderRadius="md"
            d="flex"
            justifyContent="space-between"
          >
            <HStack spacing={5}>
              <Text fontSize='sm'> 
                {messageCantidad} 
              </Text>
              <Badge bg="green.600" color="white">
                {count ?? 1} items
              </Badge>
            </HStack>

            {activeProduct && <Text fontSize="sm">
              $ {(activeProduct.priceWithDiscount * count).toFixed(2)}
            </Text>}
          </Alert>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AddProduct;
