import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Select, Spinner } from '@chakra-ui/react';

import ListOfProducts from '../components/ListOfProducts';
import AddProduct from '../components/AddProduct';
import EmptyState from '../components/EmptyState';
import Header from '../components/Header';

import { getCategories, getProducts } from '../services';
import { Cat } from 'react-kawaii';

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
        <Select
          width={{ base: '100%', md: '25%', sm: '40%' }}
          defaultValue='placeholder'
          disabled={loadingCategories}
          onChange={handleChangeCategory}
        >
          <option value='placeholder' hidden>
            {' '}
            Seleccionar categoria{' '}
          </option>
          {['all', ...categories, 'games'].map((category) => (
            <option key={category} value={category}>
              {' '}
              {category}{' '}
            </option>
          ))}
        </Select>
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
