import initTests from '../../utils/initTests';
import {API_ROUTE_V1,AUTH_PARAM_NAME, AUTH_BODY_FIELD_NAME, AUTH_SCHEME_NAME} from '../../../../utils/constants';
import {Response} from 'express';
import {OK_200_HTTP_CODE, UNPROCESSABLE_ENTITY_422_HTTP_CODE, NOT_FOUND_404_HTTP_CODE, FORBIDDEN_403_HTTP_CODE, UNAUTHORISED_401_HTTP_CODE} from '../../utils/constants';
import config from '../../../../config';
import {TEST_VALID_LOGIN_USER,TEST_INVALID_JWT_TOKEN, TEST_VALID_REGIRSTER_USER,TEST_INVALID_EMAIL,TEST_VALID_PASSWORD, TEST_VALID_EMAIL, TEST_TOO_SHORT_PASSWORD, TEST_DIFFERENT_VALID_PASSWORD} from '../../../../utils/testValues';
import * as R  from 'ramda';
import expectError from '../../utils/expectError';
import generateJwtToken from '../../../../utils/jwt/generateToken';

describe(__filename, () => {

  const { service, request } = initTests();

  it('should fail to get user when unauthenticated', async () => {
    const response = await request.get(`${API_ROUTE_V1}/users/1`);
    expectError(response, UNAUTHORISED_401_HTTP_CODE);
  });

  it('should fail to get user when invalid token provided in query param', async () => {
    const response = await request.get(`${API_ROUTE_V1}/users/1?${AUTH_PARAM_NAME}=${TEST_INVALID_JWT_TOKEN}`);
    expectError(response, UNAUTHORISED_401_HTTP_CODE);
  });

  it('should fail to get user when invalid token provided in authorization header', async () => {
    const response = await request.get(`${API_ROUTE_V1}/users/1`)
                                  .set('Authorization' , TEST_INVALID_JWT_TOKEN);
    expectError(response, UNAUTHORISED_401_HTTP_CODE);
  });

  it('should fail to get user when insufficent permissions', async () => {
    const userWithoutPermissions = await service.createUser(TEST_VALID_REGIRSTER_USER);
    const validToken = await generateJwtToken({data: {id: userWithoutPermissions.id}});
    const response = await request.get(`${API_ROUTE_V1}/users/${userWithoutPermissions.id}`)
                                  .set('Authorization' , validToken);
    expectError(response, FORBIDDEN_403_HTTP_CODE);
  });

  it('should fail get user when user does not exist', async () => {
    const user = await service.createUser(TEST_VALID_REGIRSTER_USER);
    const validToken = await generateJwtToken({data: {id: user.id}});
    
    const response = await request.get(`${API_ROUTE_V1}/users/999`)
                                  .set('Authorization' , validToken);
    expectError(response, NOT_FOUND_404_HTTP_CODE);
  });

});