import initTests from '../../utils/initTests';
import {API_ROUTE_V1} from '../../../../utils/constants';
import {Response} from 'express';
import {OK_200_HTTP_CODE, FORBIDDEN_403_HTTP_CODE, UNAUTHORISED_401_HTTP_CODE,NOT_FOUND_404_HTTP_CODE, UNPROCESSABLE_ENTITY_422_HTTP_CODE} from '../../utils/constants';
import config from '../../../../config';
import {TEST_INVALID_JWT_TOKEN, TEST_VALID_REGISTER_USER } from '../../../../utils/testValues';
import expectError from '../../utils/expectError';
import generateJwtToken from '../../../../utils/jwt/generateToken';
import createUserWithPermission from '../../utils/createUserWithPermission';
import {CAN_UPDATE_COMMENT} from '../../../../utils/constants';
import {fakePosts} from '../../../../utils/fakesFactory';
import * as moment from 'moment';
import {  TEST_VALID_DESCRIPTION } from '../../../../utils/testValues';

describe(__filename, () => {

  const { service, request } = initTests();

  it('should fail to update comment when unauthenticated', async () => {
    const response = await request.patch(`${API_ROUTE_V1}/comments/1`);
    expectError(response, UNAUTHORISED_401_HTTP_CODE);
  });

  it('should fail to update comment when invalid token provided in authorization header', async () => {
    const response = await request.patch(`${API_ROUTE_V1}/comments/1`)
                                  .set('Authorization' , TEST_INVALID_JWT_TOKEN);
    expectError(response, UNAUTHORISED_401_HTTP_CODE);
  });

  it('should fail to update comment when insufficent permissions', async () => {
    const userWithoutPermissions = await service.createUser(TEST_VALID_REGISTER_USER);
    const validToken = await generateJwtToken({data: {id: userWithoutPermissions.id}});
    const response = await request.patch(`${API_ROUTE_V1}/comments/1`)
                                  .set('Authorization' , validToken);
    expectError(response, FORBIDDEN_403_HTTP_CODE);
  });

  it('should fail to update comment with user_id of not existing user', async () => {
    const user = await createUserWithPermission(service, CAN_UPDATE_COMMENT);
    const postData = fakePosts({
      count: 1,
      overrides: { user_id: user.id }, 
      only: ['id','user_id','title', 'body']
    }); 
    const createdPost: any = await service.createPost(postData);

    const commentToBeUpdated: any = await service.createComment({
      user_id: user.id, post_id: createdPost.id, body: TEST_VALID_DESCRIPTION
    });
    
    const validToken = await generateJwtToken({data: {id: user.id}});
    const response = await request.patch(`${API_ROUTE_V1}/comments/${commentToBeUpdated.id}`)
                                  .set('Authorization' , validToken)
                                  .send({
                                    user_id: 999
                                  });

    expectError(response, NOT_FOUND_404_HTTP_CODE);
  });

  it('should fail to update post for not existing post', async () => {
    const user = await createUserWithPermission(service, CAN_UPDATE_COMMENT);
    
    const validToken = await generateJwtToken({data: {id: user.id}});
    const response = await request.patch(`${API_ROUTE_V1}/comments/999`)
                                  .set('Authorization' , validToken)
                                  .send({
                                    body: TEST_VALID_DESCRIPTION
                                  });

    expectError(response, NOT_FOUND_404_HTTP_CODE);
  });

  it('should fail to update comment with user_id of not existing user', async () => {
    const user = await createUserWithPermission(service, CAN_UPDATE_COMMENT);
    const postData = fakePosts({
      count: 1,
      overrides: { user_id: user.id }, 
      only: ['id','user_id','title', 'body']
    }); 
    const createdPost: any = await service.createPost(postData);

    const commentToBeUpdated: any = await service.createComment({
      user_id: user.id, post_id: createdPost.id, body: TEST_VALID_DESCRIPTION
    });
    
    const validToken = await generateJwtToken({data: {id: user.id}});
    const response = await request.patch(`${API_ROUTE_V1}/comments/${commentToBeUpdated.id}`)
                                  .set('Authorization' , validToken)
                                  .send({
                                    post_id: 999
                                  });

    expectError(response, NOT_FOUND_404_HTTP_CODE);
  });

  it('should successfuly update comment with valid data', async () => {
    const user = await createUserWithPermission(service, CAN_UPDATE_COMMENT);
    const otherUser = await createUserWithPermission(service, CAN_UPDATE_COMMENT);
    const postData1 = fakePosts({
      count: 1,
      overrides: { user_id: user.id }, 
      only: ['id','user_id','title', 'body']
    }); 
    const postData2 = fakePosts({
      count: 1,
      overrides: { user_id: otherUser.id }, 
      only: ['id','user_id','title', 'body']
    }); 
    const createdPost: any = await service.createPost(postData1);
    const otherPost: any = await service.createPost(postData2);

    const commentToBeUpdated: any = await service.createComment({
      user_id: user.id, post_id: createdPost.id, body: TEST_VALID_DESCRIPTION
    });
    
    const validToken = await generateJwtToken({data: {id: user.id}});
    const response = await request.patch(`${API_ROUTE_V1}/comments/${commentToBeUpdated.id}`)
                                  .set('Authorization' , validToken)
                                  .send({
                                    user_id: otherUser.id,
                                    post_id: otherPost.id,
                                    body: TEST_VALID_DESCRIPTION,
                                  });

    const now = moment();
    const correctUpdateAt = moment.duration(now.diff(response.body.updated_at)).asMilliseconds() < 10000;
    expect(response.body.body).toEqual(TEST_VALID_DESCRIPTION); 
    expect(response.body.user_id).toEqual(otherUser.id); 
    expect(response.body.post_id).toEqual(otherPost.id); 
    expect(response.status).toBe(OK_200_HTTP_CODE);
  });

});