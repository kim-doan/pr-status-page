import type { User as UserDTO } from "firebase/auth";

export default class User {
  private source: UserDTO;

  constructor(source: UserDTO) {
    this.source = source;
  }

  public get id(): string {
    return this.source.uid!;
  }

  public get displayName(): string {
    return this.source.displayName!;
  }

  public get email(): string {
    return this.source.email ?? "";
  }

  public get phoneNumber(): string {
    return this.source.phoneNumber ?? "";
  }

  public get photoURL(): string {
    return this.source.photoURL ?? "";
  }

  public get providerId(): string {
    return this.source.providerId!;
  }
}
