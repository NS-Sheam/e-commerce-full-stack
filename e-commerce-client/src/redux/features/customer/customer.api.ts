import { TCustomer, TReduxResponse } from "../../../types";
import { baseApi } from "../../api/baseApi";

const customerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCustomers: builder.query({
      query: () => ({
        url: "/customers",
        method: "GET",
      }),
      transformResponse: (response: TReduxResponse<TCustomer>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["customer"],
    }),
    getSingleCustomer: builder.query({
      query: (customerId: string) => ({
        url: `/customers/${customerId}`,
        method: "GET",
      }),
      transformResponse: (response: TReduxResponse<TCustomer>) => response.data,
      providesTags: ["customer"],
    }),
    updateCustomer: builder.mutation({
      query: (data: any) => ({
        url: "/customers",
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response: TReduxResponse<TCustomer>) => response.data,
      invalidatesTags: ["customer", "user"],
    }),
    deleteCustomer: builder.mutation({
      query: (customerId: string) => ({
        url: `/customers/${customerId}`,
        method: "DELETE",
      }),
      transformResponse: (response: TReduxResponse<TCustomer>) => response.data,
      invalidatesTags: ["customer", "user"],
    }),
  }),
});

export const { useGetCustomersQuery, useGetSingleCustomerQuery, useUpdateCustomerMutation, useDeleteCustomerMutation } =
  customerApi;
