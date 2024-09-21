import React, { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCategories, selectProducts, selectProductsLoading } from './productsSlice';
import { Link, useParams } from 'react-router-dom';
import { Alert, Button, CircularProgress, Typography } from '@mui/material';
import ProductItem from './components/ProductItem';
import Grid from '@mui/material/Grid2';
import CategoriesMenu from './components/CategoriesMenu';
import { fetchProducts } from './productsThunks';

const Products = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const categories = useAppSelector(selectCategories);
  const isFetching = useAppSelector(selectProductsLoading);
  const { categoryId } = useParams();

  useEffect(() => {
    try {
      void dispatch(fetchProducts(categoryId)).unwrap();
    } catch (e) {
      console.error(e);
    }
  }, [dispatch, categoryId]);

  let content: React.ReactNode = (
    <Alert severity='info' sx={{ width: '100%' }}>
      There are no products here!
    </Alert>
  );

  if (isFetching) {
    content = <CircularProgress />;
  } else if (products?.length > 0) {
    content = products.map((product) => (
      <ProductItem
        key={product._id}
        id={product._id}
        title={product.title}
        price={product.price}
        image={product.image}
        category={product.category}
      />
    ));
  }

  const pageTitle = useMemo(() => {
    if (!categoryId) {
      return 'All products';
    }
    const category = categories.find((category) => category === categoryId);
    if (!category) {
      return '...';
    }
    return category;
  }, [categories, categoryId]);


  return (
    <Grid container spacing={2}>
      <Grid sx={{ width: 200 }}>
        <CategoriesMenu categories={categories} />
      </Grid>
      <Grid container direction='column' spacing={2}>
        <Grid container justifyContent='space-between' alignItems='center'>
          <Grid>
            <Typography variant='h4'>{pageTitle}</Typography>
          </Grid>
          <Grid>
            <Button color='primary' component={Link} to='/add-new'>
              Add product
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          {content}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Products;