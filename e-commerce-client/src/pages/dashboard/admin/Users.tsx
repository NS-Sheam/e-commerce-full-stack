import { useState } from "react";
import ShopSearchBar from "../../../components/Shop/ShopSearchBar";
import DashboardHeading from "../../../components/ui/DashboardHeading";
import { Col, Row } from "antd";
import { useAppSelector } from "../../../redux/hooks";
import { selectCurrentUser } from "../../../redux/features/auth/auth.Slice";
import { useGetAdminsQuery } from "../../../redux/features/admin/admin.api";
import { useGetVendorsQuery } from "../../../redux/features/vendor/vendor.api";
import { useGetCustomersQuery } from "../../../redux/features/userManagement/userManagement.api";

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const user = useAppSelector(selectCurrentUser);

  const {
    data: adminsData,
    isLoading: isALoading,
    isFetching: isAFetching,
  } = useGetAdminsQuery([
    {
      name: "limit",
      value: 1 + "",
    },
  ]);
  const { data: vendorsData, isLoading: isVLoading, isFetching: isVFetching } = useGetVendorsQuery(undefined);
  const { data: customersData, isLoading: isCLoading, isFetching: isCFetching } = useGetCustomersQuery(undefined);

  const [userType, setUserType] = useState("customer");

  if (isALoading || isVLoading || isCLoading || isAFetching || isVFetching || isCFetching) {
    return <div>Loading...</div>;
  }

  console.log(adminsData);

  return (
    <div>
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
    </div>
  );
};

export default Users;
