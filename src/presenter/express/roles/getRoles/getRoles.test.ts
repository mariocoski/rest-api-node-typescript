import initTests from '../../utils/initTests';
import {API_ROUTE_V1} from '../../../../utils/constants';
import {Response} from 'express';
import { OK, CREATED, FORBIDDEN, UNAUTHORIZED, NOT_FOUND, CONFLICT } from 'http-status-codes';
import config from '../../../../config';
import {TEST_INVALID_JWT_TOKEN, TEST_VALID_REGISTER_USER } from '../../../../utils/testValues';
import expectError from '../../utils/expectError';
import generateJwtToken from '../../../../utils/jwt/generateToken';
import createUserWithPermission from '../../utils/createUserWithPermission';
import {CAN_GET_ROLES, DEFAULT_ROLES_PAGINATION_LIMIT, DEFAULT_POSTS_PAGINATION_OFFSET} from '../../../../utils/constants';
import {fakeRoles} from '../../../../utils/fakesFactory';

describe(__filename, () => {

  const { service, request } = initTests();

  it('should fail to get roles when unauthenticated', async () => {
    const response = await request.get(`${API_ROUTE_V1}/roles`);
    expectError(response, UNAUTHORIZED);
  });

  it('should fail to get roles when invalid token provided in authorization header', async () => {
    const response = await request.get(`${API_ROUTE_V1}/roles`)
                                  .set('Authorization' , TEST_INVALID_JWT_TOKEN);
    expectError(response, UNAUTHORIZED);
  });

  it('should fail to get roles when insufficent permissions', async () => {
    const userWithoutPermissions = await service.createUser(TEST_VALID_REGISTER_USER);
    const validToken = await generateJwtToken({data: {id: userWithoutPermissions.id}});
    const response = await request.get(`${API_ROUTE_V1}/roles`)
                                  .set('Authorization' , validToken);
    expectError(response, FORBIDDEN);
  });

  it('should get roles with default offset and limit when not passed', async () => {
    const user = await createUserWithPermission(service, CAN_GET_ROLES);

    const roles = fakeRoles({
      count: 10,
      only: ['id','name','description']
    }).map(async (role: any) => {
      return service.createRole(role);
    }); 
    await Promise.all(roles);

    const validToken = await generateJwtToken({data: {id: user.id}});

    const response = await request.get(`${API_ROUTE_V1}/roles`)
                                  .set('Authorization', validToken);
    expect(response.status).toBe(OK);
    expect(response.body.count).toBe(10);
    expect(response.body.total).toBe(11);
    expect(response.body.perPage).toBe(DEFAULT_ROLES_PAGINATION_LIMIT);
    expect(response.body.currentPage).toBe(1);
  });

  it('should get roles when offset and limit provided', async () => {
    const user = await createUserWithPermission(service, CAN_GET_ROLES);

    const roles = fakeRoles({
      count: 10,
      only: ['id','name','description']
    }).map(async (role: any) => {
      return service.createRole(role);
    }); 
    await Promise.all(roles);

    const validToken = await generateJwtToken({data: {id: user.id}});

    const response = await request.get(`${API_ROUTE_V1}/roles?offset=0&limit=5`)
                                  .set('Authorization', validToken);
    expect(response.body.count).toBe(5);
    expect(response.body.total).toBe(11);
    expect(response.body.currentPage).toBe(1);
    expect(response.status).toBe(OK);
  });

  it('should get roles sorted according to the keys provided', async () => {
    const user = await createUserWithPermission(service, CAN_GET_ROLES);
    
    const roles = fakeRoles({
      count: 5,
      only: ['id','name','description']
    }).map(async (role: any) => {
      return service.createRole(role);
    }); 

    await Promise.all(roles);
    const validToken = await generateJwtToken({data: {id: user.id}});

    const response = await request.get(`${API_ROUTE_V1}/roles?sort=id:desc`)
                                  .set('Authorization', validToken);
    expect(response.status).toBe(OK);
    expect(response.body.data[0].id).toBe(6);
  });
 
});