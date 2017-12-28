import {v4} from 'uuid';

export default (): string => {
  return v4().replace(/\-/g, '');
}

