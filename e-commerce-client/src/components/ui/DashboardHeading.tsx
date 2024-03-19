import { ReactNode } from "react";

const DashboardHeading = ({ children }: { children: ReactNode }) => {
  return <div className="md:flex justify-between items-center w-full">{children}</div>;
};

export default DashboardHeading;
