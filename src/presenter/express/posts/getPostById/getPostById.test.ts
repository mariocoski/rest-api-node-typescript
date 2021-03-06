import initTests from '../../utils/initTests';
import {API_ROUTE_V1,AUTH_PARAM_NAME} from '../../../../utils/constants';
import {Response} from 'express';
import { OK, CREATED, FORBIDDEN, UNAUTHORIZED, NOT_FOUND, CONFLICT } from 'http-status-codes';
import config from '../../../../config';
import {TEST_INVALID_JWT_TOKEN, TEST_VALID_ANOTHER_REGIRSTER_USER, TEST_VALID_REGISTER_USER } from '../../../../utils/testValues';
import expectError from '../../utils/expectError';
import generateJwtToken from '../../../../utils/jwt/generateToken';
import createUserWithPermission from '../../utils/createUserWithPermission';
import {CAN_GET_POST} from '../../../../utils/constants';
import {fakePosts} from '../../../../utils/fakesFactory';

describe(__filename, () => {

  const { service, request } = initTests();

  it('should fail to get post when unauthenticated', async () => {
    const response = await request.get(`${API_ROUTE_V1}/posts/1`);
    expectError(response, UNAUTHORIZED);
  });

  it('should fail to get post when invalid token provided', async () => {
    const response = await request.get(`${API_ROUTE_V1}/posts/1`)
                                  .set('Authorization' , TEST_INVALID_JWT_TOKEN);
    expectError(response, UNAUTHORIZED);
  });

  it('should fail to get post when insufficent permissions', async () => {
    const userWithoutPermissions = await service.createUser(TEST_VALID_REGISTER_USER);
    const validToken = await generateJwtToken({data: {id: userWithoutPermissions.id}});
    const response = await request.get(`${API_ROUTE_V1}/posts/1`)
                                  .set('Authorization' , validToken);
    expectError(response, FORBIDDEN);
  });

  it('should fail get post when it does not exist', async () => {
    const user = await createUserWithPermission(service, CAN_GET_POST);
    const validToken = await generateJwtToken({data: {id: user.id}});
    const response = await request.get(`${API_ROUTE_V1}/posts/999`)
                                  .set('Authorization', validToken);
    expectError(response, NOT_FOUND);
  });

  it('should get post data when has permission to see it', async () => {
    const user = await createUserWithPermission(service, CAN_GET_POST);
    const postData = fakePosts({
      count: 1,
      overrides: { user_id: user.id }, 
      only: ['user_id','title', 'body']
    }); 
    const postToBeFetched = await service.createPost(postData);
    
    const validToken = await generateJwtToken({data: {id: user.id}});
    const response = await request.get(`${API_ROUTE_V1}/posts/${postToBeFetched.id}`)
                                  .set('Authorization', validToken);
    expect(response.status).toBe(OK);
    expect(response.body.title).toBe(postToBeFetched.title);
    expect(response.body.body).toBe(postToBeFetched.body);
    expect(response.body.comments.length).toBe(0);
  });
});