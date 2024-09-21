import ProductForm from './components/ProductForm';
import { Typography } from '@mui/material';
import { useNavigate, Navigate } from 'react-router-dom';
import { createProduct } from './productsThunks';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCreatingProduct } from './productsSlice';
import { ProductMutation } from '../../types';
import { selectUser } from '../users/usersSlice';

const NewProduct = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(selectCreatingProduct);
  const user = useAppSelector(selectUser);

  const onFormSubmit = async (productMutation: ProductMutation) => {
    try {
      await dispatch(createProduct(productMutation)).unwrap();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {!user ? (
        <Navigate to='/login' />
      ) : (
        <>
          <Typography variant='h4' sx={{ mb: 2 }}>
            New product
          </Typography>
          <ProductForm onSubmit={onFormSubmit} isLoading={isCreating} />
        </>
      )}

    </>
  );
};

export default NewProduct;
