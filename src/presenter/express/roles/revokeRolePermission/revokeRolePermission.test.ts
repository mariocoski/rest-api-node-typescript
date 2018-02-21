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
import {CAN_REVOKE_PERMISSION} from '../../../../utils/constants';
import {fakePermissions} from '../../../../utils/fakesFactory';
import verifyPassword from '../../../../utils/verifyPassword';
import * as moment from 'moment';

describe(__filename, () => {

  const { service, request } = initTests();

  it('should fail to revoke permission from role when unauthenticated', async () => {
    const response = await request.delete(`${API_ROUTE_V1}/roles/1/permissions/1`);
    expectError(response, UNAUTHORISED_401_HTTP_CODE);
  });

  it('should fail to revoke permission from role when invalid token provided in authorization header', async () => {
    const response = await request.delete(`${API_ROUTE_V1}/roles/1/permissions/1`)
                                  .set('Authorization' , TEST_INVALID_JWT_TOKEN);
    expectError(response, UNAUTHORISED_401_HTTP_CODE);
  });

  it('should fail to revoke permission from role when insufficent permissions', async () => {
    const userWithoutPermissions = await service.createUser(TEST_VALID_REGISTER_USER);
    const validToken = await generateJwtToken({data: {id: userWithoutPermissions.id}});
    const response = await request.delete(`${API_ROUTE_V1}/roles/1/permissions/1`)
                                  .set('Authorization' , validToken);
    expectError(response, FORBIDDEN_403_HTTP_CODE);
  });


  it('should fail to revoke permission from role when role does not exist', async () => {
    const user = await createUserWithPermission(service, CAN_REVOKE_PERMISSION);
    const permission: any = await service.createPermission({
      name: TEST_VALID_TITLE,
      description: TEST_VALID_DESCRIPTION
    });
    const validToken = await generateJwtToken({data: {id: user.id}});
    const response = await request.delete(`${API_ROUTE_V1}/roles/999/permissions/${permission.id}`)
                                  .set('Authorization' , validToken);
    expectError(response, NOT_FOUND_404_HTTP_CODE);
  });

  it('should fail to revoke permission from role when permission does not exist', async () => {
    const user = await createUserWithPermission(service, CAN_REVOKE_PERMISSION);

    const validToken = await generateJwtToken({data: {id: user.id}});
    const response = await request.delete(`${API_ROUTE_V1}/roles/1/permissions/999`)
                                  .set('Authorization' , validToken);
    expectError(response, NOT_FOUND_404_HTTP_CODE);
  });

  it('should successfuly revoke permission from role with valid data', async () => {
    const user: any = await createUserWithPermission(service, CAN_REVOKE_PERMISSION);
    const role: any = await service.createRole({
      name: TEST_VALID_TITLE,
      description: TEST_VALID_DESCRIPTION
    });

    const permissionToBeRevoked: any = await service.createPermission({
      name: TEST_VALID_TITLE,
      description: TEST_VALID_DESCRIPTION
    });

    await service.assignRolePermission({
      role_id: role.id,
      permission_id: permissionToBeRevoked.id
    });

    const otherPermissions = fakePermissions({
      count: 3,
      only: ['name','label', 'description']
    }).map(async (permission: any) => {
      return service.createPermission(permission);
    }); 

    const createdPermissions = await Promise.all(otherPermissions);
    const assignedPermissions = createdPermissions.map((permission: any) => {
      return service.assignRolePermission({
        role_id: role.id,
        permission_id: permission.id
      });
    });
  
    await Promise.all(assignedPermissions);

    const roleWithAllPermissions: any = await service.getRoleById({id: role.id});
    expect(roleWithAllPermissions.permissions.length).toBe(4);

    const validToken = await generateJwtToken({data: {id: user.id}});
    const response = await request.delete(`${API_ROUTE_V1}/roles/${role.id}/permissions/${permissionToBeRevoked.id}`)
                                  .set('Authorization' , validToken);
    const fetchedRole: any = await service.getRoleById({id: role.id});
    
    expect(fetchedRole.permissions.length).toBe(3);
    expect(response.status).toBe(OK_200_HTTP_CODE);
  });
  
});