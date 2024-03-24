import { TVendor, TReduxResponse, TQueryParams } from "../../../types";
import { baseApi } from "../../api/baseApi";

const vendorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllVendors: builder.query({
      query: (args: TQueryParams[] | undefined) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }

        return {
          url: "/vendors",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TReduxResponse<TVendor[]>) => {
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

export const { useGetAllVendorsQuery, useGetSingleVendorQuery, useUpdateVendorMutation, useDeleteVendorMutation } =
  vendorApi;
