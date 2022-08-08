import { atom } from "recoil";

import { CharacterResultResults } from "apiClients/characterSampleApi";

export const selectCharacterState = atom<CharacterResultResults>({
  key: "selectCharacterState",
  default: {
    id: 0,
    name: "NaN",
    status: "NaN",
    type: "NaN",
  },
});
