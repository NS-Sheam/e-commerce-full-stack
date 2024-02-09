import { TQueryParams, TReduxResponse } from "../../../types/global";
import { TCatgeory } from "../../../types/product.type";
import { baseApi } from "../../api/baseApi";

const productManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (productInfo) => ({
        url: `products`,
        method: "POST",
        body: productInfo,
      }),
    }),
    getProducts: builder.query({
      query: (args: TQueryParams[]) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: `products`,
          method: "GET",
          params,
        };
      },
    }),
    getCategories: builder.query({
      query: () => {
        return {
          url: `categories`,
          method: "GET",
        };
      },
      transformResponse: (response: TReduxResponse<TCatgeory[]>) => response.data,
    }),
  }),
});

export const { useGetProductsQuery, useGetCategoriesQuery, useAddProductMutation } = productManagementApi;
