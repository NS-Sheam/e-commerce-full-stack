import { createSlice } from "@reduxjs/toolkit";

type TInitialState = {
  products: string[];
};
const initialState: TInitialState = {
  products: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { setOrders } = orderSlice.actions;
export default orderSlice.reducer;
