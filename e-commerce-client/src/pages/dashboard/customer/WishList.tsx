import { Col, Row } from "antd";
import DashboardHeading from "../../../components/ui/DashboardHeading";
import { useGetMeQuery } from "../../../redux/features/userManagement/userManagement.api";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CommonBtn from "../../../components/ui/CommonBtn";
/**
 * TODO:
 * 1. Don't allow to add product in wishlist and shopping cart if user is not logged in
 */
const WishList = () => {
  const { data: customerData } = useGetMeQuery(undefined);
  const wishList = customerData?.wishList;
  const navigate = useNavigate();
  const handleNavigateToProduct = (id: string) => {
    navigate(`/product/${id}`);
  };
  return (
    <div className="p-4 space-y-4">
      <DashboardHeading>
        <h3>Wishlist</h3>
      </DashboardHeading>
      <Row gutter={[16, 16]}>
        {wishList?.length ? (
          wishList?.map((product) => (
            <Col
              key={product._id}
              span={24}
              style={{
                border: "1px solid #e5e5e5",
                padding: "1rem",
              }}
              className="shadow-md hover:shadow-lg transition duration-300 ease-in-out cursor-pointer"
              onClick={() => handleNavigateToProduct(product._id)}
            >
              <Row
                gutter={[16, 16]}
                justify="center"
                align="middle"
              >
                <Col
                  span={24}
                  md={{ span: 8 }}
                >
                  <div className="md:flex items-center justify-start gap-2">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full md:w-32 md:h-20 text-grayBlack"
                    />
                    <span className="text-2xl md:text-xl font-semibold">{product.name}</span>
                  </div>
                </Col>
                <Col
                  span={24}
                  md={{ span: 4 }}
                >
                  <span className="text-[#2DA5F3] font-bold text-xl">${product.price}</span>
                </Col>
                <Col
                  span={24}
                  md={{ span: 4 }}
                >
                  <span className="font-bold text-green-500">IN STOCK</span>
                </Col>

                <Col
                  span={24}
                  md={{ span: 8 }}
                  className="flex items-center justify-center gap-2"
                >
                  <CommonBtn>
                    Add to Cart <FaShoppingCart />
                  </CommonBtn>
                </Col>
              </Row>
            </Col>
          ))
        ) : (
          <p className="text-grayBlack font-semibold">No product in wishlist</p>
        )}
      </Row>
    </div>
  );
};

export default WishList;
