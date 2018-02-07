import initTests from '../../utils/initTests';
import {API_ROUTE_V1} from '../../../../utils/constants';
import {Response} from 'express';
import {OK_200_HTTP_CODE, FORBIDDEN_403_HTTP_CODE, CONFLICT_409_HTTP_CODE, UNAUTHORISED_401_HTTP_CODE, UNPROCESSABLE_ENTITY_422_HTTP_CODE} from '../../utils/constants';
import config from '../../../../config';
import {TEST_INVALID_JWT_TOKEN,TEST_VALID_EMAIL, TEST_INVALID_EMAIL, TEST_DIFFERENT_VALID_PASSWORD,TEST_VALID_PASSWORD, TEST_TOO_SHORT_PASSWORD, TEST_VALID_REGISTER_USER } from '../../../../utils/testValues';
import expectError from '../../utils/expectError';
import generateJwtToken from '../../../../utils/jwt/generateToken';
import createUserWithPermission from '../../utils/createUserWithPermission';
import {CAN_CREATE_USER} from '../../../../utils/constants';
import {fakeUsers} from '../../../../utils/fakesFactory';
import verifyPassword from '../../../../utils/verifyPassword';
import * as moment from 'moment';

describe(__filename, () => {

  const { service, request } = initTests();

  it('should fail to create user when unauthenticated', async () => {
    const response = await request.post(`${API_ROUTE_V1}/users`);
    expectError(response, UNAUTHORISED_401_HTTP_CODE);
  });

  it('should fail to create user when invalid token provided in authorization header', async () => {
    const response = await request.post(`${API_ROUTE_V1}/users`)
                                  .set('Authorization' , TEST_INVALID_JWT_TOKEN);
    expectError(response, UNAUTHORISED_401_HTTP_CODE);
  });

  it('should fail to create user when insufficent permissions', async () => {
    const userWithoutPermissions = await service.createUser(TEST_VALID_REGISTER_USER);
    const validToken = await generateJwtToken({data: {id: userWithoutPermissions.id}});
    const response = await request.post(`${API_ROUTE_V1}/users`)
                                  .set('Authorization' , validToken);
    expectError(response, FORBIDDEN_403_HTTP_CODE);
  });

  it('should fail to create user with invalid user email', async () => {
    const user = await createUserWithPermission(service, CAN_CREATE_USER);
    
    const validToken = await generateJwtToken({data: {id: user.id}});
    const response = await request.post(`${API_ROUTE_V1}/users`)
                                  .set('Authorization' , validToken)
                                  .send({
                                    email: TEST_INVALID_EMAIL
                                  });

    expectError(response, UNPROCESSABLE_ENTITY_422_HTTP_CODE);
  });

  it('should fail to create user with too short password', async () => {
    const user = await createUserWithPermission(service, CAN_CREATE_USER);
    
    const validToken = await generateJwtToken({data: {id: user.id}});
    const response = await request.post(`${API_ROUTE_V1}/users`)
                                  .set('Authorization' , validToken)
                                  .send({
                                    email: TEST_VALID_EMAIL,
                                    password: TEST_TOO_SHORT_PASSWORD
                                  });

    expectError(response, UNPROCESSABLE_ENTITY_422_HTTP_CODE);
  });


  it('should fail to create user without password confirmation', async () => {
    const user = await createUserWithPermission(service, CAN_CREATE_USER);
    
    const validToken = await generateJwtToken({data: {id: user.id}});
    const response = await request.post(`${API_ROUTE_V1}/users`)
                                  .set('Authorization' , validToken)
                                  .send({
                                    email: TEST_VALID_EMAIL,
                                    password: TEST_VALID_PASSWORD
                                  });
    expectError(response, UNPROCESSABLE_ENTITY_422_HTTP_CODE);
  });

  it('should fail to create user when password and password_confirmation don\'t match', async () => {
    const user = await createUserWithPermission(service, CAN_CREATE_USER);
    
    const validToken = await generateJwtToken({data: {id: user.id}});
    const response = await request.post(`${API_ROUTE_V1}/users`)
                                  .set('Authorization' , validToken)
                                  .send({
                                    email: TEST_VALID_EMAIL,
                                    password: TEST_VALID_PASSWORD,
                                    password_confirmation: TEST_DIFFERENT_VALID_PASSWORD
                                  });
    expectError(response, UNPROCESSABLE_ENTITY_422_HTTP_CODE);
  });

  it('should fail to create user when email does exists', async () => {
    const user = await createUserWithPermission(service, CAN_CREATE_USER);
    
    const validToken = await generateJwtToken({data: {id: user.id}});
    const response = await request.post(`${API_ROUTE_V1}/users`)
                                  .set('Authorization' , validToken)
                                  .send({
                                    email: user.email,
                                    password: TEST_VALID_PASSWORD,
                                    password_confirmation: TEST_VALID_PASSWORD
                                  });
    expectError(response, CONFLICT_409_HTTP_CODE);
  });

  it('should successfuly create user when password and password_confirmation match', async () => {
    const user = await createUserWithPermission(service, CAN_CREATE_USER);
    const newUser = fakeUsers({count: 1, only: [
      'email', 'firstname', 'password', 'lastname', 'bio', 'password_confirmation'
    ]});
    const validToken = await generateJwtToken({data: {id: user.id}});
    const response = await request.post(`${API_ROUTE_V1}/users`)
                                  .set('Authorization' , validToken)
                                  .send(newUser);
    const createdUser = response.body;
    const match = await verifyPassword(newUser.password, createdUser.password); 
    expect(match).toBe(true);
    const now = moment(new Date());
    const correctCreatedAt = moment.duration(now.diff(response.body.created_at)).asMilliseconds() < 10000;
    expect(createdUser.email).toEqual(newUser.email);   
    expect(createdUser.bio).toEqual(newUser.bio);   
    expect(createdUser.firstname).toEqual(newUser.firstname);   
    expect(createdUser.lastname).toEqual(newUser.lastname);         
    expect(correctCreatedAt).toBe(true);
    expect(response.status).toBe(OK_200_HTTP_CODE);
  });



});