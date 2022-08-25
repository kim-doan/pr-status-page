import React from "react";
import { useRecoilState } from "recoil";

import { EmptyLayout, MainLayout } from "components/Layout";
import { authState, User } from "modules/auth";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [auth] = useRecoilState<User | null>(authState);

  return (
    <div>
      {auth === null ? (
        <EmptyLayout>{children}</EmptyLayout>
      ) : (
        <MainLayout>{children}</MainLayout>
      )}
    </div>
  );
};

export default Layout;
