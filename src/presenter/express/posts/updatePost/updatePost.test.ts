import initTests from '../../utils/initTests';
import {API_ROUTE_V1} from '../../../../utils/constants';
import {Response} from 'express';
import { OK, CREATED, FORBIDDEN, UNAUTHORIZED, NOT_FOUND, CONFLICT } from 'http-status-codes';
import config from '../../../../config';
import {TEST_INVALID_JWT_TOKEN, TEST_INVALID_EMAIL,TEST_DIFFERENT_VALID_EMAIL, TEST_DIFFERENT_VALID_PASSWORD,TEST_VALID_PASSWORD, TEST_TOO_SHORT_PASSWORD,TEST_VALID_ANOTHER_REGIRSTER_USER, TEST_VALID_REGISTER_USER } from '../../../../utils/testValues';
import expectError from '../../utils/expectError';
import generateJwtToken from '../../../../utils/jwt/generateToken';
import createUserWithPermission from '../../utils/createUserWithPermission';
import {CAN_UPDATE_POST, DEFAULT_USERS_PAGINATION_LIMIT, DEFAULT_USERS_PAGINATION_OFFSET} from '../../../../utils/constants';
import {fakePosts} from '../../../../utils/fakesFactory';
import verifyPassword from '../../../../utils/verifyPassword';
import * as moment from 'moment';
import { TEST_VALID_TITLE, TEST_VALID_DESCRIPTION } from '../../../../utils/testValues';

describe(__filename, () => {

  const { service, request } = initTests();

  it('should fail to update post when unauthenticated', async () => {
    const response = await request.patch(`${API_ROUTE_V1}/posts/1`);
    expectError(response, UNAUTHORIZED);
  });

  it('should fail to update post when invalid token provided in authorization header', async () => {
    const response = await request.patch(`${API_ROUTE_V1}/posts/1`)
                                  .set('Authorization' , TEST_INVALID_JWT_TOKEN);
    expectError(response, UNAUTHORIZED);
  });

  it('should fail to update post when insufficent permissions', async () => {
    const userWithoutPermissions = await service.createUser(TEST_VALID_REGISTER_USER);
    const validToken = await generateJwtToken({data: {id: userWithoutPermissions.id}});
    const response = await request.patch(`${API_ROUTE_V1}/posts/${userWithoutPermissions.id}`)
                                  .set('Authorization' , validToken);
    expectError(response, FORBIDDEN);
  });

  it('should fail to update post with user_id of not existing user', async () => {
    const user = await createUserWithPermission(service, CAN_UPDATE_POST);
    const postData = fakePosts({
      count: 1,
      overrides: { user_id: user.id }, 
      only: ['user_id','title', 'body']
    }); 
    const postToBeUpdated = await service.createPost(postData);
    
    const validToken = await generateJwtToken({data: {id: user.id}});
    const response = await request.patch(`${API_ROUTE_V1}/posts/${postToBeUpdated.id}`)
                                  .set('Authorization' , validToken)
                                  .send({
                                    user_id: 999
                                  });

    expectError(response, NOT_FOUND);
  });

  it('should fail to update post for not existing post', async () => {
    const user = await createUserWithPermission(service, CAN_UPDATE_POST);
    const postData = fakePosts({
      count: 1,
      overrides: { user_id: user.id }, 
      only: ['user_id','title', 'body']
    }); 
    const postToBeUpdated = await service.createPost(postData);
    
    const validToken = await generateJwtToken({data: {id: user.id}});
    const response = await request.patch(`${API_ROUTE_V1}/posts/999`)
                                  .set('Authorization' , validToken)
                                  .send({
                                    title: TEST_VALID_TITLE
                                  });

    expectError(response, NOT_FOUND);
  });

  it('should successfuly update post with valid data', async () => {
    const user = await createUserWithPermission(service, CAN_UPDATE_POST);
    const otherUser = await createUserWithPermission(service, CAN_UPDATE_POST);
    const postData = fakePosts({
      count: 1,
      overrides: { user_id: user.id }, 
      only: ['user_id','title', 'body']
    }); 
    const postToBeUpdated = await service.createPost(postData);
    
    const validToken = await generateJwtToken({data: {id: user.id}});
    const response = await request.patch(`${API_ROUTE_V1}/posts/${postToBeUpdated.id}`)
                                  .set('Authorization' , validToken)
                                  .send({
                                    user_id: otherUser.id,
                                    title: TEST_VALID_TITLE,
                                    body: TEST_VALID_DESCRIPTION,
                                  });

    const updatedPost = response.body;
    const now = moment();
    const correctUpdateAt = moment.duration(now.diff(response.body.updated_at)).asMilliseconds() < 10000;
    expect(response.body.title).toEqual(TEST_VALID_TITLE);   
    expect(response.body.body).toEqual(TEST_VALID_DESCRIPTION); 
    expect(response.body.user_id).toEqual(otherUser.id); 
    expect(response.status).toBe(OK);
  });
});