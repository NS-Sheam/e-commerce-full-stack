import { TbTruckDelivery } from "react-icons/tb";
import { CiHeadphones, CiTrophy } from "react-icons/ci";
import { MdOutlinePayment } from "react-icons/md";
const Features = () => {
  const featursItems = [
    {
      title: "Fastest Delivery",
      description: "Delivery in 24/H",
      icon: <TbTruckDelivery />,
    },
    {
      title: "24 Hours Return",
      description: "100% money-back guarantee",
      icon: <CiTrophy />,
    },
    {
      title: "Secure Payment",
      description: "Your money is safe",
      icon: <MdOutlinePayment />,
    },
    {
      title: "Support 24/7",
      description: "Live contact/message",
      icon: <CiHeadphones />,
    },
  ];
  return (
    <div
      style={{
        border: "1px solid #5f6c72",
      }}
      className="grid grid-cols-2 md:grid-cols-4 rounded-md mt-10 mx-4 p-4"
    >
      {featursItems.map((item, index) => (
        <div
          key={index}
          className="md:flex items-center justify-start gap-4 border-b border-gray-200"
        >
          <div className="text-2xl">{item.icon}</div>
          <div>
            <h4 className="text-grayBlack text-sm">{item.title}</h4>
            <p className="text-gray text-xs">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Features;
