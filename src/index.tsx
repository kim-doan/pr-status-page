import "core-js/stable";
import "regenerator-runtime/runtime";
import "url-search-params-polyfill";

import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";

import App from "./App";

const container = document.getElementById("app");

ReactDOM.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
  container,
);
