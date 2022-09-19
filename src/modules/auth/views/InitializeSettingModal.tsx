import {
  ModalV2,
  TextInputV2,
  TooltipV2,
} from "@meshkorea/vroong-design-system-web";
import React, { useCallback } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";

import { FirebaseAuth } from "core/Firebase";

import User from "../models/User";
import FirebaseLoginService from "../services/FirebaseLoginService";
import {
  authState,
  displayNameState,
  initialSettingState,
} from "../states/auth/AuthState";

interface InitializeSettingModal {
  isOpen: boolean;
}

const InitializeSettingModal = ({ isOpen }: InitializeSettingModal) => {
  const { changeDisplayName } = new FirebaseLoginService();
  const [displayName, setDisplayName] =
    useRecoilState<string>(displayNameState);
  const [, setIsInitialSetting] = useRecoilState<boolean>(initialSettingState);
  const [, setAuth] = useRecoilState<User | null>(authState);

  const handleConfirm = useCallback(async () => {
    if (displayName) {
      changeDisplayName(displayName);
      setIsInitialSetting(false);
      await FirebaseAuth.signOut();
      setAuth(null);
    }
  }, [changeDisplayName, displayName, setAuth, setIsInitialSetting]);

  return (
    <div>
      {isOpen && (
        <ModalV2
          title="초기 설정"
          size="sm"
          closeOnClickOutside
          height="500px"
          onConfirm={handleConfirm}
        >
          <ContentsWrapper>
            <Column>
              <div>GitHub 닉네임</div>
              <TooltipV2>GitHub 닉네임을 입력해주세요.(e.g kim-doan)</TooltipV2>
              <TextInputV2
                value={displayName}
                onChange={(value) => setDisplayName(value)}
              />
            </Column>
          </ContentsWrapper>
        </ModalV2>
      )}
    </div>
  );
};

export default InitializeSettingModal;

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 20px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;
