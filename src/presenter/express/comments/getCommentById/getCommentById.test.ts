import initTests from '../../utils/initTests';
import {API_ROUTE_V1,AUTH_PARAM_NAME} from '../../../../utils/constants';
import {Response} from 'express';
import { OK, NOT_FOUND, FORBIDDEN, UNAUTHORIZED } from 'http-status-codes'; 
import config from '../../../../config';
import {TEST_INVALID_JWT_TOKEN, TEST_VALID_ANOTHER_REGIRSTER_USER, TEST_VALID_DESCRIPTION, TEST_VALID_REGISTER_USER } from '../../../../utils/testValues';
import expectError from '../../utils/expectError';
import generateJwtToken from '../../../../utils/jwt/generateToken';
import createUserWithPermission from '../../utils/createUserWithPermission';
import {CAN_GET_COMMENT} from '../../../../utils/constants';
import {fakePosts} from '../../../../utils/fakesFactory';

describe(__filename, () => {

  const { service, request } = initTests();

  it('should fail to get comment when unauthenticated', async () => {
    const response = await request.get(`${API_ROUTE_V1}/comments/1`);
    expectError(response, UNAUTHORIZED);
  });

  it('should fail to get comment when invalid token provided', async () => {
    const response = await request.get(`${API_ROUTE_V1}/comments/1`)
                                  .set('Authorization' , TEST_INVALID_JWT_TOKEN);
    expectError(response, UNAUTHORIZED);
  });

  it('should fail to get comment when insufficent permissions', async () => {
    const userWithoutPermissions = await service.createUser(TEST_VALID_REGISTER_USER);
    const validToken = await generateJwtToken({data: {id: userWithoutPermissions.id}});
    const response = await request.get(`${API_ROUTE_V1}/comments/1`)
                                  .set('Authorization' , validToken);
    expectError(response, FORBIDDEN);
  });

  it('should fail get comment when it does not exist', async () => {
    const user = await createUserWithPermission(service, CAN_GET_COMMENT);
    const validToken = await generateJwtToken({data: {id: user.id}});
    const response = await request.get(`${API_ROUTE_V1}/comments/999`)
                                  .set('Authorization', validToken);
    expectError(response, NOT_FOUND);
  });

  it('should get comment data when has permission to see it', async () => {
    const user = await createUserWithPermission(service, CAN_GET_COMMENT);
    const postData = fakePosts({
      count: 1,
      overrides: { user_id: user.id }, 
      only: ['id','user_id','title', 'body']
    }); 
    const createdPost: any = await service.createPost(postData);

    const commentToBeFetched: any = await service.createComment({
      user_id: user.id, post_id: createdPost.id, body: TEST_VALID_DESCRIPTION
    });
    
    const validToken = await generateJwtToken({data: {id: user.id}});
    const response = await request.get(`${API_ROUTE_V1}/comments/${commentToBeFetched.id}`)
                                  .set('Authorization', validToken);
    expect(response.status).toBe(OK);
    expect(response.body.body).toBe(commentToBeFetched.body);
    expect(response.body.user_id).toBe(commentToBeFetched.user_id);
    expect(response.body.post_id).toBe(commentToBeFetched.post_id);
  });
});