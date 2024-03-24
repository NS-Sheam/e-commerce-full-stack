import { Col, Row } from "antd";
import ShopSearchBar from "../Shop/ShopSearchBar";
import DashboardHeading from "../ui/DashboardHeading";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/auth.Slice";

type TUserHeadingProps = {
  userType: string;
  setUserType: React.Dispatch<React.SetStateAction<string>>;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

const UserHeading = ({ userType, setUserType, setSearchTerm }: TUserHeadingProps) => {
  const user = useAppSelector(selectCurrentUser);
  return (
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
  );
};

export default UserHeading;
