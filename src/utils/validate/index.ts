import {Rule, Warning,Warnings,checkRegex, checkBool, Path} from 'rulr';

export class InvalidEmailWarning extends Warning {
  constructor(data: any, path: Path) {
    super(data, path);
  }
}

export class MinLengthWarning extends Warning {
  constructor(data: any, path: Path, public length: number) {
    super(data, path);
  }
}


export class MaxLengthWarning extends Warning {
  constructor(data: any, path: Path, public length: number) {
    super(data, path);
  }
}

export class NotMatchingPasswordWarning extends Warning {
  constructor(data: any, path: Path) {
    super(data, path);
  }
}

export const createMinLengthWarning = (data: any,path: string[], length: number): Warning =>
  new MinLengthWarning(data, path, length);

export const createMaxLengthWarning = (data: any,path: string[], length: number): Warning =>
  new MaxLengthWarning(data, path, length);

export const createNotMatchingPasswordWarning = (data: any,path: string[]): Warning =>
  new NotMatchingPasswordWarning(data.password, path);


export const createInvalidEmailWarning = (data: any,path: string[]): Warning =>
  new InvalidEmailWarning(data.password, path);

export const validateMatchingPasswords = (data: any, path: Path)=> {
  return (data.password && data.password_confirmation && data.password === data.password_confirmation) ? [] : [createNotMatchingPasswordWarning(data,path)];
};

export const minLength = (length: number, rule?: Rule): Rule => (data, path) => {
  return data.length >= length ? (rule? rule(data,path) : []) : [createMinLengthWarning(data, path, length)];
}

export const maxLength = (length: number, rule?: Rule): Rule => (data, path) => {
  return data.length <= length ? (rule? rule(data,path) : []) : [createMaxLengthWarning(data, path, length)];
}

export const isEmail = checkRegex(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, createInvalidEmailWarning)


  