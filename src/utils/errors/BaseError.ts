
export default class BaseError implements Error {
  public readonly name: string;
  public readonly message: string;
  public readonly stack?: string;

  constructor(message: string = 'Error'){
    this.message = message;
    this.name = (<any>this.constructor).name;
    this.stack = (new Error(this.message)).stack;
  }
}
