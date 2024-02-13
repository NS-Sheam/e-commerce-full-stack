import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TInitialState = {
  products: string[];
};
const initialState: TInitialState = {
  products: [],
};
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<string>) => {
      state.products.push(action.payload);
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((product) => product !== action.payload);
    },
  },
});

export const { setProducts, removeProduct } = productSlice.actions;

export default productSlice.reducer;
