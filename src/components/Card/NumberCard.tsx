import { Card, IconV2 } from "@meshkorea/vroong-design-system-web";
import { IconInterface } from "@meshkorea/vroong-design-system-web/dist/components/IconV2/icons";
import React from "react";
import styled from "styled-components";

export interface NumberCardProps {
  title: string;
  value?: number;
  iconName?: keyof IconInterface;
  iconBackColor?: string;
  onClick?: () => void;
}

const NumberCard = ({
  title,
  value = 0,
  iconName = "ACCOUNT_BOX",
  iconBackColor,
  onClick,
}: NumberCardProps) => (
  <CardWrapper onClick={onClick}>
    <StyledCard radius="5px">
      <Contents>
        <TextContents>
          <span>{title}</span>
          <h4>{value.toLocaleString()}</h4>
        </TextContents>
        <IconContents>
          <IconWrapper iconBackColor={iconBackColor}>
            <IconV2 name={iconName} />
          </IconWrapper>
        </IconContents>
      </Contents>
    </StyledCard>
  </CardWrapper>
);

const CardWrapper = styled.div<{ onClick?: () => void }>`
  flex: 1;
  overflow: hidden;
  color: #121828;
  box-shadow: 0 1px 1px rgb(100 116 139 / 6%), 0 1px 2px rgb(100 116 139 / 10%);
  cursor: ${(props) => (props.onClick ? "pointer" : "default")};
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

const IconWrapper = styled.div<{ iconBackColor?: string }>`
  position: relative;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  overflow: hidden;
  font-size: 1.25rem;
  line-height: 1;
  color: #f9fafc;
  background-color: ${(props) => props.iconBackColor || "#121828"};
  border-radius: 50%;
  user-select: none;
`;

export default NumberCard;
