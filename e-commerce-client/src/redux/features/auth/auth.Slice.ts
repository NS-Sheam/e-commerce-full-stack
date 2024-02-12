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
  shoppingCart: {
    item: string[];
  };
  wishList: string[];
};

const initialState: TAuthState = {
  user: null,
  token: null,
  shoppingCart: {
    item: [],
  },
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
      if (action.type === "ADD_TO_CART") {
        state?.shoppingCart?.item.push(action.payload);
      }
      if (action.type === "REMOVE_FROM_CART") {
        state.shoppingCart.item = state.shoppingCart.item.filter((item) => item !== action.payload);
      }
    },
  },
});

export const { setUser, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const useCurrentToken = (state: RootState) => state.auth.token;
