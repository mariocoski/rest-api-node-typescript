import initTests from '../../utils/initTests';
import {API_ROUTE_V1} from '../../../../utils/constants';
import {Response} from 'express';
import { OK, CREATED, FORBIDDEN, UNAUTHORIZED, NOT_FOUND, CONFLICT, UNPROCESSABLE_ENTITY } from 'http-status-codes';
import config from '../../../../config';
import {TEST_INVALID_JWT_TOKEN,TEST_VALID_EMAIL, TEST_INVALID_EMAIL, TEST_DIFFERENT_VALID_PASSWORD,TEST_VALID_PASSWORD,
   TEST_TOO_SHORT_PASSWORD,TEST_VALID_ANOTHER_REGIRSTER_USER, TEST_VALID_REGISTER_USER, TEST_VALID_TITLE, TEST_VALID_DESCRIPTION
  } from '../../../../utils/testValues';
import expectError from '../../utils/expectError';
import generateJwtToken from '../../../../utils/jwt/generateToken';
import createUserWithPermission from '../../utils/createUserWithPermission';
import {CAN_ASSIGN_ROLE} from '../../../../utils/constants';
import {fakeUsers} from '../../../../utils/fakesFactory';
import verifyPassword from '../../../../utils/verifyPassword';
import * as moment from 'moment';

describe(__filename, () => {

  const { service, request } = initTests();

  it('should fail to assign role to user when unauthenticated', async () => {
    const response = await request.post(`${API_ROUTE_V1}/users/1/roles`);
    expectError(response, UNAUTHORIZED);
  });

  it('should fail to assign role to user when invalid token provided in authorization header', async () => {
    const response = await request.post(`${API_ROUTE_V1}/users/1/roles`)
                                  .set('Authorization' , TEST_INVALID_JWT_TOKEN);
    expectError(response, UNAUTHORIZED);
  });

  it('should fail to assign role to user when insufficent permissions', async () => {
    const userWithoutPermissions = await service.createUser(TEST_VALID_REGISTER_USER);
    const validToken = await generateJwtToken({data: {id: userWithoutPermissions.id}});
    const response = await request.post(`${API_ROUTE_V1}/users/1/roles`)
                                  .set('Authorization' , validToken);
    expectError(response, FORBIDDEN);
  });

  it('should fail to assign role to user when role_id is not provided', async () => {
    const user = await createUserWithPermission(service, CAN_ASSIGN_ROLE);

    const validToken = await generateJwtToken({data: {id: user.id}});
    const response = await request.post(`${API_ROUTE_V1}/users/1/roles`)
                                  .set('Authorization' , validToken);
    expectError(response, UNPROCESSABLE_ENTITY);
  });

  it('should fail to assign role to user when user does not exist', async () => {
    const user = await createUserWithPermission(service, CAN_ASSIGN_ROLE);
    
    const validToken = await generateJwtToken({data: {id: user.id}});
    const response = await request.post(`${API_ROUTE_V1}/users/999/roles`)
                                  .set('Authorization' , validToken)
                                  .send({
                                    role_id: '1',
                                  });
    expectError(response, NOT_FOUND);
  });


  it('should fail to assign role to user when role does not exist', async () => {
    const user = await createUserWithPermission(service, CAN_ASSIGN_ROLE);

    const validToken = await generateJwtToken({data: {id: user.id}});
    const response = await request.post(`${API_ROUTE_V1}/users/${user.id}/roles`)
                                  .set('Authorization' , validToken)
                                  .send({
                                    role_id: '999',
                                  });
    expectError(response, NOT_FOUND);
  });

  it('should successfuly assign permission to role with valid data', async () => {
    const user: any = await createUserWithPermission(service, CAN_ASSIGN_ROLE);
    const role: any = await service.createRole({
      name: TEST_VALID_TITLE,
      description: TEST_VALID_DESCRIPTION
    });

    const usersToBeAssignedWithARole: any = await service.createUser(TEST_VALID_ANOTHER_REGIRSTER_USER);
    const validToken = await generateJwtToken({data: {id: user.id}});

    const response = await request.post(`${API_ROUTE_V1}/users/${usersToBeAssignedWithARole.id}/roles`)
                                  .set('Authorization' , validToken)
                                  .send({
                                    role_id: role.id.toString()
                                  });
    const fetchedUser: any = await service.getUserById({id: usersToBeAssignedWithARole.id});

    expect(fetchedUser.roles.length).toBe(1);
    expect(fetchedUser.roles[0].id).toBe(role.id);
    expect(fetchedUser.roles[0].name).toBe(TEST_VALID_TITLE);
    expect(fetchedUser.roles[0].description).toBe(TEST_VALID_DESCRIPTION);

    expect(response.status).toBe(OK);
  });
});