import { CollaboratorModel as CollaboratorDTO } from "apiClients/prStatusApi";

export default class Collaborator {
  private source: CollaboratorDTO;

  constructor(source: CollaboratorDTO) {
    this.source = source;
  }

  public get id(): number {
    return this.source.id!;
  }

  public get userName(): string {
    return this.source.login!;
  }

  public get avatarUrl(): string {
    return this.source.avatar_url!;
  }

  public get reposUrl(): string {
    return this.source.repos_url!;
  }

  public get htmlUrl(): string {
    return this.source.html_url!;
  }

  public get roleName(): string {
    return this.source.role_name!;
  }
}
