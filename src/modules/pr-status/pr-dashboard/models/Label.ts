import { LabelModel as LabelDTO } from "apiClients/prStatusApi";

export default class Label {
  private source: LabelDTO;

  constructor(source: LabelDTO) {
    this.source = source;
  }

  public get id(): number {
    return this.source.id!;
  }

  public get url(): string {
    return this.source.url!;
  }

  public get name(): string {
    return this.source.name!;
  }

  public get color(): string {
    return this.source.color!;
  }

  public get default(): boolean {
    // eslint-disable-next-line no-underscore-dangle
    return this.source._default!;
  }

  public get description(): string {
    return this.source.description!;
  }
}
