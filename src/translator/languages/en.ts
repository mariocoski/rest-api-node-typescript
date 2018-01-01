import Translator from '../Translator';
import stringPath from '../utils/stringPath';

const translator: Translator = {
  modelAlreadyExists: (modelName: string) => `${modelName} Model already exists`,
  expiredJwtToken: () => 'Expired JWT token',
  invalidJwtToken: () => 'Invalid JWT token',
  modelNotFound: (modelName: string) => `No ${modelName} Model found`,
  missingJwtToken: () => 'Missing JWT token',
  missingJwtTokenExtractor: () => 'Missing JWT token extractor',
  passwordChangedSuccessfully: () => 'Your password has been changed sucessfully. You can not log in.',
  expiredResetPasswordToken: () => 'Expired reset password token',
  invalidResetPasswordToken: () => 'Invalid reset password token',
  unauthorized: () => 'Unauthorized',
  forbidden: () => 'Forbidden',
  serverError: () => 'Server error',
  passwordReminderSent: (email) => {
    return `An email has been sent to the provided address (${email}) containing a link with your recovery token`;
  },
  userAlreadyExists: () => 'User already exists',
  invalidCredentials: () => 'Incorrect email or password',
  invalidEmailWarning: (warning) => {
    const path = stringPath(warning.path);
    const dataString = JSON.stringify(warning.data);
    return `Invalid email in '${path}'. Received '${dataString}'`;
  },
  requiredWarning: (warning) => {
    const path = stringPath(warning.path);
    return `Missing required value in '${path}'`;
  },
  typeWarning: (warning) => {
    const path = stringPath(warning.path);
    const typeName = (<any> warning.type).name;
    const dataString = JSON.stringify(warning.data);
    return `Expected '${path}' to be '${typeName}'. Received '${dataString}'`;
  },
  restrictedKeysWarning: (warning) => {
    const path = stringPath(warning.path);
    const keys = warning.keys.join(', ');
    return `Unknown keys (${keys}) set in '${path}'`;
  },
  minLengthWarning: (warning) => {
    const pathString = stringPath(warning.path);
    const dataString = JSON.stringify(warning.data);
    return `Required data in ${pathString} must have at least ${warning.length} characters.`;
  },
  maxLengthWarning: (warning) => {
    const pathString = stringPath(warning.path);
    const dataString = JSON.stringify(warning.data);
    return `Required data in ${pathString} must have maximum ${warning.length} characters.`;
  },
  notMatchingPasswordWarning: (warning) => {
    const pathString = stringPath(warning.path);
    const dataString = JSON.stringify(warning.data);
    return `Passwords must match in ${pathString}`;
  },
  warning: (warning) => {
    const path = stringPath(warning.path);
    const dataString = JSON.stringify(warning.data);
    return `Problem in '${path}'. Received '${dataString}'`;
  },
};
export default translator;