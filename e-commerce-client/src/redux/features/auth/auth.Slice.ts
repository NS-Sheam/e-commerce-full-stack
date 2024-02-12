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
    product?: {
      id: string;
      total: number;
    }[];
  };
  wishList: string[];
};

const initialState: TAuthState = {
  user: null,
  token: null,
  shoppingCart: {
    product: [],
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
        if (state.shoppingCart.product) {
          const isExist = state.shoppingCart.product.some((item) => item.id === action.payload.id);
          if (isExist) {
            state.shoppingCart.product = state.shoppingCart.product.map((item) => {
              if (item.id === action.payload.id) {
                return {
                  id: item.id,
                  total: item.total + 1,
                };
              }
              return item;
            });
          }
        } else {
          state.shoppingCart.product = [{ id: action.payload.id, total: 1 }];
        }
      }
      if (action.type === "REMOVE_FROM_CART") {
        if (state.shoppingCart.product) {
          const isExist = state.shoppingCart.product.some((item) => item.id === action.payload.id);
          if (isExist) {
            state.shoppingCart.product = state.shoppingCart.product.map((item) => {
              if (item.id === action.payload.id) {
                return {
                  id: item.id,
                  total: item.total - 1,
                };
              }
              return item;
            });
          }
        } else {
          state.shoppingCart.product = [{ id: action.payload.id, total: 0 }];
        }
      }
    },
  },
});

export const { setUser, logOut, setShoppingCart } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const useCurrentToken = (state: RootState) => state.auth.token;
