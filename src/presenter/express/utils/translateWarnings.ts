
import { Warning, TypeWarning, RequiredWarning } from 'rulr';
import {MinLengthWarning,MaxLengthWarning, NotMatchingPasswordWarning} from '../../../utils/validate';
import Translator from '../../../translator/Translator';

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
    case NotMatchingPasswordWarning: 
      return translator.notMatchingPasswordWarning(warning as NotMatchingPasswordWarning);
    default:
      return "no translation";
  }
};