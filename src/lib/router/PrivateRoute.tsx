import React, { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";

import { authState, User } from "modules/auth";

/*
 ** 로그인한 사용자가 URL을 통해 로그인 페이지로 접근했을 경우 접근할 수 없도록 방지
 ** 로그인하지 않은 사용자가 회원만 접근 가능한 페이지에 URL을 통해 진입했을 경우 접근할 수 없도록 방지
 */

interface PrivateRouteProps {
  authentication: boolean; // true : 인증을 해야 접속 가능, false : 인증을 반디스 안해야만 접속
}

const PrivateRoute = ({
  authentication,
}: PrivateRouteProps): ReactElement | null => {
  const [auth] = useRecoilState<User | null>(authState);

  // eslint-disable-next-line no-console
  console.log("auth", auth);

  /**
   * 로그인 했는지 여부
   */
  if (authentication) {
    // 인증이 필요한 페이지
    return auth === null ? <Navigate to="/login" /> : <Outlet />;
  }

  // 인증이 불필요한 페이지
  return auth === null ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
