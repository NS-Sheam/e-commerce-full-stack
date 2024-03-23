import { TAdmin, TReduxResponse } from "../../../types";
import { baseApi } from "../../api/baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdmins: builder.query({
      query: () => ({
        url: "/admins",
        method: "GET",
      }),
      transformResponse: (response: TReduxResponse<TAdmin>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getSingleAdmin: builder.query({
      query: (adminId: string) => ({
        url: `/admins/${adminId}`,
        method: "GET",
      }),
      transformResponse: (response: TReduxResponse<TAdmin>) => response.data,
    }),
    updateAdmin: builder.mutation({
      query: (data: { admin: Partial<TAdmin> }) => ({
        url: "/admins",
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response: TReduxResponse<TAdmin>) => response.data,
    }),
    deleteAdmin: builder.mutation({
      query: (adminId: string) => ({
        url: `/admins/${adminId}`,
        method: "DELETE",
      }),
      transformResponse: (response: TReduxResponse<TAdmin>) => response.data,
    }),
  }),
});

export const { useGetAdminsQuery, useGetSingleAdminQuery, useUpdateAdminMutation, useDeleteAdminMutation } = adminApi;
