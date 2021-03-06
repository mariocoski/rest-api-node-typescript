import initTests from '../../utils/initTests';
import {API_ROUTE_V1} from '../../../../utils/constants';
import {Response} from 'express';
import {OK} from 'http-status-codes';
import config from '../../../../config';
import {TEST_INVALID_EMAIL,TEST_VALID_REGISTER_USER , TEST_VALID_EMAIL} from '../../../../utils/testValues';
import * as R  from 'ramda';
import expectError from '../../utils/expectError';
import * as moment from 'moment';
import createTestMailServer from '../../utils/createTestMailServer';
import {ONE_HOUR} from '../../../../utils/constants';

const { service, request } = initTests();

describe(__filename, () => {

  it('should fail to log in user without input', async () => {
    const response = await request.post(`${API_ROUTE_V1}/auth/forget-password`);
    expectError(response);
  });

  it('should fail to log in user when email is invalid', async () => {
    const response = await request.post(`${API_ROUTE_V1}/auth/forget-password`)
                                  .send({
                                    email: TEST_INVALID_EMAIL
                                  });
    expectError(response);
  });


  it('should get 200 even when email does not exist (for security reasons)', async () => {
    const response = await request.post(`${API_ROUTE_V1}/auth/forget-password`)
                                  .send({email:TEST_VALID_EMAIL});
    expect(response.status).toBe(OK);
  });

  it('should succesfull create reset_password_token for user and send email', async () => {
    const mailServer = createTestMailServer();
    const registeredUser = await service.register(TEST_VALID_REGISTER_USER);
    
    const response = await request.post(`${API_ROUTE_V1}/auth/forget-password`)
                                  .send({
                                    email: TEST_VALID_REGISTER_USER.email
                                  });
    
    const resetPasswordTokens = await service.getUserResetPasswordTokens({
      userId: registeredUser.user.id
    });
    const email: any = await mailServer;
    expect(response.status).toBe(OK);
    expect(resetPasswordTokens.length).toBe(1);
    expect(email.from[0].address).toBe(config.mail.from);
    expect(email.to[0].address).toBe(TEST_VALID_EMAIL);
    expect(email.text).toMatch(resetPasswordTokens[0].token);
    const tokenCreatedAgoInMilliseconds = moment.duration(
      moment(new Date()).diff(moment(resetPasswordTokens[0].created_at))
    ).asMilliseconds();
    expect(tokenCreatedAgoInMilliseconds).toBeLessThan(ONE_HOUR);
  });
});