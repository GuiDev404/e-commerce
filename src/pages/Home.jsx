import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, FormLabel, Select, Spinner } from '@chakra-ui/react';

import ListOfProducts from '../components/ListOfProducts';
import AddProduct from '../components/AddProduct';
import EmptyState from '../components/EmptyState';
import Header from '../components/Header';

import { getCategories, getProducts } from '../services';
import { Cat } from 'react-kawaii';
import { defaultCategories } from '../config/const';

const Home = () => {
  const [categorySelected, setCategorySelected] = useState('all');

  const { data: categories = [], isLoading: loadingCategories } = useQuery(
    ['categories'],
    getCategories
  );
  const { data: productsResults, isLoading: loadingProducts } = useQuery(
    ['products', categorySelected],
    getProducts
  );

  const handleChangeCategory = (e) => setCategorySelected(e.target.value);

  return (
    <>
      <AddProduct />

      <Header title='Productos disponibles'>
        <Box display='flex' alignItems='center'>
        <FormLabel minWidth='75px' mb={0} htmlFor='filter'>
          Filtrar por
        </FormLabel>
        <Select
            // width={{ base: '100%', md: '25%', sm: '40%' }}
            defaultValue='placeholder'
            disabled={loadingCategories}
            onChange={handleChangeCategory}
            id='filter'
          >
            {[defaultCategories[0], ...categories, defaultCategories[1]].map((category) => (
              <option key={category.slug} value={category.slug}>
                {' '}
                {category.name}{' '}
              </option>
            ))}
          </Select>
        </Box>
      </Header>

      {loadingProducts ? (
        <EmptyState>
          <Spinner />
        </EmptyState>
      ) : (
        <ListOfProducts
          products={productsResults.products}
          fallback={
            <EmptyState message='No hay productos para la categoria seleccionada'>
              <Cat size={150} mood='shocked' color='#596881' />
            </EmptyState>
          }
        />
      )}
    </>
  );
};

export default Home;
