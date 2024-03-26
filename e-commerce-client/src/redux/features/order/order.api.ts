import { TOrder, TQueryParams, TReduxResponse } from "../../../types";
import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    placeOrder: builder.mutation({
      query: (orderData) => ({
        url: `orders`,
        method: "POST",
        body: orderData,
      }),
      transformResponse: (response: any) => response.data,
    }),
    allOrders: builder.query({
      query: (args: TQueryParams[] | undefined) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: `orders`,
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TReduxResponse<TOrder[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    customerOrder: builder.query({
      query: (args: TQueryParams[] | undefined) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: `orders/customer`,
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TReduxResponse<TOrder[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    vendorOrder: builder.query({
      query: (args: TQueryParams[] | undefined) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: `orders/vendor`,
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TReduxResponse<TOrder[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    changeOrderStatus: builder.mutation({
      query: (data: { id: string; status: string }) => ({
        url: `orders/${data.id}/status`,
        method: "PATCH",
        body: data.status,
      }),
    }),
  }),
});

export const {
  usePlaceOrderMutation,
  useAllOrdersQuery,
  useVendorOrderQuery,
  useCustomerOrderQuery,
  useChangeOrderStatusMutation,
} = orderApi;
