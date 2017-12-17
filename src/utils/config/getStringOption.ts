import { defaultTo } from 'ramda';

export default (value: any, defaultValue = ''): string => {
  return defaultTo<any,string>(value, defaultValue);
};