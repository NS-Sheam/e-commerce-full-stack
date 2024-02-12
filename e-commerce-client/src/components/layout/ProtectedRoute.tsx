import { Navigate } from "react-router-dom";
import { TUser, logOut, useCurrentToken } from "../../redux/features/auth/auth.Slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { ReactNode } from "react";
import { verifyToken } from "../../utils/verifyToken";

type TProtectedRouteProps = {
  children: ReactNode;
  role?: string;
};

const ProtectedRoute = ({ children, role }: TProtectedRouteProps) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(useCurrentToken);
  let user;
  if (token) {
    user = verifyToken(token);
  }
  if (role && (user as TUser)?.userType !== role) {
    console.log(role, user.userType);

    dispatch(logOut());
    return (
      <Navigate
        to="/auth"
        replace={true}
      />
    );
  }
  if (!token) {
    return (
      <Navigate
        to="/auth"
        replace={true}
      />
    );
  }
  return children;
};

export default ProtectedRoute;
