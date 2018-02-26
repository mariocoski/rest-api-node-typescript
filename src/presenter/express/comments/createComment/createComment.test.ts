import initTests from '../../utils/initTests';
import {API_ROUTE_V1} from '../../../../utils/constants';
import {Response} from 'express';
import { CREATED, FORBIDDEN, NOT_FOUND, UNAUTHORIZED, UNPROCESSABLE_ENTITY } from 'http-status-codes'; 
import config from '../../../../config';
import {TEST_INVALID_JWT_TOKEN,TEST_VALID_EMAIL,TEST_VALID_DESCRIPTION, TEST_INVALID_EMAIL, TEST_DIFFERENT_VALID_PASSWORD,TEST_VALID_PASSWORD, TEST_TOO_SHORT_PASSWORD, TEST_VALID_REGISTER_USER } from '../../../../utils/testValues';
import expectError from '../../utils/expectError';
import generateJwtToken from '../../../../utils/jwt/generateToken';
import createUserWithPermission from '../../utils/createUserWithPermission';
import {CAN_CREATE_COMMENT} from '../../../../utils/constants';
import {fakeUsers, fakePosts} from '../../../../utils/fakesFactory';
import verifyPassword from '../../../../utils/verifyPassword';
import * as moment from 'moment';

describe(__filename, () => {

  const { service, request } = initTests();

  it('should fail to create comment when unauthenticated', async () => {
    const response = await request.post(`${API_ROUTE_V1}/comments`);
    expectError(response, UNAUTHORIZED);
  });

  it('should fail to create comment when invalid token provided in authorization header', async () => {
    const response = await request.post(`${API_ROUTE_V1}/comments`)
                                  .set('Authorization' , TEST_INVALID_JWT_TOKEN);
    expectError(response, UNAUTHORIZED);
  });

  it('should fail to create comment when insufficent permissions', async () => {
    const userWithoutPermissions = await service.createUser(TEST_VALID_REGISTER_USER);
    const validToken = await generateJwtToken({data: {id: userWithoutPermissions.id}});
    const response = await request.post(`${API_ROUTE_V1}/comments`)
                                  .set('Authorization' , validToken);
    expectError(response, FORBIDDEN);
  });

  it('should fail to create comment for post which does not exist', async () => {
    const user = await createUserWithPermission(service, CAN_CREATE_COMMENT);
    
    const validToken = await generateJwtToken({data: {id: user.id}});
    const response = await request.post(`${API_ROUTE_V1}/comments`)
                                  .set('Authorization' , validToken)
                                  .send({
                                    post_id: 999,
                                    user_id: user.id,
                                    body: TEST_VALID_DESCRIPTION
                                  });

    expectError(response, NOT_FOUND);
  });

  it('should fail to create comment for post which does not exist', async () => {
    const user = await createUserWithPermission(service, CAN_CREATE_COMMENT);
    const postData = fakePosts({
      count: 1,
      overrides: { user_id: user.id }, 
      only: ['user_id','title', 'body']
    }); 
    const createdPost = await service.createPost(postData);

    const validToken = await generateJwtToken({data: {id: user.id}});
    const response = await request.post(`${API_ROUTE_V1}/comments`)
                                  .set('Authorization' , validToken)
                                  .send({
                                    post_id: createdPost.id,
                                    user_id: 999,
                                    body: TEST_VALID_DESCRIPTION
                                  });

    expectError(response, NOT_FOUND);
  });

  it('should successfuly create comment with valid data', async () => {
    const user = await createUserWithPermission(service, CAN_CREATE_COMMENT);
    const postData = fakePosts({
      count: 1,
      overrides: { user_id: user.id }, 
      only: ['user_id','title', 'body']
    }); 
    const createdPost = await service.createPost(postData);

    const validToken = await generateJwtToken({data: {id: user.id}});
    const response = await request.post(`${API_ROUTE_V1}/comments`)
                                  .set('Authorization' , validToken)
                                  .send({
                                    post_id: createdPost.id,
                                    user_id: user.id,
                                    body: TEST_VALID_DESCRIPTION
                                  });
    const createdUser = response.body;
    const now = moment();
    const correctCreatedAt = moment.duration(now.diff(response.body.created_at)).asMilliseconds() < 10000; 
    expect(createdUser.user_id).toEqual(user.id);   
    expect(createdUser.post_id).toEqual(createdPost.id);       
    expect(correctCreatedAt).toBe(true);
    expect(response.status).toBe(CREATED);
  });

});