import { List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import React from 'react';
import Grid from '@mui/material/Grid2';

interface Props {
  categories: string[];
}

const CategoriesMenu: React.FC<Props> = ({ categories }) => {
  const { categoryId } = useParams();

  return (
    <Grid container direction="column" spacing={2}>
      <Grid>
        <Typography variant="h6">Categories</Typography>
      </Grid>
      <Grid>
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/" selected={!categoryId}>
              <ListItemText primary="All products" />
            </ListItemButton>
          </ListItem>
          {categories.map((category) => (
            <ListItem key={category} disablePadding>
              <ListItemButton
                component={Link}
                to={`/categories/${category}`}
                selected={category === categoryId}
              >
                <ListItemText primary={category} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};

export default CategoriesMenu;
