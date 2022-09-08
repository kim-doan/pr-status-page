import { format } from "date-fns";

import { PullRequestModel as PullRequestDTO } from "apiClients/prStatusApi";

import GitUser from "./GitUser";
import Label from "./Label";

export default class PullRequest {
  private source: PullRequestDTO;

  constructor(source: PullRequestDTO) {
    this.source = source;
  }

  public get id(): number {
    return this.source.id!;
  }

  public get nodeId(): string {
    return this.source.node_id!;
  }

  public get number(): number {
    return this.source.number!;
  }

  public get title(): string {
    return this.source.title!;
  }

  public get htmlUrl(): string {
    return this.source.html_url!;
  }

  public get user(): GitUser {
    return new GitUser(this.source.user!);
  }

  public get labels(): Label[] {
    return this.source.labels!.map((label) => new Label(label));
  }

  public get assignees(): GitUser[] {
    return this.source.assignees!.map((assignee) => new GitUser(assignee));
  }

  public get createdAt(): string {
    return format(new Date(this.source.created_at!), "yyyy-MM-dd");
  }

  public get updatedAt(): string {
    return format(new Date(this.source.updated_at!), "yyyy-MM-dd");
  }

  public get closedAt(): string | null {
    return this.source.closed_at
      ? format(new Date(this.source.closed_at!), "yyyy-MM-dd")
      : null;
  }

  public get imminentAt(): number | undefined {
    if (this.closedAt) {
      const btMs =
        new Date(this.createdAt).getTime() - new Date(this.closedAt).getTime();
      return Math.abs(btMs / (1000 * 60 * 60 * 24));
    }
  }

  public get body(): string {
    return this.source.body!;
  }
}
