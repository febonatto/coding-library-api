export abstract class Entity<T> {
  protected readonly _id: string;
  protected props: T;

  constructor(props: T) {
    this._id = crypto.randomUUID();
    this.props = props;
  }

  get id(): string {
    return this._id;
  }
}
