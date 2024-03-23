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
      providesTags: ["vendor"],
    }),
    getSingleVendor: builder.query({
      query: (vendorId: string) => ({
        url: `/vendors/${vendorId}`,
        method: "GET",
      }),
      transformResponse: (response: TReduxResponse<TVendor>) => response.data,
      providesTags: ["vendor"],
    }),
    updateVendor: builder.mutation({
      query: (data: any) => ({
        url: "/vendors",
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response: TReduxResponse<TVendor>) => response.data,
      invalidatesTags: ["vendor", "user"],
    }),
    deleteVendor: builder.mutation({
      query: (vendorId: string) => ({
        url: `/vendors/${vendorId}`,
        method: "DELETE",
      }),
      transformResponse: (response: TReduxResponse<TVendor>) => response.data,
      invalidatesTags: ["vendor", "user"],
    }),
  }),
});

export const { useGetVendorsQuery, useGetSingleVendorQuery, useUpdateVendorMutation, useDeleteVendorMutation } =
  vendorApi;
