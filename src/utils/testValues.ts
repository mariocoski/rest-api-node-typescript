
export const TEST_VALID_EMAIL: string = 'valid.email@test.com';
export const TEST_INVALID_EMAIL: string = 'invalidemail@test';

export const TEST_VALID_PASSWORD: string = 'longenoughpassword';
export const TEST_TOO_SHORT_PASSWORD: string = 'short';
export const TEST_DIFFERENT_VALID_PASSWORD: string = 'doesnotmatch';
export const TEST_INVALID_RESET_PASSWORD_TOKEN: string = 'invalidtoken';
export const TEST_NOT_MATCHING_RESET_PASSWORD_TOKEN: string = 'notmatchingtoken';


export const TEST_VALID_REGIRSTER_USER: any = {
  email: TEST_VALID_EMAIL,
  password: TEST_VALID_PASSWORD,
  password_confirmation: TEST_VALID_PASSWORD
};

export const TEST_VALID_LOGIN_USER: any = {
  email: TEST_VALID_EMAIL,
  password: TEST_VALID_PASSWORD
};