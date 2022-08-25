import { ButtonV2 } from "@meshkorea/vroong-design-system-web";
import React, { useCallback } from "react";
import styled from "styled-components";

import FirebaseLoginService from "../services/FirebaseLoginService";

const LoginFormBox = () => {
  const { login } = new FirebaseLoginService();

  const handleLogin = useCallback(
    async (type: string) => {
      await login(type);
    },
    [login],
  );

  return (
    <Wrapper>
      <LoginBox>
        <LoginButton status="primary" onClick={() => handleLogin("google")}>
          Google 로그인
        </LoginButton>
        <LoginButton status="secondary" onClick={() => handleLogin("github")}>
          GitHub 로그인
        </LoginButton>
      </LoginBox>
    </Wrapper>
  );
};

const LoginButton = styled(ButtonV2)`
  width: 100%;
  height: 45px;
  margin: 8px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.palette.core.BackgroundSecondary};
`;

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 440px;
  padding: 40px;
  background-color: ${(props) => props.theme.palette.core.BackgroundPrimary};
  border-radius: 6px;
`;

export default LoginFormBox;
