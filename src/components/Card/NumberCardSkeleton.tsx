import { Card } from "@meshkorea/vroong-design-system-web";
import React from "react";
import styled, { keyframes } from "styled-components";

const NumberCardSkeleton = () => (
  <CardWrapper>
    <StyledCard radius="5px">
      <Contents>
        <TextContents>
          <SkeletonBar width="100%" height="20px" flex={1} />
          <SkeletonBar width="50%" height="20px" flex={1} />
        </TextContents>
        <IconContents>
          <SkeletonImg />
        </IconContents>
      </Contents>
    </StyledCard>
  </CardWrapper>
);

const CardWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  color: #121828;
  box-shadow: 0 1px 1px rgb(100 116 139 / 6%), 0 1px 2px rgb(100 116 139 / 10%);
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
`;

const StyledCard = styled(Card)`
  padding: 32px 24px;
`;

const Contents = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: calc(100% + 24px);
  height: 100%;
  margin-top: -24px;
  margin-left: -24px;

  > * {
    padding-top: 24px;
    padding-left: 24px;
  }
`;

const TextContents = styled.div`
  box-sizing: border-box;
  flex: 1;
  flex-direction: row;
  margin: 0;

  span {
    margin: 0;
    margin-bottom: 0.35em;
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 2.5;
    color: #65748b;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  h4 {
    margin: 0;
    font-size: 2rem;
    font-weight: 700;
    line-height: 1.375;
    color: #121828;
  }
`;

const IconContents = styled.div`
  box-sizing: border-box;
  flex-direction: row;
  margin: 0;
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

const SkeletonImg = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
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
  margin: auto 6px;
  margin-bottom: 0.35em;
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
export default NumberCardSkeleton;
