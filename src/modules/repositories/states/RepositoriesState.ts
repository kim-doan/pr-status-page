/* eslint-disable array-callback-return */
import { atom, selector } from "recoil";

import Repository from "../models/Repository";

export const repositoriesState = atom<Repository[]>({
  key: "repositoriesState",
  default: [],
  dangerouslyAllowMutability: true,
});

export const repositoriesMenuState = selector({
  key: "repositoriesMenuState",
  get: ({ get }) => {
    const repositories = get(repositoriesState);

    let repositoriesMenu: any[] = [];

    repositories.map((repository) => {
      repositoriesMenu = [
        ...repositoriesMenu,
        { name: repository.name, url: `${repository.fullName}` },
      ];
    });

    return repositoriesMenu;
  },
});
