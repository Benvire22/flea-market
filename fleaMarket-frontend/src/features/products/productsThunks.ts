import { createAsyncThunk } from '@reduxjs/toolkit';
import { GlobalError, Product, ProductMutation } from '../../types';
import axiosApi from '../../axiosApi';
import { RootState } from '../../app/store';
import { isAxiosError } from 'axios';


export const fetchProducts = createAsyncThunk<Product[], string>(
  'products/fetchAll',
  async (categoryId) => {
    try {
      const { data: products } = await axiosApi.get<Product[]>('/products', { params: { category: categoryId } });

      if (!products) {
        return [];
      }

      return products;
    } catch (e) {
      console.error(e);
    }
  },
);

export const fetchOneProduct = createAsyncThunk<Product | null, string>(
  'products/fetchOne',
  async (productId) => {
    try {
      const { data: product } = await axiosApi.get<Product>(`/products/${productId}`);

      if (!product) {
        return null;
      }

      return product;
    } catch (e) {
      console.error(e);
    }
  },
);

export const createProduct = createAsyncThunk<void, ProductMutation, { state: RootState, rejectValue: GlobalError }>(
  'products/create',
  async (productMutation, { getState, rejectWithValue }) => {
    try {
      const formData = new FormData();
      const token = getState().users.user?.token;

      const keys = Object.keys(productMutation) as (keyof ProductMutation)[];
      keys.forEach((key) => {
        const value = productMutation[key];
        formData.append(key, value);
      });

      await axiosApi.post(`/products`, formData, { headers: { 'Authorization': `Bearer ${token}` } });
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data);
      }

      throw e;
    }
  },
);

export const deleteProduct = createAsyncThunk<void, string, { state: RootState }>(
  'products/delete',
  async (productId, { getState }) => {
    try {
      const token = getState().users.user?.token;
      await axiosApi.delete(`/products/${productId}`, { headers: { 'Authorization': `Bearer ${token}` } });
    } catch (e) {
      console.error(e);
    }
  },
);