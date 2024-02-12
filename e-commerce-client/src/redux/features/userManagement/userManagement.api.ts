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
    getSingleCustomer: builder.query({
      query: () => {
        return {
          url: `/users/me`,
          method: "GET",
        };
      },
      transformResponse: (response: TReduxResponse<TUser>) => response.data,
    }),
  }),
});

export const { useGetCustomersQuery, useGetSingleCustomerQuery } = userManagementApi;
