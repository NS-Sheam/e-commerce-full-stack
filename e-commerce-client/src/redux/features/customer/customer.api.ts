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
    }),
    getSingleCustomer: builder.query({
      query: (customerId: string) => ({
        url: `/customers/${customerId}`,
        method: "GET",
      }),
      transformResponse: (response: TReduxResponse<TCustomer>) => response.data,
    }),
    updateCustomer: builder.mutation({
      query: (data: { customer: Partial<TCustomer> }) => ({
        url: "/customers",
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response: TReduxResponse<TCustomer>) => response.data,
    }),
    deleteCustomer: builder.mutation({
      query: (customerId: string) => ({
        url: `/customers/${customerId}`,
        method: "DELETE",
      }),
      transformResponse: (response: TReduxResponse<TCustomer>) => response.data,
    }),
  }),
});

export const { useGetCustomersQuery, useGetSingleCustomerQuery, useUpdateCustomerMutation, useDeleteCustomerMutation } =
  customerApi;
