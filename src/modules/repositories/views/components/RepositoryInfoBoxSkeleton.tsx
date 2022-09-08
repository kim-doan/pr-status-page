import React from "react";
import styled, { keyframes } from "styled-components";

const RepositoryInfoBoxSkeleton = () => (
  <InfoBox>
    <SkeletonBar width="100%" height="20px" flex={1} />
    <CollaboratorArea>
      {[...Array<number>(10).keys()].map((num) => (
        <SkeletonImg key={num} />
      ))}
    </CollaboratorArea>
  </InfoBox>
);

const InfoBox = styled.div`
  width: 500px;
`;

const CollaboratorArea = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const loading = keyframes`
      0% {
          transform: translateX(0);
      }
  
      50%,
      100% {
          transform: translateX(460px);
      }
  `;

interface SkeletonBarProps {
  width?: string;
  height?: string;
  flex?: number;
}

const SkeletonBar = styled.div<SkeletonBarProps>`
  position: relative;
  flex: ${(props) => props.flex};
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "100%"};
  margin-top: 1.5em;
  margin-bottom: 1.5em;
  overflow: hidden;
  background: #f2f2f2;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 100%;
    background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
    animation: ${loading} 2s infinite linear;
  }
`;

const SkeletonImg = styled.div`
  position: relative;
  width: 32px;
  height: 32px;
  overflow: hidden;
  background: #f2f2f2;
  border-radius: 50%;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 100%;
    background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
    animation: ${loading} 2s infinite linear;
  }
`;

export default RepositoryInfoBoxSkeleton;
