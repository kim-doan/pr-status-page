import type { RepositoryModel as RepositoryModelDTO } from "apiClients/prStatusApi";

export default class Repository {
  private source: RepositoryModelDTO;

  constructor(source: RepositoryModelDTO) {
    this.source = source;
  }

  public get id(): number {
    return this.source.id!;
  }

  public get nodeId(): string {
    return this.source.node_id!;
  }

  public get name(): string {
    return this.source.name!;
  }

  public get fullName(): string {
    return this.source.full_name!;
  }

  public get owner(): string {
    return this.source.owner?.login ?? "";
  }

  public get private(): boolean {
    // eslint-disable-next-line no-underscore-dangle
    return this.source._private!;
  }

  public get description(): string {
    return this.source.description ?? "";
  }

  public get url(): string {
    return this.source.url!;
  }

  public get createAt(): string {
    return this.source.create_at!;
  }

  public get updatedAt(): string {
    return this.source.updated_at!;
  }

  public get pushedAt(): string {
    return this.source.pushed_at!;
  }

  public get hasIssue(): boolean {
    return this.source.has_issue!;
  }

  public get disabled(): boolean {
    return this.source.disabled!;
  }

  public get defaultBranch(): string {
    return this.source.default_branch!;
  }
}
