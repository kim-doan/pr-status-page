import { atom } from "recoil";

import User from "modules/auth/models/User";

export const authState = atom<User | null>({
  key: "authState",
  default: undefined,
  dangerouslyAllowMutability: true,
});
