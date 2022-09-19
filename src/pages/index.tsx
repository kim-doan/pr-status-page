import Layout from "Layout";
import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { PrivateRoute } from "lib/router";

import Error404Page from "./common/error/Error404Page";
import LoginPage from "./login/LoginPage";

const HomePage = lazy(() => import("./home/HomePage"));

const Pages = () => (
  <BrowserRouter>
    <Suspense fallback={<div />}>
      <Layout>
        <Routes>
          {/* 인증 여부 상관 없이 접속 가능한 페이지 */}

          {/* 인증을 거치지 않아야만 하는 페이지 */}
          <Route element={<PrivateRoute authentication={false} />}>
            <Route path="login" element={<LoginPage />} />
          </Route>

          {/* 인증을 반드시 해야만 접속 가능한 페이지 */}
          <Route element={<PrivateRoute authentication />}>
            <Route path="/" />
            <Route path="/meshkorea/:repoName" element={<HomePage />} />
          </Route>

          {/* 인증/권한 여부와 상관 없이 접근 가능한 Error 페이지 정의 */}
          <Route path="/*" element={<Error404Page />} />
        </Routes>
      </Layout>
    </Suspense>
  </BrowserRouter>
);

export default Pages;
