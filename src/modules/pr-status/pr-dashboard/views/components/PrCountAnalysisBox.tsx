import { BaseTheme } from "@meshkorea/vroong-design-system-web";
import React, { useCallback } from "react";
import styled from "styled-components";

import NumberCard from "components/Card/NumberCard";
import NumberCardSkeleton from "components/Card/NumberCardSkeleton";

import PrDetailModal from "./PrDetailModal";

interface PrCountAnalysisBoxProps {
  isLoading: boolean;
  openCount?: number;
  closedCount?: number;
  imminentCount?: number;
}
const PrCountAnalysisBox = ({
  isLoading,
  openCount,
  closedCount,
  imminentCount,
}: PrCountAnalysisBoxProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [modalType, setModalType] = React.useState<
    "open" | "closed" | "imminent"
  >("open");

  const handleCardClick = useCallback(
    (type: "open" | "closed" | "imminent") => {
      setIsOpen(true);
      setModalType(type);
    },
    [],
  );

  const handleModalClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <div>
      <PrDetailModal
        isOpen={isOpen}
        modalType={modalType}
        onClose={handleModalClose}
      />
      {isLoading === false ? (
        <Wrapper>
          <NumberCard
            title="오픈된 이슈"
            iconName="ADD"
            value={openCount}
            iconBackColor={BaseTheme.palette.core.BaseAccent}
            onClick={() => handleCardClick("open")}
          />
          <NumberCard
            title="종료된 이슈"
            iconName="DONE"
            value={closedCount}
            iconBackColor={BaseTheme.palette.core.BaseSuccess}
            onClick={() => handleCardClick("closed")}
          />
          <NumberCard
            title="기한 임박 이슈"
            iconName="WARNING"
            value={imminentCount}
            iconBackColor={BaseTheme.palette.core.BaseCritical}
            onClick={() => handleCardClick("imminent")}
          />
        </Wrapper>
      ) : (
        <Wrapper>
          <NumberCardSkeleton />
          <NumberCardSkeleton />
          <NumberCardSkeleton />
        </Wrapper>
      )}
    </div>
  );
};

const Wrapper = styled.div`
  display: flex;
  gap: 50px;
`;

export default PrCountAnalysisBox;
