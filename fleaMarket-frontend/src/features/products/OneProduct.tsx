import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectDeleteLoadingProduct, selectOneProduct, selectOneProductLoading } from './productsSlice';
import { deleteProduct, fetchOneProduct } from './productsThunks';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Grid from '@mui/material/Grid2';
import { Alert, Button, CardMedia, CircularProgress, styled, Typography } from '@mui/material';
import { API_URL } from '../../constants';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { selectUser } from '../users/usersSlice';
import { LoadingButton } from '@mui/lab';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const ImageCardMedia = styled(CardMedia)({
  height: '400px',
  width: '350px',
});

const OneProduct = () => {
  const user = useAppSelector(selectUser);
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const product = useAppSelector(selectOneProduct);
  const isFetching = useAppSelector(selectOneProductLoading);
  const isDeleting = useAppSelector(selectDeleteLoadingProduct);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      void dispatch(fetchOneProduct(id)).unwrap();
    } catch (e) {
      console.error(e);
    }
  }, [dispatch, id]);

  let content: React.ReactNode = (
    <Alert severity='info' sx={{ width: '100%' }}>
      ...
    </Alert>
  );

  const handleDeleteProduct = async () => {
    try {
      await dispatch(deleteProduct(id)).unwrap();
      navigate('/');
    } catch (e) {
      console.error(e);
    }
  };

  if (isFetching) {
    content = <CircularProgress />;
  } else if (product) {
    content = (
      <>
        <Grid container justifyContent='space-between' spacing={2} alignItems='center'>
          <Grid>
            <Typography variant='h3' marginBottom='20px'>
              {product.title}
            </Typography>
            <Typography variant='h4' color='primary'>
              Trader: {product.user.displayName}
            </Typography>
          </Grid>
          {user && user._id === product.user._id ? (
            <Grid>
              <LoadingButton
                type='button'
                fullWidth
                sx={{ mt: 3, mb: 2 }}
                color='error'
                loading={isDeleting}
                loadingPosition='end'
                endIcon={<DeleteForeverIcon />}
                variant='contained'
                onClick={handleDeleteProduct}
              >
                <span>Sign up</span>
              </LoadingButton>
            </Grid>
          ) : null}
        </Grid>
        <Grid fontWeight='bold' color='indigo' component={Typography} variant='h6'>
          Price: {product.price} KGS
        </Grid>
        <Grid container spacing={2}>
          <Grid size={4}>
            <ImageCardMedia image={`${API_URL}/${product.image}`} title={product.title} />
          </Grid>
          <Grid size={8} component={Typography}>{product.description}</Grid>
        </Grid>
        <Grid severity='info' icon={<LocalPhoneIcon />} component={Alert} sx={{ fontSize: 22 }} alignItems='center'>
          <span>Phone {product.user.phoneNumber}</span>
        </Grid>
      </>
    );
  }

  return (
    <Grid container direction='column' spacing={2}>
      <Grid>
        <Button variant='text' startIcon={<ArrowBackIcon />} component={Link} to='/'>
          Back to products
        </Button>
      </Grid>
      {content}
    </Grid>
  );
};

export default OneProduct;
