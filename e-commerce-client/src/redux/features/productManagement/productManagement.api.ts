import { TQueryParams, TReduxResponse } from "../../../types/global";
import { TCatgeory, TProduct } from "../../../types/product.types";
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
      query: (args: TQueryParams[] | undefined) => {
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
      transformResponse: (response: TReduxResponse<TProduct[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getSingleProduct: builder.query({
      query: (id: string) => {
        return {
          url: `products/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response: TReduxResponse<TProduct>) => response.data,
    }),
    getCategories: builder.query({
      query: () => {
        return {
          url: `categories`,
          method: "GET",
        };
      },
      transformResponse: (response: TReduxResponse<TCatgeory[]>) => response.data,
      providesTags: ["category"],
    }),
    getProductBrands: builder.query({
      query: () => {
        return {
          url: `products`,
          method: "GET",
        };
      },
      transformResponse: (response: TReduxResponse<TProduct[]>) => {
        const brands = response.data?.map((product) => product.brand);
        return brands;
      },
    }),
    addCategory: builder.mutation({
      query: (categoryInfo) => ({
        url: `categories`,
        method: "POST",
        body: categoryInfo,
      }),
      invalidatesTags: ["category"],
    }),
    updateCategory: builder.mutation({
      query: (categoryInfo) => ({
        url: `categories/${categoryInfo.id}`,
        method: "PUT",
        body: categoryInfo,
      }),
      invalidatesTags: ["category"],
    }),
    deleteCategory: builder.mutation({
      query: (id: string) => ({
        url: `categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetCategoriesQuery,
  useAddProductMutation,
  useGetSingleProductQuery,
  useAddCategoryMutation,
  useGetProductBrandsQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = productManagementApi;
