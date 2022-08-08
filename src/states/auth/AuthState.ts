import { User } from "firebase/auth";
import { atom } from "recoil";

export const authState = atom<User | null>({
  key: "authState",
  default: null,
  dangerouslyAllowMutability: true,
});
