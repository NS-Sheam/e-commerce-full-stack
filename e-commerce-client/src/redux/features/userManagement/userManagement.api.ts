import { TReduxResponse } from "../../../types/global";
import { TUser } from "../../../types/userManagement.type";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCustomers: builder.query({
      query: () => ({
        url: "/customers",
        method: "GET",
      }),
    }),
    getMe: builder.query({
      query: () => {
        return {
          url: "/users/me",
          method: "GET",
        };
      },
      providesTags: ["wishlist", "customer", "user"],
      transformResponse: (response: TReduxResponse<TUser>) => response.data,
    }),
    updateWishList: builder.mutation({
      query: (data: { productId: string }) => {
        return {
          url: "/customers/wishlist",
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["wishlist", "customer", "user"],
      transformResponse: (response: TReduxResponse<TUser>) => {
        return response.data;
      },
    }),
  }),
});

export const { useGetCustomersQuery, useGetMeQuery, useUpdateWishListMutation } = userManagementApi;
