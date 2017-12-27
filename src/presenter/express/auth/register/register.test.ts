import initTests from '../../utils/initTests';
import {API_ROUTE_V1, DEFAULT_USER_PERMISSIONS} from '../../../../utils/constants';
import {Response} from 'express';
import {CREATED_201_HTTP_CODE, UNPROCESSABLE_ENTITY_422_HTTP_CODE, CONFLICT_409_HTTP_CODE} from '../../utils/constants';
import config from '../../../../config';
import {TEST_VALID_USER, TEST_INVALID_EMAIL, TEST_VALID_EMAIL, TEST_TOO_SHORT_PASSWORD, TEST_DIFFERENT_VALID_PASSWORD} from '../../../../utils/testValues';
import * as R  from 'ramda';

describe(__filename, () => {

  const { service, request } = initTests();

  it('should fail to create a user without input', async () => {
    const response = await request.post(`${API_ROUTE_V1}/auth/register`);
    expect(response.status).toBe(UNPROCESSABLE_ENTITY_422_HTTP_CODE);
  });

  it('should fail to create a user when email is invalid', async () => {
    const response = await request.post(`${API_ROUTE_V1}/auth/register`)
                                  .send({email: TEST_INVALID_EMAIL});
    expect(response.status).toBe(UNPROCESSABLE_ENTITY_422_HTTP_CODE);
  });

  it('should fail to create a user without password', async () => {
    const response = await request.post(`${API_ROUTE_V1}/auth/register`)
                                  .send({email: TEST_VALID_EMAIL});
    expect(response.status).toBe(UNPROCESSABLE_ENTITY_422_HTTP_CODE);
  });

  it('should fail to create a user with too short password', async () => {
    const response = await request.post(`${API_ROUTE_V1}/auth/register`)
                                  .send({
                                    email: TEST_VALID_EMAIL, 
                                    password: TEST_TOO_SHORT_PASSWORD
                                  });
    expect(response.status).toBe(UNPROCESSABLE_ENTITY_422_HTTP_CODE);
  });

  it('should fail to create a user with the same email address', async () => {
    const user = await service.register(TEST_VALID_USER);
  
    const response = await request.post(`${API_ROUTE_V1}/auth/register`)
                                  .send(TEST_VALID_USER);
                                  
    expect(response.status).toBe(CONFLICT_409_HTTP_CODE);
  });

  it('should fail to create a user when the password does not match password_confirmation', async () => {
  
    const response = await request.post(`${API_ROUTE_V1}/auth/register`)
                                  .send({
                                    email: TEST_VALID_EMAIL, 
                                    password: TEST_VALID_EMAIL,
                                    password_confirmation: TEST_DIFFERENT_VALID_PASSWORD
                                  });
    expect(response.status).toBe(UNPROCESSABLE_ENTITY_422_HTTP_CODE);
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