import initTests from '../../utils/initTests';
import {API_ROUTE_V1,AUTH_PARAM_NAME, AUTH_BODY_FIELD_NAME, AUTH_SCHEME_NAME} from '../../../../utils/constants';
import {Response} from 'express';
import {OK_200_HTTP_CODE, UNPROCESSABLE_ENTITY_422_HTTP_CODE, NOT_FOUND_404_HTTP_CODE, FORBIDDEN_403_HTTP_CODE, UNAUTHORISED_401_HTTP_CODE} from '../../utils/constants';
import config from '../../../../config';
import {TEST_INVALID_JWT_TOKEN, TEST_VALID_ANOTHER_REGIRSTER_USER, TEST_VALID_REGISTER_USER,TEST_DEFAULT_ROLE_NAME } from '../../../../utils/testValues';
import expectError from '../../utils/expectError';
import generateJwtToken from '../../../../utils/jwt/generateToken';
import createUserWithPermission from '../../utils/createUserWithPermission';
import {PERMISSION_GET_USERS} from '../../../../utils/constants';

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

  it('should fail to get all users when has required permissions', async () => {
    const user = await createUserWithPermission(service, PERMISSION_GET_USERS);
    const anotherUserInTheSystem = await service.createUser(TEST_VALID_ANOTHER_REGIRSTER_USER); 
    const validToken = await generateJwtToken({data: {id: user.id}});

    const response = await request.get(`${API_ROUTE_V1}/users`)
                                  .set('Authorization' , validToken);
    expect(response.body.count).toBe(2);
  });

});