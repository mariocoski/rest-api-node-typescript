import {Rule, Warning,Warnings, checkBool, Path} from 'rulr';

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
  new NotMatchingPasswordWarning(data.password, path, data.password_confirmation);

export const validateMatchingPasswords = (data: any, path: Path)=> {
  return (data.password && data.password_confirmation && data.password === data.password_confirmation) ? [] : [createNotMatchingPasswordWarning(data,path)];
};

export const minLength = (length: number, rule?: Rule): Rule => (data, path) => {
  return data.length >= length ? (rule? rule(data,path) : []) : [createMinLengthWarning(data, path, length)];
}

export const maxLength = (length: number, rule?: Rule): Rule => (data, path) => {
  return data.length <= length ? (rule? rule(data,path) : []) : [createMaxLengthWarning(data, path, length)];
}
  