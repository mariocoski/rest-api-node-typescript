import initTests from '../../utils/initTests';
import {API_ROUTE_V1,AUTH_PARAM_NAME} from '../../../../utils/constants';
import {Response} from 'express';
import { OK, CREATED, FORBIDDEN, UNAUTHORIZED, NOT_FOUND, CONFLICT } from 'http-status-codes';
import config from '../../../../config';
import {TEST_INVALID_JWT_TOKEN, TEST_VALID_TITLE, TEST_VALID_DESCRIPTION, TEST_VALID_ANOTHER_REGIRSTER_USER, TEST_VALID_REGISTER_USER } from '../../../../utils/testValues';
import expectError from '../../utils/expectError';
import generateJwtToken from '../../../../utils/jwt/generateToken';
import createUserWithPermission from '../../utils/createUserWithPermission';
import {CAN_GET_PERMISSION} from '../../../../utils/constants';
import {fakeRoles} from '../../../../utils/fakesFactory';

describe(__filename, () => {

  const { service, request } = initTests();

  it('should fail to get permission when unauthenticated', async () => {
    const response = await request.get(`${API_ROUTE_V1}/permissions/1`);
    expectError(response, UNAUTHORIZED);
  });

  it('should fail to get permission when invalid token provided', async () => {
    const response = await request.get(`${API_ROUTE_V1}/permissions/1`)
                                  .set('Authorization' , TEST_INVALID_JWT_TOKEN);
    expectError(response, UNAUTHORIZED);
  });

  it('should fail to get permission when insufficent permissions', async () => {
    const userWithoutPermissions = await service.createUser(TEST_VALID_REGISTER_USER);
    const validToken = await generateJwtToken({data: {id: userWithoutPermissions.id}});
    const response = await request.get(`${API_ROUTE_V1}/permissions/1`)
                                  .set('Authorization' , validToken);
    expectError(response, FORBIDDEN);
  });

  it('should fail get permission when it does not exist', async () => {
    const user = await createUserWithPermission(service, CAN_GET_PERMISSION);
    const validToken = await generateJwtToken({data: {id: user.id}});
    const response = await request.get(`${API_ROUTE_V1}/permissions/999`)
                                  .set('Authorization', validToken);
    expectError(response, NOT_FOUND);
  });

  it('should get permission data when has permission to see it', async () => {
    const user = await createUserWithPermission(service, CAN_GET_PERMISSION);
    const permissionToBeFetched = await service.createPermission({
      name: TEST_VALID_TITLE,
      label: TEST_VALID_TITLE,
      description: TEST_VALID_DESCRIPTION
    });
    const validToken = await generateJwtToken({data: {id: user.id}});
    const response = await request.get(`${API_ROUTE_V1}/permissions/${permissionToBeFetched.id}`)
                                  .set('Authorization', validToken)
                                  .send({
                                    name: TEST_VALID_TITLE,
                                    label: TEST_VALID_TITLE,
                                    description: TEST_VALID_DESCRIPTION
                                  });
    expect(response.status).toBe(OK);
    expect(response.body.name).toBe(TEST_VALID_TITLE);
    expect(response.body.label).toBe(TEST_VALID_TITLE);
    expect(response.body.description).toBe(TEST_VALID_DESCRIPTION);
  });
});