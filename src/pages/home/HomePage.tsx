import * as React from "react";
import Div100vh from "react-div-100vh";
import styled from "styled-components";

import { PrDashboardBody } from "modules/pr-status/pr-dashboard";
import { RepositoryInfoHead } from "modules/repositories";

const HomePage = () => (
  <Div100vh>
    <Wrapper>
      <RepositoryInfoHead />
      <PrDashboardBody />
    </Wrapper>
  </Div100vh>
);

const Wrapper = styled.div`
  display: flex;
  flex: 1 1;
  flex-direction: column;
  gap: 50px;
  padding: 20px;
  padding-right: 100px;
  padding-left: 100px;
`;

export default HomePage;
