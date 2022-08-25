import React from "react";
import styled from "styled-components";

import Repository from "../../models/Repository";
import useCollaboratorData from "../../queries/useCollaboratorData";

interface RepositoryInfoBoxProps {
  repository?: Repository;
}

const RepositoryInfoBox = ({ repository }: RepositoryInfoBoxProps) => {
  const { data, isLoading } = useCollaboratorData({
    owner: repository?.owner,
    repo: repository?.name,
    options: {
      keepPreviousData: true,
      // eslint-disable-next-line no-console
      onError: () => console.log("error"),
    },
  });

  return (
    <InfoBox>
      <h2>{repository?.name}</h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <CollaboratorArea>
          {data?.map((collaborator) => (
            <span key={collaborator.id}>
              <a href={collaborator.htmlUrl}>
                <CollaboratorAvatar
                  src={collaborator.avatarUrl}
                  alt={collaborator.userName}
                  title={collaborator.userName}
                />
              </a>
            </span>
          ))}
        </CollaboratorArea>
      )}
    </InfoBox>
  );
};

const InfoBox = styled.div`
  width: 500px;
`;

const CollaboratorArea = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const CollaboratorAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

export default RepositoryInfoBox;
