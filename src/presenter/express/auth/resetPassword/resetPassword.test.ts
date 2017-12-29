import initTests from '../../utils/initTests';
import {API_ROUTE_V1, DEFAULT_USER_PERMISSIONS} from '../../../../utils/constants';
import {Response} from 'express';
import {CREATED_201_HTTP_CODE, OK_200_HTTP_CODE, UNPROCESSABLE_ENTITY_422_HTTP_CODE, CONFLICT_409_HTTP_CODE} from '../../utils/constants';
import config from '../../../../config';
import {TEST_VALID_LOGIN_USER, TEST_INVALID_EMAIL,TEST_VALID_PASSWORD, TEST_VALID_EMAIL, 
  TEST_TOO_SHORT_PASSWORD,TEST_NOT_MATCHING_RESET_PASSWORD_TOKEN , TEST_DIFFERENT_VALID_PASSWORD, TEST_INVALID_RESET_PASSWORD_TOKEN} from '../../../../utils/testValues';
import * as R  from 'ramda';
import expectError from '../../utils/expectError';
import * as moment from 'moment';
import createTestMailServer from '../../utils/createTestMailServer';
import generateRandomToken from '../../../../utils/generateRandomToken';
import verifyPassword from '../../../../utils/verifyPassword';

const { service, request } = initTests();

describe(__filename, () => {

  it('should fail to reset password without input', async () => {
    const response = await request.post(`${API_ROUTE_V1}/auth/reset-password`);
    expectError(response);
  });

  it('should fail to reset password without token', async () => {
    const response = await request.post(`${API_ROUTE_V1}/auth/reset-password`)
                                  .send({
                                    password: TEST_VALID_PASSWORD,
                                    password_confirmation: TEST_VALID_PASSWORD
                                  });
    expectError(response);
  });

  it('should fail to reset password without password', async () => {
    const response = await request.post(`${API_ROUTE_V1}/auth/reset-password`)
                                  .send({
                                    token: TEST_INVALID_RESET_PASSWORD_TOKEN,
                                    password_confirmation: TEST_VALID_PASSWORD
                                  });
    expectError(response);
  });

  it('should fail to reset password without password_confirmation', async () => {
    const response = await request.post(`${API_ROUTE_V1}/auth/reset-password`)
                                  .send({
                                    token: TEST_INVALID_RESET_PASSWORD_TOKEN,
                                    password: TEST_VALID_PASSWORD
                                  });
    expectError(response);
  });

  it('should fail to reset password without passwords match', async () => {
    const response = await request.post(`${API_ROUTE_V1}/auth/reset-password`)
                                  .send({
                                    token: TEST_INVALID_RESET_PASSWORD_TOKEN,
                                    password: TEST_VALID_PASSWORD,
                                    password_confirmation: TEST_DIFFERENT_VALID_PASSWORD
                                  });
    expectError(response);
  });

  it('should fail to reset password with too short passwords', async () => {
    const response = await request.post(`${API_ROUTE_V1}/auth/reset-password`)
                                  .send({
                                    token: TEST_INVALID_RESET_PASSWORD_TOKEN,
                                    password: TEST_TOO_SHORT_PASSWORD,
                                    password_confirmation: TEST_TOO_SHORT_PASSWORD
                                  });
    expectError(response);
  });

  it('should fail to reset password when there is no match', async () => {
    const response = await request.post(`${API_ROUTE_V1}/auth/reset-password`)
                                  .send({
                                    token: TEST_INVALID_RESET_PASSWORD_TOKEN,
                                    password: TEST_VALID_PASSWORD,
                                    password_confirmation: TEST_DIFFERENT_VALID_PASSWORD
                                  });
    expectError(response);
  });

  it('should fail to reset password when there is no matching token in db', async () => {
    const response = await request.post(`${API_ROUTE_V1}/auth/reset-password`)
                                  .send({
                                    token: TEST_NOT_MATCHING_RESET_PASSWORD_TOKEN,
                                    password: TEST_VALID_PASSWORD,
                                    password_confirmation: TEST_VALID_PASSWORD
                                  });
    expectError(response);
  });

  it('should fail to reset password when the token is expired', async () => {
    
    const registeredUser = await service.register({
      email: TEST_VALID_EMAIL, 
      password: TEST_VALID_PASSWORD
    });
    const token = generateRandomToken();
    await service.createResetPasswordToken({
      userId: registeredUser.user.id, 
      token, 
      createdAt: moment().subtract(2, 'h').toString()
    });

    const response = await request.post(`${API_ROUTE_V1}/auth/reset-password`)
                                  .send({
                                    token,
                                    password: TEST_VALID_PASSWORD,
                                    password_confirmation: TEST_VALID_PASSWORD
                                  });
    expectError(response);
  });

  it('should successfuly change user password, delete token, and send email', async () => {
    const mailServer = createTestMailServer();
    const registeredUser = await service.register({
      email: TEST_VALID_EMAIL, 
      password: TEST_VALID_PASSWORD
    });

    const token = generateRandomToken();

    await service.createResetPasswordToken({
      userId: registeredUser.user.id, 
      token, 
      createdAt: moment().subtract(59, 'minutes').toString()
    });

    const response = await request.post(`${API_ROUTE_V1}/auth/reset-password`)
                                  .send({
                                    token,
                                    password: TEST_DIFFERENT_VALID_PASSWORD,
                                    password_confirmation: TEST_DIFFERENT_VALID_PASSWORD
                                  });

    const updatedUser: any = await service.getUserById({id: registeredUser.user.id});                          
    const tokenAfterReseting = await service.getResetPasswordTokenByToken({ token });
    const match = await verifyPassword(TEST_DIFFERENT_VALID_PASSWORD, updatedUser.password);
    const email: any = await mailServer;

    expect(email.from[0].address).toBe(config.mail.from);
    expect(email.to[0].address).toBe(registeredUser.user.email);
    expect(match).toBe(true);
    expect(tokenAfterReseting).toBeNull();
    expect(response.status).toBe(OK_200_HTTP_CODE);
    expect(response.body).toMatchSnapshot();
  });
});