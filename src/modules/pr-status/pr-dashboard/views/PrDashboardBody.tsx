import React from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";

import PullRequest from "../models/PullRequest";
import usePullRequestData from "../queries/usePullRequestData";
import {
  closedPrState,
  imminentState,
  openPrState,
} from "../states/PullRequestState";

import PrCountAnalysisBox from "./components/PrCountAnalysisBox";
import PrGraphAnalysisBox from "./components/PrGraphAnalysisBox";

const PrDashboardBody = () => {
  const params = useParams();
  const { repoName } = params;

  const [, setOpenPr] = useRecoilState<PullRequest[]>(openPrState);
  const [, setClosedPr] = useRecoilState<PullRequest[]>(closedPrState);
  const [, setImminentPr] = useRecoilState<PullRequest[]>(imminentState);
  const { data, isLoading } = usePullRequestData({
    repoName,
    options: {
      keepPreviousData: true,
      onSuccess: (result) => {
        setOpenPr(result?.openItems ?? []);
        setClosedPr(result?.closedItems ?? []);
        setImminentPr(result?.imminentItems ?? []);
      },
    },
  });

  return (
    <Wrapper>
      <PrCountAnalysisBox
        isLoading={isLoading}
        openCount={data?.openCount}
        closedCount={data?.closedCount}
        imminentCount={data?.imminentCount}
      />
      <PrGraphAnalysisBox isLoading={isLoading} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

export default PrDashboardBody;
