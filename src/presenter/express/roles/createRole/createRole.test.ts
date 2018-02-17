import initTests from '../../utils/initTests';
import {API_ROUTE_V1} from '../../../../utils/constants';
import {Response} from 'express';
import {CREATED_201_HTTP_CODE, FORBIDDEN_403_HTTP_CODE, CONFLICT_409_HTTP_CODE, UNAUTHORISED_401_HTTP_CODE, UNPROCESSABLE_ENTITY_422_HTTP_CODE} from '../../utils/constants';
import config from '../../../../config';
import {TEST_INVALID_JWT_TOKEN,TEST_VALID_EMAIL, TEST_VALID_DESCRIPTION, TEST_VALID_TITLE, TEST_DIFFERENT_VALID_PASSWORD,TEST_VALID_PASSWORD, TEST_TOO_SHORT_PASSWORD, TEST_VALID_REGISTER_USER } from '../../../../utils/testValues';
import expectError from '../../utils/expectError';
import generateJwtToken from '../../../../utils/jwt/generateToken';
import createUserWithPermission from '../../utils/createUserWithPermission';
import {CAN_CREATE_ROLE} from '../../../../utils/constants';
import {fakeUsers} from '../../../../utils/fakesFactory';
import verifyPassword from '../../../../utils/verifyPassword';
import * as moment from 'moment';

describe(__filename, () => {

  const { service, request } = initTests();

  it('should fail to create role when unauthenticated', async () => {
    const response = await request.post(`${API_ROUTE_V1}/roles`);
    expectError(response, UNAUTHORISED_401_HTTP_CODE);
  });

  it('should fail to create role when invalid token provided in authorization header', async () => {
    const response = await request.post(`${API_ROUTE_V1}/roles`)
                                  .set('Authorization' , TEST_INVALID_JWT_TOKEN);
    expectError(response, UNAUTHORISED_401_HTTP_CODE);
  });

  it('should fail to create role when insufficent permissions', async () => {
    const userWithoutPermissions = await service.createUser(TEST_VALID_REGISTER_USER);
    const validToken = await generateJwtToken({data: {id: userWithoutPermissions.id}});
    const response = await request.post(`${API_ROUTE_V1}/roles`)
                                  .set('Authorization' , validToken);
    expectError(response, FORBIDDEN_403_HTTP_CODE);
  });

  it('should fail to create user when role name does exist', async () => {
    const user = await createUserWithPermission(service, CAN_CREATE_ROLE);
    const createdRole = await service.createRole({
      name: TEST_VALID_TITLE
    });
    const validToken = await generateJwtToken({data: {id: user.id}});
    const response = await request.post(`${API_ROUTE_V1}/roles`)
                                  .set('Authorization' , validToken)
                                  .send({
                                    name: TEST_VALID_TITLE
                                  });

    expectError(response, CONFLICT_409_HTTP_CODE);
  });

  it('should successfuly create role when data are valid', async () => {
    const user = await createUserWithPermission(service, CAN_CREATE_ROLE);
  
    const validToken = await generateJwtToken({data: {id: user.id}});
    const response = await request.post(`${API_ROUTE_V1}/roles`)
                                  .set('Authorization' , validToken)
                                  .send({
                                    name: TEST_VALID_TITLE,
                                    description: TEST_VALID_DESCRIPTION
                                  });
    const createdRole = response.body;
  
    const now = moment(new Date());
    const correctCreatedAt = moment.duration(now.diff(response.body.created_at)).asMilliseconds() < 10000;
    expect(createdRole.name).toEqual(TEST_VALID_TITLE);   
    expect(createdRole.description).toEqual(TEST_VALID_DESCRIPTION);          
    expect(correctCreatedAt).toBe(true);
    expect(response.status).toBe(CREATED_201_HTTP_CODE);
  });



});