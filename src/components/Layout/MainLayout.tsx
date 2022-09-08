import {
  GlobalNavigationBar,
  LeftNavigationBar,
} from "@meshkorea/vroong-design-system-web";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";

import { FirebaseAuth } from "core/Firebase";
import { authState, User } from "modules/auth";
import {
  repositoriesMenuState,
  repositoriesState,
  Repository,
} from "modules/repositories";
import useRepositoryData from "modules/repositories/queries/useRepositoryData";

import menus from "./menus";
import PageWrapper from "./PageWrapper";

const MainLayout: React.FC = ({ children }) => {
  const [auth, setAuth] = useRecoilState<User | null>(authState);
  const [, setRepositories] = useRecoilState<Repository[]>(repositoriesState);
  const repositoriesMenu = useRecoilValue(repositoriesMenuState);
  const [isLnbOpen, setIsLnbOpen] = useState(false);
  const { pathname } = useLocation();

  useRepositoryData({
    options: {
      keepPreviousData: true,
      // eslint-disable-next-line no-console
      onError: () => console.log("error"),
      onSuccess: (data) => {
        setRepositories(data);
      },
    },
  });

  useEffect(() => {
    menus[0].subMenus = repositoriesMenu;
  }, [repositoriesMenu]);

  const handleLnbToggle = useCallback(() => {
    setIsLnbOpen((open) => !open);
  }, []);

  const handleLogout = useCallback(async () => {
    await FirebaseAuth.signOut();
    setAuth(null);
  }, [setAuth]);

  const menu = useMemo(
    () => [
      {
        key: "account",
        label: (
          <>
            <strong>{auth?.displayName}</strong> 님
          </>
        ),
        withArrow: true,
        subMenu: [
          {
            key: "logout",
            label: "로그아웃",
            onClick: handleLogout,
          },
        ],
      },
    ],
    [auth?.displayName, handleLogout],
  );

  return (
    <PageWrapper>
      <GlobalNavigationBar
        // logo={<Logo margin="14px 0 10px 4px" />}
        onLnbToggle={handleLnbToggle}
        menu={menu}
      />
      <Section>
        <LeftNavigationBar
          isOpen={isLnbOpen}
          onToggle={handleLnbToggle}
          currentPath={pathname}
          menus={menus}
        />
        <Main>{children}</Main>
      </Section>
    </PageWrapper>
  );
};

const Section = styled.section`
  display: flex;
  width: 100%;
  height: 100%;
  overflow: auto;
`;

const Main = styled.main`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
`;

export default MainLayout;
