import { ReactNode } from "react";

export type TUserPath = {
  path: string;
  name: string;
  icon?: ReactNode;
  element: ReactNode;
};
export type TUserRoute = {
  path: string;
  element: ReactNode;
};
export type TSidebarItem = {
  key: string;
  icon: ReactNode;
  label: ReactNode;
};
