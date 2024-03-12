import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
/**
 * TODO:
 * - add wishlist to user state
 * - Have to refector user state cause for vendor and admin shopping cart and wishlist will not append
 */
export type TUser = {
  userId: string;
  email: string;
  image?: string;
  userType: string;
  iat: number;
  exp: number;
};

type TAuthState = {
  user: TUser | null;
  token: string | null;
  shoppingCart: string[];
  wishList: string[];
};

const initialState: TAuthState = {
  user: null,
  token: null,
  shoppingCart: [],
  wishList: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;

      state.user = user;
      state.token = token;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
    setShoppingCart: (state, action) => {
      const { type, id } = action.payload;
      if (type === "ADD_TO_CART") {
        const prevShoppingCart = state.shoppingCart.filter((item) => item !== id);
        state.shoppingCart = [...prevShoppingCart, id];
      }
      if (type === "REMOVE_FROM_CART") {
        state.shoppingCart = state.shoppingCart.filter((item) => item !== id);
      }
      if (type === "CLEAR_CART") {
        state.shoppingCart = [];
      }
    },
  },
});

export const { setUser, logOut, setShoppingCart } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const useCurrentToken = (state: RootState) => state.auth.token;
