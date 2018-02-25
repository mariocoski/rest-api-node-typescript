import initTests from '../../utils/initTests';
import {API_ROUTE_V1} from '../../../../utils/constants';
import {Response} from 'express';
import { OK, CREATED, FORBIDDEN, UNAUTHORIZED, CONFLICT } from 'http-status-codes';
import config from '../../../../config';
import {TEST_INVALID_JWT_TOKEN,TEST_VALID_EMAIL, TEST_VALID_DESCRIPTION, TEST_VALID_TITLE, TEST_DIFFERENT_VALID_PASSWORD,TEST_VALID_PASSWORD, TEST_TOO_SHORT_PASSWORD, TEST_VALID_REGISTER_USER } from '../../../../utils/testValues';
import expectError from '../../utils/expectError';
import generateJwtToken from '../../../../utils/jwt/generateToken';
import createUserWithPermission from '../../utils/createUserWithPermission';
import {CAN_CREATE_PERMISSION} from '../../../../utils/constants';
import {fakeUsers} from '../../../../utils/fakesFactory';
import verifyPassword from '../../../../utils/verifyPassword';
import * as moment from 'moment';

describe(__filename, () => {

  const { service, request } = initTests();

  it('should fail to create permission when unauthenticated', async () => {
    const response = await request.post(`${API_ROUTE_V1}/permissions`);
    expectError(response, UNAUTHORIZED);
  });

  it('should fail to create permission when invalid token provided in authorization header', async () => {
    const response = await request.post(`${API_ROUTE_V1}/permissions`)
                                  .set('Authorization' , TEST_INVALID_JWT_TOKEN);
    expectError(response, UNAUTHORIZED);
  });

  it('should fail to create permission when insufficent permissions', async () => {
    const userWithoutPermissions = await service.createUser(TEST_VALID_REGISTER_USER);
    const validToken = await generateJwtToken({data: {id: userWithoutPermissions.id}});
    const response = await request.post(`${API_ROUTE_V1}/permissions`)
                                  .set('Authorization' , validToken);
    expectError(response, FORBIDDEN);
  });

  it('should fail to create permission when permission name does exist', async () => {
    const user = await createUserWithPermission(service, CAN_CREATE_PERMISSION);
    const createdRole = await service.createPermission({
      name: TEST_VALID_TITLE
    });
    const validToken = await generateJwtToken({data: {id: user.id}});
    const response = await request.post(`${API_ROUTE_V1}/permissions`)
                                  .set('Authorization' , validToken)
                                  .send({
                                    name: TEST_VALID_TITLE
                                  });

    expectError(response, CONFLICT);
  });

  it('should successfuly create permission when data are valid', async () => {
    const user = await createUserWithPermission(service, CAN_CREATE_PERMISSION);
  
    const validToken = await generateJwtToken({data: {id: user.id}});
    const response = await request.post(`${API_ROUTE_V1}/permissions`)
                                  .set('Authorization' , validToken)
                                  .send({
                                    name: TEST_VALID_TITLE,
                                    label: TEST_VALID_TITLE,
                                    description: TEST_VALID_DESCRIPTION
                                  });
    const createdPermission = response.body;
  
    const now = moment(new Date());
    const correctCreatedAt = moment.duration(now.diff(response.body.created_at)).asMilliseconds() < 10000;
    expect(createdPermission.name).toEqual(TEST_VALID_TITLE);  
    expect(createdPermission.label).toEqual(TEST_VALID_TITLE);   
    expect(createdPermission.description).toEqual(TEST_VALID_DESCRIPTION);          
    expect(correctCreatedAt).toBe(true);
    expect(response.status).toBe(CREATED);
  });
});