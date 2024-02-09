import { useGetCustomersQuery } from "../redux/features/userManagement/userManagement.api";

const Home = () => {
  const { data: customers } = useGetCustomersQuery(undefined);
  console.log(customers);

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
