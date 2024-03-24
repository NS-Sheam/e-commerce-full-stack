import { TReduxResponse } from "../../../types/global";
import { TUser } from "../../../types/userManagement.types";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => {
        return {
          url: "/users/me",
          method: "GET",
        };
      },
      providesTags: ["wishlist", "customer", "user", "vendor", "admin"],
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
    makeVendor: builder.mutation({
      query: (id: string) => ({
        url: `/vendors/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["vendor", "user"],
    }),
    makeAdmin: builder.mutation({
      query: (id: string) => ({
        url: `/admins/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["admin", "user"],
    }),
  }),
});

export const { useGetMeQuery, useUpdateWishListMutation, useMakeVendorMutation, useMakeAdminMutation } =
  userManagementApi;
