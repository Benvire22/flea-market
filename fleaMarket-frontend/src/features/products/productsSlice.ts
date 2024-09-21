import { GlobalError, Product } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { createProduct, deleteProduct, fetchOneProduct, fetchProducts } from './productsThunks';

export interface ProductState {
  products: Product[];
  loadingProducts: boolean;
  errorLoadingProducts: boolean;
  oneProduct: Product | null;
  loadingOneProduct: boolean;
  errorLoadingOneProduct: boolean;
  isCreating: boolean;
  errorCreating: GlobalError | null;
  isDeletingProduct: boolean;
  errorDeletingProduct: boolean
}

const initialState: ProductState = {
  products: [],
  loadingProducts: false,
  errorLoadingProducts: false,
  oneProduct: null,
  loadingOneProduct: false,
  errorLoadingOneProduct: false,
  isCreating: false,
  errorCreating: null,
  isDeletingProduct: false,
  errorDeletingProduct: false,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    unsetUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.errorLoadingProducts = false;
      state.loadingProducts = true;
    }).addCase(fetchProducts.fulfilled, (state, { payload: products }) => {
      state.loadingProducts = false;
      state.products = products;
    }).addCase(fetchProducts.rejected, (state) => {
      state.errorLoadingProducts = true;
      state.loadingProducts = false;
    });

    builder.addCase(fetchOneProduct.pending, (state) => {
      state.oneProduct = null;
      state.errorLoadingOneProduct = false;
      state.loadingOneProduct = true;
    }).addCase(fetchOneProduct.fulfilled, (state, { payload: product }) => {
      state.loadingOneProduct = false;
      state.oneProduct = product;
    }).addCase(fetchOneProduct.rejected, (state) => {
      state.errorLoadingOneProduct = true;
      state.loadingOneProduct = false;
    });

    builder.addCase(createProduct.pending, (state) => {
      state.errorCreating = null;
      state.isCreating = true;
    }).addCase(createProduct.fulfilled, (state) => {
      state.isCreating = false;
    }).addCase(createProduct.rejected, (state, { payload: error }) => {
      state.errorCreating = error || null;
      state.isCreating = false;
    });

    builder.addCase(deleteProduct.pending, (state) => {
      state.errorDeletingProduct = false;
      state.isDeletingProduct = true;
    }).addCase(deleteProduct.fulfilled, (state) => {
      state.isDeletingProduct = false;
    }).addCase(deleteProduct.rejected, (state) => {
      state.errorDeletingProduct = true;
      state.isDeletingProduct = false;
    });
  },
  selectors: {
    selectProduct: (state) => state.products,
    selectProductLoading: (state) => state.loadingProducts,
    selectErrorLoadingProduct: (state) => state.errorLoadingOneProduct,
    selectOneProduct: (state) => state.oneProduct,
    selectOneProductLoading: (state) => state.loadingOneProduct,
    selectOneProductError: (state) => state.errorLoadingOneProduct,
    selectCreatingProduct: (state) => state.isCreating,
    selectErrorCreatingOneProduct: (state) => state.errorCreating,
    selectDeleteLoadingProduct: (state) => state.isDeletingProduct,
    selectErrorDeletingProduct: (state) => state.errorDeletingProduct
  },
});

export const productsReducer = productsSlice.reducer;

export const {
  selectProduct,
  selectProductLoading,
  selectOneProduct,
  selectOneProductLoading,
  selectCreatingProduct,
  selectErrorCreatingOneProduct,
  selectDeleteLoadingProduct,
  selectErrorDeletingProduct,
} = productsSlice.selectors;
