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
      title: "Action",
      key: "action",
      render: () => {
        return (
          <Select
            defaultValue={"makeVendor"}
            options={[
              {
                value: "makeVendor",
                label: "Make Vendor",
              },
              {
                value: "makeAdmin",
                label: "Make Admin",
              },
            ]}
          />
        );
      },
    },
  ];

  return (
    <div className="min-h-screen space-y-4">
      <DashboardHeading>
        <ShopSearchBar
          placeholder="Enter name of the user...."
          setSearchTerm={setSearchTerm}
        />
        <Row
          justify={"center"}
          align={"middle"}
          className="md:w-1/2 px-2"
        >
          <Col
            onClick={() => setUserType("customer")}
            span={8}
            className="border-b-4 border-orange "
          >
            <p
              className={`text-center text-xl font-semibold text-grayBlack py-2 cursor-pointer ${
                userType === "customer" ? "bg-grayWhite" : ""
              }`}
            >
              Customer
            </p>
            <hr className={`h-2 w-full bg-orange ${userType === "customer" ? "visible" : "hidden"}`} />
          </Col>
          <Col
            onClick={() => setUserType("vendor")}
            span={8}
          >
            <p
              className={`text-center text-xl font-semibold text-grayBlack py-2 cursor-pointer ${
                userType === "vendor" ? "bg-grayWhite" : ""
              }`}
            >
              Vendor
            </p>
            <hr className={`h-2 w-full bg-orange ${userType === "vendor" ? "visible" : "hidden"}`} />
          </Col>
          {user?.userType === "superAdmin" && (
            <Col
              onClick={() => setUserType("admin")}
              span={8}
            >
              <p
                className={`text-center text-xl font-semibold text-grayBlack py-2 cursor-pointer ${
                  userType === "admin" ? "bg-grayWhite" : ""
                }`}
              >
                Admin
              </p>
              <hr className={`h-2 w-full bg-orange ${userType === "admin" ? "visible" : "hidden"}`} />
            </Col>
          )}
        </Row>
      </DashboardHeading>
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
