import { Badge, Box, GridItem, HStack, Image, Skeleton, Text } from "@chakra-ui/react";
import useCarrito from "../hooks/useCarrito";
import no_image_available_product from '../assets/no_image_available_product.png'
import React from 'react'

const Product = ({ thumbnail, images, category, title, description, price, discountPercentage, brand, id }) => {
  const setActiveProduct = useCarrito(state=> state.setActiveProduct);

  const handleSetActiveProduct = ()=> {
    setActiveProduct({ 
      thumbnail, images, category, title, description, price, discountPercentage, brand, id
    })
  }

  return (
    <GridItem
      cursor="pointer"
      onClick={handleSetActiveProduct}
      shadow="lg"
      borderRadius="md"
      overflow="hidden"
      scrollSnapAlign="start"
    >
      <Box height={{ base: 300, sm: 200 }}>
        <Image 
          height='100%' 
          // loading="lazy"
          width='100%'
          objectFit='cover'
          margin="0 auto"
          fallback={<Skeleton height='100%' width='100%'></Skeleton>}
          src={thumbnail || images?.[0] || no_image_available_product}
        />
      </Box>

      <Box p={4}>
        <Badge mt={1} mb={3} fontSize='.7rem' colorScheme="green"> {category}</Badge>
        <Text fontSize='2xl'  fontWeight='bold'> 
          {title} 
        </Text>

        <Text fontSize='sm' mt={2} mb={8} color='gray.700'> {description} </Text>
        <HStack mt={3} alignItems='center'>
          <Text  fontSize="xl" fontWeight="bold">
            $ {(price - (price * (discountPercentage / 100))).toFixed(0)}
          </Text>
          <Text color="gray.400" textDecoration='line-through' fontSize="lg" fontWeight="bold">
            $ {price}
          </Text>
          <Text fontSize="sm" color="green.500">
            {discountPercentage}% off
          </Text>
        </HStack>
      </Box>
    </GridItem>
  );
};

export default React.memo(Product);