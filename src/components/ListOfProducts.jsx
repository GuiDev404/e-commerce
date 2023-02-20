import { Grid } from '@chakra-ui/react';
import Product from './Product';

const ListOfProducts = ({ products, fallback }) => {
  const noProducts = Boolean(products && products.length)

  return noProducts ? (
    <Grid
      gridTemplateColumns={{
        base: '1fr',
        sm: 'repeat(auto-fill, minmax(300px, 1fr))',
      }}
      my={4}
      gap={10}
    >
      {products.map((product) => (
        <Product
          key={product.id}
          id={product.id}
          thumbnail={product.thumbnail}
          images={product.images}
          category={product.category}
          title={product.title}
          description={product.description}
          price={product.price}
          discountPercentage={product.discountPercentage}
          brand={product.brand}
        />
      ))}
    </Grid>
  ) : (
    fallback
  );
};

export default ListOfProducts;
