
import {en} from './languages';
import Translator from './Translator';
import config from '../config';

export default (): Translator => {
  switch(config.lang) {
    case 'en':
    default:
      return en;
  }
}
 