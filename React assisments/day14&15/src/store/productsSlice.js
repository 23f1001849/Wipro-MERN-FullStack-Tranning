import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const API_URL = 'https://fakestoreapi.com/products?limit=4';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Unable to load products');
  }
  return response.json();
});

export const updateProduct = createAsyncThunk('products/updateProduct', async ({ id, changes }) => {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(changes),
  });

  if (!response.ok) {
    throw new Error('Failed to update product');
  }

  const data = await response.json();
  return { id, ...data, ...changes };
});

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    lastUpdated: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(updateProduct.pending, (state) => {
        state.status = 'updating';
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const { id, ...changes } = action.payload;
        const index = state.items.findIndex((item) => item.id === id);
        if (index !== -1) {
          state.items[index] = { ...state.items[index], ...changes };
        }
        state.status = 'succeeded';
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Update failed';
      });
  },
});

export default productsSlice.reducer;
