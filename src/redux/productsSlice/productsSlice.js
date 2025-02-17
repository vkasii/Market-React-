import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createSelector } from 'reselect'

const API_URL = 'https://dummyjson.com/products';
const CACHE_EXPIRATION_TIME = 24 * 60 * 60 * 1000;

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const storedProducts = localStorage.getItem('storedProducts');
  const lastFetchTime = localStorage.getItem('productsTimestamp');

  if (storedProducts && lastFetchTime && Date.now() - lastFetchTime < CACHE_EXPIRATION_TIME) {
    return JSON.parse(storedProducts)
  }

  const response = await fetch(API_URL)
  const data = await response.json()

  localStorage.setItem('storedProducts', JSON.stringify(data.products))
  localStorage.setItem('productsTimestamp', Date.now())

  return data.products
})

const initialState = {
  products: [],
  loading: false,
  error: ''
}

const productSlice = createSlice({

  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.error('Error: ', state.error)
      })
  }
})

export const getUniqueCategories = createSelector(
  [(state => state.products.products)],
  (products) => {
    if (products) {
      return [...new Set(products.map((product) => product.category))]
    }
  }
)

export const getCategoriesAmount = createSelector(
  [(state => state.products.products)],
  (products) => {
    const countedCategories = {}
    products.forEach(product => {
      countedCategories[product.category] ? countedCategories[product.category] += 1 : countedCategories[product.category] = 1
    })
    return countedCategories;
  }
)

export default productSlice.reducer
