import { ButtonV2, Divider, IconV2 } from "@meshkorea/vroong-design-system-web";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useRecoilState } from "recoil";
import styled from "styled-components";

import Repository from "../models/Repository";
import { repositoriesState } from "../states/RepositoriesState";

import RepositoryInfoBox from "./components/RepositoryInfoBox";

const RepositoryInfoHead = () => {
  const params = useParams();
  const { repoName } = params;

  const [repositories] = useRecoilState<Repository[]>(repositoriesState);
  const [repository, setRepository] = useState<Repository>();

  useEffect(() => {
    setRepository(repositories.find((repo) => repo.name === repoName));
  }, [repoName, repositories]);

  return (
    <Wrapper>
      <Head>
        <RepositoryInfoBox repository={repository} />
        <ControlBox>
          <ButtonV2>
            <IconV2 name="REFRESH" />
          </ButtonV2>
          마지막 업데이트 : 16:06:51
        </ControlBox>
      </Head>
      <Divider width="100%" height="1px" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Head = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`;
const ControlBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  gap: 20px;
`;
export default RepositoryInfoHead;
