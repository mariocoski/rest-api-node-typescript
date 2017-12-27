import Translator from '../Translator';
import stringPath from '../utils/stringPath';

const translator: Translator = {
  unauthorized: () => 'Unauthorized',
  forbidden: () => 'Forbidden',
  userAlreadyExists: () => 'User already exists',
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
  minLengthWarning: (warning) => {
    const pathString = stringPath(warning.path);
    const dataString = JSON.stringify(warning.data);
    return `Required data in ${pathString} must have at least ${warning.length} characters. Received '${dataString}'`;
  },
  maxLengthWarning: (warning) => {
    const pathString = stringPath(warning.path);
    const dataString = JSON.stringify(warning.data);
    return `Required data in ${pathString} must have maximum ${warning.length} characters. Received '${dataString}'`;
  },
  notMatchingPasswordWarning: (warning) => {
    const pathString = stringPath(warning.path);
    const dataString = JSON.stringify(warning.data);
    return `Passwords must match in ${pathString}`;
  },
};
export default translator;