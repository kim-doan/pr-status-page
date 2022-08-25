import { BaseTheme } from "@meshkorea/vroong-design-system-web";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GlobalStyle from "GlobalStyle";
import Pages from "pages";
import React from "react";
import { useRecoilState } from "recoil";
import { ThemeProvider } from "styled-components";

import { FirebaseAuth } from "core/Firebase";
import useDidMount from "lib/hooks/useDidMount";
import { authState, User } from "modules/auth";

import "sanitize.css/sanitize.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "./App.css";

const queryClient = new QueryClient();

const App = () => {
  const [, setAuth] = useRecoilState<User | null>(authState);

  useDidMount(() => {
    FirebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        setAuth(new User(user));
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
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
