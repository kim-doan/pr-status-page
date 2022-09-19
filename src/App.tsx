import { BaseTheme } from "@meshkorea/vroong-design-system-web";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GlobalStyle from "GlobalStyle";
import Pages from "pages";
import React from "react";
import { useRecoilState } from "recoil";
import { ThemeProvider } from "styled-components";

import { FirebaseAuth } from "core/Firebase";
import useDidMount from "lib/hooks/useDidMount";
import {
  initialSettingState,
  authState,
  InitializeSettingModal,
  User,
} from "modules/auth";
import FirebaseLoginService from "modules/auth/services/FirebaseLoginService";
import "react-perfect-scrollbar/dist/css/styles.css";
import "sanitize.css/sanitize.css";
import "./App.css";

const queryClient = new QueryClient();

const App = () => {
  const { checkActiveUser } = new FirebaseLoginService();
  const [, setAuth] = useRecoilState<User | null>(authState);
  const [isInitialSetting, setIsInitialSetting] =
    useRecoilState<boolean>(initialSettingState);

  useDidMount(() => {
    FirebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        setAuth(new User(user));

        const isActive = await checkActiveUser(user);

        if (!isActive) {
          setIsInitialSetting(true);
        } else {
          setIsInitialSetting(false);
        }
      } else {
        setAuth(null);
      }
    });
  });

  return (
    <ThemeProvider theme={BaseTheme}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <Pages />
        <InitializeSettingModal isOpen={isInitialSetting} />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
