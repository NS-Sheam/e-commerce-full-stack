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
      const indexToRemove = state.products.indexOf(action.payload);
      if (indexToRemove !== -1) {
        state.products.splice(indexToRemove, 1);
      }
    },
  },
});

export const { setProducts, removeProduct } = productSlice.actions;

export default productSlice.reducer;
