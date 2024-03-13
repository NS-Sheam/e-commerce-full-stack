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
  }),
});

export const { usePlaceOrderMutation } = orderApi;
