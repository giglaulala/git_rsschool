import { configureStore } from "@reduxjs/toolkit";
import selectedItemsReducer from "../features/selectedItemsSlice";
import { pokemonApi } from "../services/pokemonApi";

export const store = configureStore({
  reducer: {
    selectedItems: selectedItemsReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
