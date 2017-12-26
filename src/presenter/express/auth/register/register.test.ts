import initTests from '../../utils/initTests';
import {API_ROUTE_V1, DEFAULT_USER_PERMISSIONS} from '../../../../utils/constants';
import {Response} from 'express';
import {CREATED_201_HTTP_CODE, UNPROCESSABLE_ENTITY_422_HTTP_CODE} from '../../utils/constants';
import config from '../../../../config';
import {TEST_VALID_USER} from '../../../../utils/testValues';
import * as R  from 'ramda';

describe(__filename, () => {

  const { service, request } = initTests();

  it('should fail to create a user without input', async () => {
    const response = await request.post(`${API_ROUTE_V1}/auth/register`);
    expect(response.status).toBe(UNPROCESSABLE_ENTITY_422_HTTP_CODE);
  });

  it('should fail to create a user when email is invalid', async () => {
   
  });

  it('should fail to create a user without password', async () => {
  
  });

  it('should fail to create a user with too short password', async () => {
   
  });

  it('should fail to create a user with the same email address', async () => {
    
  });

  it('should succesfully register a user', async () => {

    const response = await request.post(`${API_ROUTE_V1}/auth/register`)
                                  .send(TEST_VALID_USER);

    const {user, token} = response.body;

    const permissions = await service.getUserPermissions({userId: user.id});
    const permissionsNames = R.pluck('name')(permissions);
    const defaultPermissionsNames =  R.pluck('name')(DEFAULT_USER_PERMISSIONS);
 
    expect(R.intersection(permissionsNames,defaultPermissionsNames).length)
          .toBe(DEFAULT_USER_PERMISSIONS.length);
    expect(response.status).toBe(CREATED_201_HTTP_CODE);
    expect(token).toMatch(/JWT/);
    expect(user.email).toEqual(TEST_VALID_USER.email);
  });

});