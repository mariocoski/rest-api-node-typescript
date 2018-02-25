import initTests from '../../utils/initTests';
import {API_ROUTE_V1,AUTH_PARAM_NAME} from '../../../../utils/constants';
import {Response} from 'express';
import { OK, CREATED, FORBIDDEN, UNAUTHORIZED, NOT_FOUND, CONFLICT } from 'http-status-codes';
import config from '../../../../config';
import {TEST_INVALID_JWT_TOKEN, TEST_VALID_ANOTHER_REGIRSTER_USER, TEST_VALID_REGISTER_USER } from '../../../../utils/testValues';
import expectError from '../../utils/expectError';
import generateJwtToken from '../../../../utils/jwt/generateToken';
import createUserWithPermission from '../../utils/createUserWithPermission';
import {CAN_GET_USER, DEFAULT_USER_PERMISSIONS} from '../../../../utils/constants';

describe(__filename, () => {

  const { service, request } = initTests();

  it('should fail to get user when unauthenticated', async () => {
    const response = await request.get(`${API_ROUTE_V1}/users/1`);
    expectError(response, UNAUTHORIZED);
  });

  it('should fail to get user when invalid token provided in query param', async () => {
    const response = await request.get(`${API_ROUTE_V1}/users/1?${AUTH_PARAM_NAME}=${TEST_INVALID_JWT_TOKEN}`);
    expectError(response, UNAUTHORIZED);
  });

  it('should fail to get user when invalid token provided in authorization header', async () => {
    const response = await request.get(`${API_ROUTE_V1}/users/1`)
                                  .set('Authorization' , TEST_INVALID_JWT_TOKEN);
    expectError(response, UNAUTHORIZED);
  });

  it('should fail to get user when insufficent permissions', async () => {
    const userWithoutPermissions = await service.createUser(TEST_VALID_REGISTER_USER);
    const validToken = await generateJwtToken({data: {id: userWithoutPermissions.id}});
    const response = await request.get(`${API_ROUTE_V1}/users/${userWithoutPermissions.id}`)
                                  .set('Authorization' , validToken);
    expectError(response, FORBIDDEN);
  });

  it('should fail get user when user does not exist', async () => {
    const user = await createUserWithPermission(service, CAN_GET_USER);
    const validToken = await generateJwtToken({data: {id: user.id}});
    const response = await request.get(`${API_ROUTE_V1}/users/999`)
                                  .set('Authorization', validToken);
    expectError(response, NOT_FOUND);
  });

  it('should get user data when has permission to see it', async () => {
    const userToBeFetched = await service.createUser(TEST_VALID_ANOTHER_REGIRSTER_USER);
    const user = await createUserWithPermission(service, CAN_GET_USER);
    const validToken = await generateJwtToken({data: {id: user.id}});
    const response = await request.get(`${API_ROUTE_V1}/users/${userToBeFetched.id}`)
                                  .set('Authorization', validToken);
    expect(response.status).toBe(OK);
    expect(response.body.roles.length).toBe(0);
    expect(response.body.posts.length).toBe(0);
    expect(response.body.email).toBe(TEST_VALID_ANOTHER_REGIRSTER_USER.email);
  });
});