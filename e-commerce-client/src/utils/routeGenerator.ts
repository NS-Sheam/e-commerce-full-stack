import { TUserPath, TUserRoute } from "../types/dashboardItem.type";

export const routesGenerator = (paths: TUserPath[]) => {
  const route = paths.reduce((acc: TUserRoute[], item) => {
    acc.push({
      path: item.path,
      element: item.element,
    });
    return acc;
  }, []);
  return route;
};
