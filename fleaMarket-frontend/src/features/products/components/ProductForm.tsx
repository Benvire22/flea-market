import React, { useState } from 'react';
import { MenuItem, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import { ProductMutation } from '../../../types';
import FileInput from '../../../UI/FileInput/FileInput';
import { useAppSelector } from '../../../app/hooks';
import { selectCategories, selectErrorCreatingOneProduct } from '../productsSlice';

interface Props {
  onSubmit: (post: ProductMutation) => void;
  isLoading: boolean;
}

const PostForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const error = useAppSelector(selectErrorCreatingOneProduct);
  const categories = useAppSelector(selectCategories);

  const [state, setState] = useState<ProductMutation>({
    title: '',
    description: '',
    image: '',
    price: '',
    category: '',
  });

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({ ...state });
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    const value = files && files[0] ? files[0] : null;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Grid container direction='column' spacing={2} component='form' onSubmit={submitFormHandler}>
      <Grid>
          <TextField
            required
            select
            label="Category"
            id="category"
            name="category"
            value={state.category}
            onChange={inputChangeHandler}
          >
            <MenuItem value="" disabled>
              Select category
            </MenuItem>
            {categories.map((category) => (
              <MenuItem key={category + new Date()} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
      </Grid>
      <Grid>
        <TextField
          required
          label='Title'
          id='title'
          name='title'
          value={state.title}
          onChange={inputChangeHandler}
        />
      </Grid>
      <Grid>
        <TextField
          required
          multiline
          minRows={3}
          label='Description'
          id='description'
          name='description'
          value={state.description}
          onChange={inputChangeHandler}
        />
      </Grid>
      <Grid>
        <TextField
          required
          label='Price'
          id='price'
          name='price'
          value={state.price}
          onChange={inputChangeHandler}
        />
      </Grid>
      <Grid>
        <FileInput
          required
          label='Image'
          name='image'
          onChange={fileInputChangeHandler}
        />
      </Grid>
      <Grid>
        <LoadingButton
          type='submit'
          loading={isLoading}
          loadingPosition='start'
          startIcon={<SaveIcon />}
          variant='contained'
        >
          <span>Save</span>
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default PostForm;
