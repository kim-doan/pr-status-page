import { UserModel as GitUserDTO } from "apiClients/prStatusApi";

export default class GitUser {
  private source: GitUserDTO;

  constructor(source: GitUserDTO) {
    this.source = source;
  }

  public get name(): string {
    return this.source.login!;
  }

  public get avatarUrl(): string {
    return this.source.avatar_url!;
  }

  public get type(): string {
    return this.source.type!;
  }

  public get siteAdmin(): boolean {
    return this.source.site_admin!;
  }
}
