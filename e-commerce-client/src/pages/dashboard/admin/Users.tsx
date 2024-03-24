import { useState } from "react";
import ShopSearchBar from "../../../components/Shop/ShopSearchBar";
import DashboardHeading from "../../../components/ui/DashboardHeading";
import { Col, Row, Select, Table } from "antd";
import { useAppSelector } from "../../../redux/hooks";
import { selectCurrentUser } from "../../../redux/features/auth/auth.Slice";

import { TAdmin, TCustomer, TQueryParams, TReduxResponse, TVendor } from "../../../types";
import { useGetAllAdminsQuery } from "../../../redux/features/admin/admin.api";
import { useGetAllCustomersQuery } from "../../../redux/features/customer/customer.api";
import { useGetAllVendorsQuery } from "../../../redux/features/vendor/vendor.api";
import ShopPagination from "../../../components/Shop/ShopPagination";
import UserHeading from "../../../components/users/UserHeading";
import { useMakeAdminMutation, useMakeVendorMutation } from "../../../redux/features/userManagement/userManagement.api";
import { toast } from "sonner";
import Swal from "sweetalert2";

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const user = useAppSelector(selectCurrentUser);
  const [page, setPage] = useState(1);
  const searchQuery: TQueryParams[] = [
    {
      name: "limit",
      value: 10 + "",
    },
    {
      name: "page",
      value: page + "",
    },
  ];
  if (searchTerm) {
    searchQuery.push({
      name: "searchTerm",
      value: searchTerm,
    });
  }

  const {
    data: customersData,
    isLoading: isCustomerLoading,
    isFetching: isCustomerFetching,
  } = useGetAllCustomersQuery(searchQuery);
  const {
    data: vendorsData,
    isLoading: isVendorLoading,
    isFetching: isVendorFetching,
  } = useGetAllVendorsQuery(searchQuery);

  const { data: adminsData, isLoading: isALoading, isFetching: isAFetching } = useGetAllAdminsQuery(searchQuery);

  const [makeVendor] = useMakeVendorMutation();
  const [makeAdmin] = useMakeAdminMutation();

  const [userType, setUserType] = useState("customer");

  if (isCustomerLoading || isVendorLoading || isALoading) {
    return <div>Loading...</div>;
  }
  const selectOptions = [
    {
      value: "makeVendor",
      label: "Make Vendor",
    },
  ];
  if (user?.userType === "superAdmin") {
    selectOptions.push({
      value: "makeAdmin",
      label: "Make Admin",
    });
  }
  const handleSelectChange = async (value: string, id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, do it!",
      cancelButtonText: "No, cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const toastId = toast.loading("Updating user...", { duration: 2000 });
          const res =
            value === "makeVendor"
              ? ((await makeVendor(id)) as TReduxResponse<TVendor>)
              : ((await makeAdmin(id)) as TReduxResponse<TAdmin>);
          if (!res.error) {
            toast.success(res.message || "User updated successfully", { id: toastId, duration: 2000 });
          } else {
            toast.error(res?.error?.data?.errorSources[0].message || res.error.message || "User updating failed", {
              id: toastId,
              duration: 2000,
            });
          }
        } catch (error: any) {
          toast.error(error.message || "User updating failed", { duration: 2000 });
        }
      }
    });
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "fullName",
      key: "_id",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "mobileNo",
      key: "_id",
    },
  ];

  if (userType === "customer") {
    columns.push({
      title: "Action",
      key: "_id",
      dataIndex: "_id",
      render: (item: string) => (
        <Select
          onChange={(value) => handleSelectChange(value, item)}
          options={selectOptions}
          defaultValue="Select Action"
          style={{ width: 200 }}
        />
      ),
    } as { title: string; dataIndex: string; key: string; render: () => JSX.Element });
  }

  return (
    <div className="min-h-screen space-y-4">
      <UserHeading
        userType={userType}
        setUserType={setUserType}
        setSearchTerm={setSearchTerm}
      />
      <Table
        columns={columns}
        loading={isCustomerFetching || isVendorFetching || isAFetching}
        rowKey="_id"
        dataSource={
          userType === "customer"
            ? (customersData?.data as any)
            : userType === "vendor"
            ? (vendorsData?.data as any)
            : (adminsData?.data as any) || []
        }
        pagination={false}
      />
      <ShopPagination
        page={page}
        setPage={setPage}
        meta={
          userType === "customer"
            ? (customersData?.meta as any)
            : userType === "vendor"
            ? (vendorsData?.meta as any)
            : (adminsData?.meta as any)
        }
      />
    </div>
  );
};

export default Users;
