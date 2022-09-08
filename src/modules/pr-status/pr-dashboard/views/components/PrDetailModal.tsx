import { ModalV2 } from "@meshkorea/vroong-design-system-web";
import React, { useMemo } from "react";
import { useRecoilState } from "recoil";

import PullRequest from "../../models/PullRequest";
import {
  closedPrState,
  imminentState,
  openPrState,
} from "../../states/PullRequestState";

import PrDetailList from "./PrDetailList";

interface PrDetailModalProps {
  isOpen: boolean;
  modalType: "open" | "closed" | "imminent";
  onClose: () => void;
}

const PrDetailModal = ({ isOpen, modalType, onClose }: PrDetailModalProps) => {
  const [openPr] = useRecoilState<PullRequest[]>(openPrState);
  const [closedPr] = useRecoilState<PullRequest[]>(closedPrState);
  const [imminentPr] = useRecoilState<PullRequest[]>(imminentState);

  const modalState = useMemo(() => {
    switch (modalType) {
      case "open":
        return {
          title: "오픈된 이슈",
          items: openPr,
        };
      case "closed":
        return {
          title: "종료된 이슈",
          items: closedPr,
        };
      case "imminent":
      default:
        return {
          title: "기한 임박 이슈",
          items: imminentPr,
        };
    }
  }, [closedPr, imminentPr, modalType, openPr]);

  return (
    <div>
      {isOpen && (
        <ModalV2
          title={modalState.title}
          size="lg"
          onClose={onClose}
          onConfirm={onClose}
          confirmButtonLabel="닫기"
          closeOnClickOutside
        >
          <PrDetailList data={modalState.items} />
        </ModalV2>
      )}
    </div>
  );
};

export default PrDetailModal;
