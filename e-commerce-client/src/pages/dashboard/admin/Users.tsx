import { useState } from "react";
import ShopSearchBar from "../../../components/Shop/ShopSearchBar";
import DashboardHeading from "../../../components/ui/DashboardHeading";
import { Col, Row, Select, Table } from "antd";
import { useAppSelector } from "../../../redux/hooks";
import { selectCurrentUser } from "../../../redux/features/auth/auth.Slice";

import { TQueryParams } from "../../../types";
import { useGetAllAdminsQuery } from "../../../redux/features/admin/admin.api";
import { useGetAllCustomersQuery } from "../../../redux/features/customer/customer.api";
import { useGetAllVendorsQuery } from "../../../redux/features/vendor/vendor.api";
import ShopPagination from "../../../components/Shop/ShopPagination";
import UserHeading from "../../../components/users/UserHeading";

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

  const columns = [
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "mobileNo",
      key: "mobileNo",
    },
  ];

  if (userType === "customer") {
    columns.push({
      title: "Action",
      key: "action",
      dataIndex: "action",
      render: () => (
        <Select
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
