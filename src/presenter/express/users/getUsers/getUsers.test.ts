import initTests from '../../utils/initTests';
import {API_ROUTE_V1} from '../../../../utils/constants';
import {Response} from 'express';
import {OK_200_HTTP_CODE, FORBIDDEN_403_HTTP_CODE, UNAUTHORISED_401_HTTP_CODE} from '../../utils/constants';
import config from '../../../../config';
import {TEST_INVALID_JWT_TOKEN, TEST_VALID_ANOTHER_REGIRSTER_USER, TEST_VALID_REGISTER_USER } from '../../../../utils/testValues';
import expectError from '../../utils/expectError';
import generateJwtToken from '../../../../utils/jwt/generateToken';
import createUserWithPermission from '../../utils/createUserWithPermission';
import {CAN_GET_USERS, DEFAULT_USERS_PAGINATION_LIMIT, DEFAULT_USERS_PAGINATION_OFFSET} from '../../../../utils/constants';
import {fakeUsers} from '../../../../utils/fakesFactory';

describe(__filename, () => {

  const { service, request } = initTests();

  it('should fail to get user when unauthenticated', async () => {
    const response = await request.get(`${API_ROUTE_V1}/users`);
    expectError(response, UNAUTHORISED_401_HTTP_CODE);
  });

  it('should fail to get users when invalid token provided in authorization header', async () => {
    const response = await request.get(`${API_ROUTE_V1}/users/1`)
                                  .set('Authorization' , TEST_INVALID_JWT_TOKEN);
    expectError(response, UNAUTHORISED_401_HTTP_CODE);
  });

  it('should fail to get user when insufficent permissions', async () => {
    const userWithoutPermissions = await service.createUser(TEST_VALID_REGISTER_USER);
    const validToken = await generateJwtToken({data: {id: userWithoutPermissions.id}});
    const response = await request.get(`${API_ROUTE_V1}/users/${userWithoutPermissions.id}`)
                                  .set('Authorization' , validToken);
    expectError(response, FORBIDDEN_403_HTTP_CODE);
  });

  it('should get users when has required permissions and passed offset and limit', async () => {
    const user = await createUserWithPermission(service, CAN_GET_USERS);

    const users = fakeUsers({count: 5, only: ['id','email', 'password']}).map(async (user: any) => {
      return service.createUser(user);
    }); 
    await Promise.all(users);

    const validToken = await generateJwtToken({data: {id: user.id}});

    const response = await request.get(`${API_ROUTE_V1}/users?offset=0&limit=5`)
                                  .set('Authorization', validToken);
    expect(response.body.count).toBe(5);
    expect(response.body.total).toBe(6);
    expect(response.body.currentPage).toBe(1);
  });

  it('should get users with default offset and limit when not passed', async () => {
    const user = await createUserWithPermission(service, CAN_GET_USERS);

    const users = fakeUsers({count: 10, only: ['id','email', 'password']}).map(async (user: any) => {
      return service.createUser(user);
    }); 
    await Promise.all(users);

    const validToken = await generateJwtToken({data: {id: user.id}});

    const response = await request.get(`${API_ROUTE_V1}/users`)
                                  .set('Authorization', validToken);
    expect(response.status).toBe(OK_200_HTTP_CODE);
    expect(response.body.count).toBe(10);
    expect(response.body.total).toBe(11);
    expect(response.body.perPage).toBe(DEFAULT_USERS_PAGINATION_LIMIT);
    expect(response.body.currentPage).toBe(1);
  });

  it('should get users sorted according to the keys provided', async () => {
    const user = await createUserWithPermission(service, CAN_GET_USERS);

    const users = fakeUsers({count: 5, only: ['id','email', 'password']}).map(async (user: any) => {
      return service.createUser(user);
    }); 
    await Promise.all(users);

    const validToken = await generateJwtToken({data: {id: user.id}});

    const response = await request.get(`${API_ROUTE_V1}/users?sort=id:desc`)
                                  .set('Authorization', validToken);
    expect(response.status).toBe(OK_200_HTTP_CODE);
    expect(response.body.data[0].id).toBe(6);
  });

});