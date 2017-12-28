import initTestsWithMailServer from '../../utils/initTestsWithMailServer';
import {API_ROUTE_V1, DEFAULT_USER_PERMISSIONS} from '../../../../utils/constants';
import {Response} from 'express';
import {CREATED_201_HTTP_CODE, OK_200_HTTP_CODE, UNPROCESSABLE_ENTITY_422_HTTP_CODE, CONFLICT_409_HTTP_CODE} from '../../utils/constants';
import config from '../../../../config';
import {TEST_VALID_LOGIN_USER, TEST_INVALID_EMAIL,TEST_VALID_PASSWORD, TEST_VALID_EMAIL, TEST_TOO_SHORT_PASSWORD, TEST_DIFFERENT_VALID_PASSWORD} from '../../../../utils/testValues';
import * as R  from 'ramda';
import expectError from '../../utils/expectError';

describe(__filename, () => {

  const { service, request } = initTestsWithMailServer();

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
    expect(response.status).toBe(OK_200_HTTP_CODE);
  });

  it('should succesfull create reset_password_token for user and send email', async () => {
    
    const registeredUser = await service.register({
      email: TEST_VALID_EMAIL, 
      password: TEST_VALID_PASSWORD
    });
    
    const response = await request.post(`${API_ROUTE_V1}/auth/forget-password`)
                                  .send({
                                    email: TEST_VALID_EMAIL
                                  });
                                  
    const resetPasswordTokens = await service.getUserResetPasswordTokens({
      userId: registeredUser.user.id
    });
    expect(resetPasswordTokens.length).toBe(1);
    expect(response.status).toBe(OK_200_HTTP_CODE);
    /*
      ----
# create the server -- will start automatically
import smtpmock
mock_server = smtpmock.MockSMTPServer("localhost", 25025)

#send a test message
import smtplib
client = smtplib.SMTP("localhost", 25025)
fromaddr = "test.sender@mydomain.com"
toaddrs = ["test.recipient1@mydomain.com", "test.recipient2@mydomain.com"]
content = "test message content"
msg = "From: %s\r\nTo: %s\r\n\r\n%s" % (fromaddr, ", ".join(toaddrs), content)
client.sendmail(fromaddr, toaddrs, msg)
client.quit()

# verify that the message has been recieved
assert(mock_server.received_message_matching("From: .*\\nTo: .*\\n+.+tent"))

# reset the server to be ready for a new test
mock_server.reset()
assert(mock_server.received_messages_count() == 0)
    */
  });
});