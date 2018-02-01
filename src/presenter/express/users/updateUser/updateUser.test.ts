import initTests from '../../utils/initTests';
import {API_ROUTE_V1} from '../../../../utils/constants';
import {Response} from 'express';
import {OK_200_HTTP_CODE, FORBIDDEN_403_HTTP_CODE, UNAUTHORISED_401_HTTP_CODE, UNPROCESSABLE_ENTITY_422_HTTP_CODE} from '../../utils/constants';
import config from '../../../../config';
import {TEST_INVALID_JWT_TOKEN, TEST_INVALID_EMAIL, TEST_DIFFERENT_VALID_PASSWORD,TEST_VALID_PASSWORD, TEST_TOO_SHORT_PASSWORD,TEST_VALID_ANOTHER_REGIRSTER_USER, TEST_VALID_REGISTER_USER } from '../../../../utils/testValues';
import expectError from '../../utils/expectError';
import generateJwtToken from '../../../../utils/jwt/generateToken';
import createUserWithPermission from '../../utils/createUserWithPermission';
import {CAN_UPDATE_USER, DEFAULT_USERS_PAGINATION_LIMIT, DEFAULT_USERS_PAGINATION_OFFSET} from '../../../../utils/constants';
import {fakeUsers} from '../../../../utils/fakesFactory';
import verifyPassword from '../../../../utils/verifyPassword';
import * as moment from 'moment';

describe(__filename, () => {

  const { service, request } = initTests();

  it('should fail to update user when unauthenticated', async () => {
    const response = await request.patch(`${API_ROUTE_V1}/users/1`);
    expectError(response, UNAUTHORISED_401_HTTP_CODE);
  });

  it('should fail to update user when invalid token provided in authorization header', async () => {
    const response = await request.patch(`${API_ROUTE_V1}/users/1`)
                                  .set('Authorization' , TEST_INVALID_JWT_TOKEN);
    expectError(response, UNAUTHORISED_401_HTTP_CODE);
  });

  it('should fail to update user when insufficent permissions', async () => {
    const userWithoutPermissions = await service.createUser(TEST_VALID_REGISTER_USER);
    const validToken = await generateJwtToken({data: {id: userWithoutPermissions.id}});
    const response = await request.patch(`${API_ROUTE_V1}/users/${userWithoutPermissions.id}`)
                                  .set('Authorization' , validToken);
    expectError(response, FORBIDDEN_403_HTTP_CODE);
  });

  it('should fail to update user with invalid user email', async () => {
    const user = await createUserWithPermission(service, CAN_UPDATE_USER);
    
    const validToken = await generateJwtToken({data: {id: user.id}});
    const response = await request.patch(`${API_ROUTE_V1}/users/${user.id}`)
                                  .set('Authorization' , validToken)
                                  .send({
                                    email: TEST_INVALID_EMAIL
                                  });

    expectError(response, UNPROCESSABLE_ENTITY_422_HTTP_CODE);
  });

  it('should fail to update user with too short password', async () => {
    const user = await createUserWithPermission(service, CAN_UPDATE_USER);
    
    const validToken = await generateJwtToken({data: {id: user.id}});
    const response = await request.patch(`${API_ROUTE_V1}/users/${user.id}`)
                                  .set('Authorization' , validToken)
                                  .send({
                                    password: TEST_TOO_SHORT_PASSWORD
                                  });

    expectError(response, UNPROCESSABLE_ENTITY_422_HTTP_CODE);
  });


  it('should fail to update user without password confirmation', async () => {
    const user = await createUserWithPermission(service, CAN_UPDATE_USER);
    
    const validToken = await generateJwtToken({data: {id: user.id}});
    const response = await request.patch(`${API_ROUTE_V1}/users/${user.id}`)
                                  .set('Authorization' , validToken)
                                  .send({
                                    password: TEST_VALID_PASSWORD
                                  });
    expectError(response, UNPROCESSABLE_ENTITY_422_HTTP_CODE);
  });

  it('should fail to update user when password and password_confirmation don\'t match', async () => {
    const user = await createUserWithPermission(service, CAN_UPDATE_USER);
    
    const validToken = await generateJwtToken({data: {id: user.id}});
    const response = await request.patch(`${API_ROUTE_V1}/users/${user.id}`)
                                  .set('Authorization' , validToken)
                                  .send({
                                    password: TEST_VALID_PASSWORD,
                                    password_confirmation: TEST_DIFFERENT_VALID_PASSWORD
                                  });
    expectError(response, UNPROCESSABLE_ENTITY_422_HTTP_CODE);
  });

  it('should fail to update user when password and password_confirmation don\'t match', async () => {
    const user = await createUserWithPermission(service, CAN_UPDATE_USER);
    
    const validToken = await generateJwtToken({data: {id: user.id}});
    const response = await request.patch(`${API_ROUTE_V1}/users/${user.id}`)
                                  .set('Authorization' , validToken)
                                  .send({
                                    password: TEST_VALID_PASSWORD,
                                    password_confirmation: TEST_DIFFERENT_VALID_PASSWORD
                                  });
    expectError(response, UNPROCESSABLE_ENTITY_422_HTTP_CODE);
  });

  it('should successfuly update user when password and password_confirmation match', async () => {
    const user = await createUserWithPermission(service, CAN_UPDATE_USER);
    
    const validToken = await generateJwtToken({data: {id: user.id}});
    const response = await request.patch(`${API_ROUTE_V1}/users/${user.id}`)
                                  .set('Authorization' , validToken)
                                  .send({
                                    password: TEST_VALID_PASSWORD,
                                    password_confirmation: TEST_VALID_PASSWORD
                                  });
    const updatedUser: any = await service.getUserById({id: user.id});  
    const match = await verifyPassword(TEST_VALID_PASSWORD, updatedUser.password); 
    expect(match).toBe(true);
    const now = moment(new Date());
    const correctUpdateAt = moment.duration(now.diff(response.body.updated_at)).asMilliseconds() < 10000;
    expect(correctUpdateAt).toBe(true);
    expect(response.status).toBe(OK_200_HTTP_CODE);
  });


});