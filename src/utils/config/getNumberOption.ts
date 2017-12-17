import { defaultTo } from 'ramda';

export default (value: any, defaultValue: number): number => {
  return defaultTo<any, number>(Number(value), defaultValue);
};