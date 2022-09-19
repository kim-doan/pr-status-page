import { atom } from "recoil";

import User from "modules/auth/models/User";

export const authState = atom<User | null>({
  key: "authState",
  default: undefined,
  dangerouslyAllowMutability: true,
});

export const initialSettingState = atom<boolean>({
  key: "initialSetting",
  default: false,
  dangerouslyAllowMutability: true,
});

export const displayNameState = atom<string>({
  key: "displayNameState",
  default: "",
  dangerouslyAllowMutability: true,
});
