import React from "react";
import styled from "styled-components";

import GraphCard from "components/Card/GraphCard";

interface PrGraphAnalysisBoxProps {
  isLoading: boolean;
}

const PrGraphAnalysisBox = ({ isLoading }: PrGraphAnalysisBoxProps) => (
  <div>
    {isLoading}
    <Wrapper>
      <GraphCard />
    </Wrapper>
  </div>
);

const Wrapper = styled.div`
  display: flex;
  gap: 50px;
`;

export default PrGraphAnalysisBox;
