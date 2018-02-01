
import { Warning, TypeWarning, RequiredWarning, RestrictedKeysWarning } from 'rulr';
import {MinLengthWarning,MaxLengthWarning, NotMatchingPasswordWarning, InvalidEmailWarning} from '../../../utils/validate';
import Translator from '../../../translator/Translator';
 /* istanbul ignore next */
export default (translator: Translator, warning: Warning) => {
  switch (warning.constructor) {
    case MinLengthWarning:
      return translator.minLengthWarning(warning as MinLengthWarning);
    case MaxLengthWarning:
      return translator.minLengthWarning(warning as MinLengthWarning);
    case TypeWarning:
      return translator.typeWarning(warning as TypeWarning);
    case RequiredWarning:
      return translator.requiredWarning(warning as RequiredWarning);
    case RestrictedKeysWarning:
      return translator.restrictedKeysWarning(warning as RestrictedKeysWarning);
    case InvalidEmailWarning:
      return translator.invalidEmailWarning(warning as InvalidEmailWarning);
    case NotMatchingPasswordWarning: 
      return translator.notMatchingPasswordWarning(warning as NotMatchingPasswordWarning);
    default:
      return translator.warning(warning);
  }
};