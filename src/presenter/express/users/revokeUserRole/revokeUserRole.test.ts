import initTests from '../../utils/initTests';
import {API_ROUTE_V1} from '../../../../utils/constants';
import {Response} from 'express';
import {OK_200_HTTP_CODE, NOT_FOUND_404_HTTP_CODE,FORBIDDEN_403_HTTP_CODE, CONFLICT_409_HTTP_CODE, UNAUTHORISED_401_HTTP_CODE, UNPROCESSABLE_ENTITY_422_HTTP_CODE} from '../../utils/constants';
import config from '../../../../config';
import {TEST_INVALID_JWT_TOKEN,TEST_VALID_EMAIL, TEST_INVALID_EMAIL, TEST_DIFFERENT_VALID_PASSWORD,TEST_VALID_PASSWORD,
   TEST_TOO_SHORT_PASSWORD,TEST_VALID_ANOTHER_REGIRSTER_USER, TEST_VALID_REGISTER_USER, TEST_VALID_TITLE, TEST_VALID_DESCRIPTION
  } from '../../../../utils/testValues';
import expectError from '../../utils/expectError';
import generateJwtToken from '../../../../utils/jwt/generateToken';
import createUserWithPermission from '../../utils/createUserWithPermission';
import {CAN_REVOKE_ROLE} from '../../../../utils/constants';
import {fakePermissions} from '../../../../utils/fakesFactory';
import verifyPassword from '../../../../utils/verifyPassword';
import * as moment from 'moment';

describe(__filename, () => {

  const { service, request } = initTests();

  it('should fail to revoke role from user when unauthenticated', async () => {
    const response = await request.delete(`${API_ROUTE_V1}/users/1/roles/1`);
    expectError(response, UNAUTHORISED_401_HTTP_CODE);
  });

  it('should fail to revoke role from user when invalid token provided in authorization header', async () => {
    const response = await request.delete(`${API_ROUTE_V1}/users/1/roles/1`)
                                  .set('Authorization' , TEST_INVALID_JWT_TOKEN);
    expectError(response, UNAUTHORISED_401_HTTP_CODE);
  });

  it('should fail to revoke role from user when insufficent permissions', async () => {
    const userWithoutPermissions = await service.createUser(TEST_VALID_REGISTER_USER);
    const validToken = await generateJwtToken({data: {id: userWithoutPermissions.id}});
    const response = await request.delete(`${API_ROUTE_V1}/users/1/roles/1`)
                                  .set('Authorization' , validToken);
    expectError(response, FORBIDDEN_403_HTTP_CODE);
  });


  it('should fail to revoke role from user when user does not exist', async () => {
    const user = await createUserWithPermission(service, CAN_REVOKE_ROLE);

    const role: any = await service.createRole({
      name: TEST_VALID_TITLE,
      description: TEST_VALID_DESCRIPTION
    });
    const validToken = await generateJwtToken({data: {id: user.id}});
    const response = await request.delete(`${API_ROUTE_V1}/users/999/roles/${role.id}`)
                                  .set('Authorization' , validToken);
    expectError(response, NOT_FOUND_404_HTTP_CODE);
  });

  it('should fail to revoke role from user when role does not exist', async () => {
    const user = await createUserWithPermission(service, CAN_REVOKE_ROLE);
    const usersToBeRevokedWithARole: any = await service.createUser(TEST_VALID_ANOTHER_REGIRSTER_USER);
    const validToken = await generateJwtToken({data: {id: user.id}});
    const response = await request.delete(`${API_ROUTE_V1}/users/${usersToBeRevokedWithARole.id}/roles/999`)
                                  .set('Authorization' , validToken);
    expectError(response, NOT_FOUND_404_HTTP_CODE);
  });

  it('should successfuly revoke role from user with valid data', async () => {

    const user: any = await createUserWithPermission(service, CAN_REVOKE_ROLE);
    const userWithoutRoles: any = await service.createUser(TEST_VALID_ANOTHER_REGIRSTER_USER);

    const roleToBeRevoked: any = await service.createRole({
      name: TEST_VALID_TITLE,
      description: TEST_VALID_DESCRIPTION
    });

    await service.assignUserRole({
      user_id: userWithoutRoles.id,
      role_id: roleToBeRevoked.id
    });

    const otherRoles = fakePermissions({
      count: 3,
      only: ['name', 'description']
    }).map(async (roke: any) => {
      return service.createRole(roke);
    }); 

    const createdRoles = await Promise.all(otherRoles);
    const assignedRoles = createdRoles.map((role: any) => {
      return service.assignUserRole({
        role_id: role.id,
        user_id: userWithoutRoles.id
      });
    });
  
    await Promise.all(assignedRoles);

    const userWithAllRoles: any = await service.getUserById({id: userWithoutRoles.id});
    expect(userWithAllRoles.roles.length).toBe(4);

    const validToken = await generateJwtToken({data: {id: user.id}});
    const response = await request.delete(`${API_ROUTE_V1}/users/${userWithoutRoles.id}/roles/${roleToBeRevoked.id}`)
                                  .set('Authorization' , validToken);
    const fetchedUser: any = await service.getUserById({id: userWithAllRoles.id});
    
    expect(fetchedUser.roles.length).toBe(3);
    expect(response.status).toBe(OK_200_HTTP_CODE);
  });
  
});