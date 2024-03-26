import { MagnifyingGlass } from "react-loader-spinner";

const LoadingComponent = () => {
  return (
    <MagnifyingGlass
      visible={true}
      height="80"
      width="80"
      ariaLabel="magnifying-glass-loading"
      wrapperStyle={{}}
      wrapperClass="magnifying-glass-wrapper"
      glassColor="#c0efff"
      color="#fa8232"
    />
  );
};

export default LoadingComponent;
