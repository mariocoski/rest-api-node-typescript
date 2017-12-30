import {MinLengthWarning, MaxLengthWarning, NotMatchingPasswordWarning, InvalidEmailWarning} from '../utils/validate';
import {RequiredWarning,TypeWarning, Warning, RestrictedKeysWarning} from 'rulr';

export default interface Translator {
  readonly expiredJwtToken: () => string;
  readonly invalidJwtToken: () => string; 
  readonly passwordChangedSuccessfully: () => string;
  readonly modelNotFound: (modelName: string) => string;
  readonly missingJwtToken: () => string;
  readonly missingJwtTokenExtractor: () => string;
  readonly expiredResetPasswordToken: () => string;
  readonly invalidResetPasswordToken: () => string;
  readonly unauthorized: () => string;
  readonly forbidden: () => string;
  readonly invalidCredentials: () => string;
  readonly passwordReminderSent: (email: string) => string;
  readonly minLengthWarning: (warning: MinLengthWarning) => string;
  readonly maxLengthWarning: (warning: MaxLengthWarning) => string;
  readonly requiredWarning: (warning: RequiredWarning) => string;
  readonly restrictedKeysWarning: (warning :RestrictedKeysWarning) => string;
  readonly typeWarning: (warning: TypeWarning) => string;
  readonly notMatchingPasswordWarning: (warning: NotMatchingPasswordWarning) => string;
  readonly userAlreadyExists: () => string;
  readonly invalidEmailWarning: (warning: InvalidEmailWarning)=> string;
  readonly serverError: () => string;
  readonly warning: (warning: Warning) => string;
}
