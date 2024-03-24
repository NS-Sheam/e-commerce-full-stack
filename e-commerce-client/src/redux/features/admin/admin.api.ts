import { TAdmin, TQueryParams, TReduxResponse } from "../../../types";
import { baseApi } from "../../api/baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAdmins: builder.query({
      query: (args: TQueryParams[] | undefined) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: `admins`,
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TReduxResponse<TAdmin[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["admin"],
    }),
    getSingleAdmin: builder.query({
      query: (adminId: string) => ({
        url: `/admins/${adminId}`,
        method: "GET",
      }),
      transformResponse: (response: TReduxResponse<TAdmin>) => response.data,
      providesTags: ["admin"],
    }),
    updateAdmin: builder.mutation({
      query: (data: any) => ({
        url: "/admins",
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response: TReduxResponse<TAdmin>) => response.data,
      invalidatesTags: ["admin", "user"],
    }),
    deleteAdmin: builder.mutation({
      query: (adminId: string) => ({
        url: `/admins/${adminId}`,
        method: "DELETE",
      }),
      transformResponse: (response: TReduxResponse<TAdmin>) => response.data,
      invalidatesTags: ["admin", "user"],
    }),
  }),
});

export const { useGetAllAdminsQuery, useGetSingleAdminQuery, useUpdateAdminMutation, useDeleteAdminMutation } =
  adminApi;
