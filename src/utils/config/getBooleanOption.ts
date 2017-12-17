import { defaultTo } from 'ramda';
import * as boolean from 'boolean';

export default (value: any, defaultValue: boolean = true): boolean => {
  return boolean(defaultTo<any, boolean>(value, defaultValue));
};
