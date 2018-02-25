import initTests from '../../utils/initTests';
import {API_ROUTE_V1} from '../../../../utils/constants';
import {Response} from 'express';
import { OK, CREATED, FORBIDDEN, UNAUTHORIZED, NOT_FOUND, CONFLICT } from 'http-status-codes';
import config from '../../../../config';
import {TEST_INVALID_JWT_TOKEN, TEST_VALID_REGISTER_USER } from '../../../../utils/testValues';
import expectError from '../../utils/expectError';
import generateJwtToken from '../../../../utils/jwt/generateToken';
import createUserWithPermission from '../../utils/createUserWithPermission';
import {CAN_DELETE_POST} from '../../../../utils/constants';
import {fakePosts} from '../../../../utils/fakesFactory';

describe(__filename, () => {

  const { service, request } = initTests();

  it('should fail to delete post when unauthenticated', async () => {
    const response = await request.delete(`${API_ROUTE_V1}/posts/1`);
    expectError(response, UNAUTHORIZED);
  });

  it('should fail to delete post when invalid token provided in authorization header', async () => {
    const response = await request.delete(`${API_ROUTE_V1}/posts/1`)
                                  .set('Authorization' , TEST_INVALID_JWT_TOKEN);
    expectError(response, UNAUTHORIZED);
  });

  it('should fail to delete post when insufficent permissions', async () => {
    const userWithoutPermissions = await service.createUser(TEST_VALID_REGISTER_USER);
    const validToken = await generateJwtToken({data: {id: userWithoutPermissions.id}});
    const response = await request.delete(`${API_ROUTE_V1}/posts/1`)
                                  .set('Authorization' , validToken);
    expectError(response, FORBIDDEN);
  });

  it('should fail to delete post which does not exists', async () => {
    const user = await createUserWithPermission(service, CAN_DELETE_POST);
    
    const validToken = await generateJwtToken({data: {id: user.id}});
    const response = await request.delete(`${API_ROUTE_V1}/posts/999`)
                                  .set('Authorization' , validToken);

    expectError(response, NOT_FOUND);
  });

  it('should successfuly delete post when authenticated and have permissions', async () => {
    const user = await createUserWithPermission(service, CAN_DELETE_POST);
    const postData = fakePosts({
      count: 1,
      overrides: { user_id: user.id }, 
      only: ['id','user_id','title', 'body']
    }); 
    const postToBeDeleted = await service.createPost(postData);
    const validToken = await generateJwtToken({data: {id: user.id}});
    const response = await request.delete(`${API_ROUTE_V1}/posts/${postToBeDeleted.id}`)
                                  .set('Authorization' , validToken);

    expect(response.status).toBe(OK);

    const secondResponse = await request.delete(`${API_ROUTE_V1}/posts/${postToBeDeleted.id}`)
                                        .set('Authorization' , validToken);

    expect(secondResponse.status).toBe(NOT_FOUND);
  });
});