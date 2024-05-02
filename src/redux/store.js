import { configureStore } from '@reduxjs/toolkit';
import productsSliceReducer from "./product.slice/product.slice";
import cartSliceReducer from './card.slice/card.slice';
import favouriteSliceReduce from './favourite.slice/favourite.slice';

export const store = configureStore({
  reducer: {
    products: productsSliceReducer,
    cart: cartSliceReducer,
    favorites: favouriteSliceReduce,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});