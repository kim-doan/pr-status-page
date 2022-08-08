import {
  MyButton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@kim-doan/wdyj-design-system-web";
import { signInWithPopup, User } from "firebase/auth";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { authState } from "states/auth";
import { selectCharacterState } from "states/character/CharacterState";

import { CharacterResultResults } from "apiClients/characterSampleApi";
import { FirebaseAuth, GoogleAuth } from "core/Firebase";
import useCharacterData from "lib/queries/character/useCharacterData";

const HomePage = () => {
  const [page, setPage] = useState<number>(1);
  const [selectCharacter, setSelectCharacter] =
    useRecoilState<CharacterResultResults>(selectCharacterState);
  const [auth, setAuth] = useRecoilState<User | null>(authState);

  const { data, isPreviousData, isLoading, isError } = useCharacterData({
    page,
    options: {
      keepPreviousData: true,
      // eslint-disable-next-line no-console
      onError: () => console.log("error"),
      // eslint-disable-next-line no-console
      onSuccess: () => console.log("success"),
    },
  });

  const handleSelectCharacter = (character: CharacterResultResults) => {
    setSelectCharacter(character);
  };

  const handleGoogleLogin = async () => {
    await signInWithPopup(FirebaseAuth, GoogleAuth);
  };

  const handleLogout = async () => {
    await FirebaseAuth.signOut();
    setAuth(null);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div>
      {auth === null ? (
        <button onClick={handleGoogleLogin} type="button">
          구글 로그인 테스트
        </button>
      ) : (
        <button onClick={handleLogout} type="button">
          로그아웃
        </button>
      )}
      <MyButton
        disabled={page === 1}
        onClick={() => setPage((prev) => prev - 1)}
      >
        이전
      </MyButton>
      <MyButton
        disabled={isPreviousData || !data?.info?.next}
        onClick={() => setPage((prev) => prev + 1)}
      >
        다음
      </MyButton>
      <span>
        선택한 데이터는 다음과 같습니다. {selectCharacter.id}{" "}
        {selectCharacter.name} {selectCharacter.status} {selectCharacter?.type}
      </span>
      <Table>
        <Thead>
          <Tr>
            <Th width="180px">ID</Th>
            <Th width="180px">캐릭터명</Th>
            <Th width="180px">상태</Th>
            <Th width="180px">유형</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.results?.map((character) => (
            <Tr
              key={character.id}
              onClick={() => handleSelectCharacter(character)}
            >
              <Td width="180px">{character.id}</Td>
              <Td width="180px">{character.name}</Td>
              <Td width="180px">{character.status}</Td>
              <Td width="180px">{character.type}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default HomePage;
