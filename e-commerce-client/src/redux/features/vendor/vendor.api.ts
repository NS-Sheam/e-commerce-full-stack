import { TVendor, TReduxResponse } from "../../../types";
import { baseApi } from "../../api/baseApi";

const vendorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getVendors: builder.query({
      query: () => ({
        url: "/vendors",
        method: "GET",
      }),
      transformResponse: (response: TReduxResponse<TVendor>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getSingleVendor: builder.query({
      query: (vendorId: string) => ({
        url: `/vendors/${vendorId}`,
        method: "GET",
      }),
      transformResponse: (response: TReduxResponse<TVendor>) => response.data,
    }),
    updateVendor: builder.mutation({
      query: (data: { vendor: Partial<TVendor> }) => ({
        url: "/vendors",
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response: TReduxResponse<TVendor>) => response.data,
    }),
    deleteVendor: builder.mutation({
      query: (vendorId: string) => ({
        url: `/vendors/${vendorId}`,
        method: "DELETE",
      }),
      transformResponse: (response: TReduxResponse<TVendor>) => response.data,
    }),
  }),
});

export const { useGetVendorsQuery, useGetSingleVendorQuery, useUpdateVendorMutation, useDeleteVendorMutation } =
  vendorApi;
