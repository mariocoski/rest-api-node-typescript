import initTests from '../../utils/initTests';
import {API_ROUTE_V1} from '../../../../utils/constants';
import {Response} from 'express';
import {OK_200_HTTP_CODE, FORBIDDEN_403_HTTP_CODE, CONFLICT_409_HTTP_CODE, UNAUTHORISED_401_HTTP_CODE, UNPROCESSABLE_ENTITY_422_HTTP_CODE} from '../../utils/constants';
import config from '../../../../config';
import {TEST_INVALID_JWT_TOKEN,TEST_VALID_EMAIL, TEST_INVALID_EMAIL, TEST_DIFFERENT_VALID_PASSWORD,TEST_VALID_PASSWORD, TEST_TOO_SHORT_PASSWORD,TEST_VALID_ANOTHER_REGIRSTER_USER, TEST_VALID_REGISTER_USER } from '../../../../utils/testValues';
import expectError from '../../utils/expectError';
import generateJwtToken from '../../../../utils/jwt/generateToken';
import createUserWithPermission from '../../utils/createUserWithPermission';
import {CAN_CREATE_USER} from '../../../../utils/constants';
import {fakeUsers} from '../../../../utils/fakesFactory';
import verifyPassword from '../../../../utils/verifyPassword';
import * as moment from 'moment';

describe(__filename, () => {

  const { service, request } = initTests();

  it('should fail to create post when unauthenticated', async () => {
    const response = await request.post(`${API_ROUTE_V1}/posts`);
    expectError(response, UNAUTHORISED_401_HTTP_CODE);
  });

  it('should fail to create post when invalid token provided in authorization header', async () => {
    const response = await request.post(`${API_ROUTE_V1}/posts`)
                                  .set('Authorization' , TEST_INVALID_JWT_TOKEN);
    expectError(response, UNAUTHORISED_401_HTTP_CODE);
  });

  it('should fail to create post when insufficent permissions', async () => {
    const userWithoutPermissions = await service.createUser(TEST_VALID_REGISTER_USER);
    const validToken = await generateJwtToken({data: {id: userWithoutPermissions.id}});
    const response = await request.post(`${API_ROUTE_V1}/posts`)
                                  .set('Authorization' , validToken);
    expectError(response, FORBIDDEN_403_HTTP_CODE);
  });

  
});