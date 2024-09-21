import React from 'react';
import { Card, CardActions, CardContent, CardMedia, IconButton, styled, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { API_URL } from '../../../constants';
import Grid from '@mui/material/Grid2';

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%',
});

interface Props {
  id: string;
  title: string;
  price: number;
  image: string;
}

const ProductItem: React.FC<Props> = ({ id, title, price, image }) => {
  let cardImage = '';

  if (image) {
    cardImage = `${API_URL}/${image}`;
  }

  return (
    <Grid sx={{ width: '300px' }}>
      <Card sx={{ height: '100%' }}>
        <ImageCardMedia image={cardImage} title={title} />
        <CardContent>
          <Typography gutterBottom variant="h6">
            {title}
          </Typography>
          <Typography variant="h5" color="primary">Price: {price} KGS</Typography>
        </CardContent>
        <CardActions>
          <IconButton component={Link} to={`/products/${id}`}>
            <ArrowForwardIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProductItem;
