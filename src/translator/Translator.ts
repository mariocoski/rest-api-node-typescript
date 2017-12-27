import {MinLengthWarning, MaxLengthWarning, NotMatchingPasswordWarning} from '../utils/validate';
import {RequiredWarning,TypeWarning} from 'rulr';

export default interface Translator {
  readonly unauthorized: () => string;
  readonly forbidden: () => string;
  readonly minLengthWarning: (warning: MinLengthWarning) => string;
  readonly maxLengthWarning: (warning: MaxLengthWarning) => string;
  readonly requiredWarning: (warning: RequiredWarning) => string;
  readonly typeWarning: (warning: TypeWarning) => string;
  readonly notMatchingPasswordWarning: (warning: NotMatchingPasswordWarning) => string;
  readonly userAlreadyExists: () => string;
}
