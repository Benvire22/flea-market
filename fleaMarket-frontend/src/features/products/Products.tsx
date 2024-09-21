import React, { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCategories, selectProducts, selectProductsLoading } from './productsSlice';
import { useParams } from 'react-router-dom';
import { Alert, CircularProgress, Typography } from '@mui/material';
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
    content = (
      <Grid container direction='column' alignItems='center' spacing={2}>
        <CircularProgress />
      </Grid>
    );
  } else if (products?.length > 0) {
    content = (
      <Grid container size={12} spacing={1}>
        {products.map((product) => (
          <ProductItem
            key={product._id}
            id={product._id}
            title={product.title}
            price={product.price}
            image={product.image}
          />
        ))}
      </Grid>
    );
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
      <Grid size={2}>
        <CategoriesMenu categories={categories} />
      </Grid>
      <Grid size={10} container direction='column' spacing={2}>
        <Grid container justifyContent='space-between' alignItems='center'>
          <Grid>
            <Typography variant='h4'>{pageTitle}</Typography>
          </Grid>
        </Grid>
        {content}
      </Grid>
    </Grid>
  );
};

export default Products;