import initTests from '../../utils/initTests';
import {API_ROUTE_V1} from '../../../../utils/constants';
import {Response} from 'express';
import {OK_200_HTTP_CODE, FORBIDDEN_403_HTTP_CODE, UNAUTHORISED_401_HTTP_CODE} from '../../utils/constants';
import config from '../../../../config';
import {TEST_INVALID_JWT_TOKEN, TEST_VALID_REGISTER_USER } from '../../../../utils/testValues';
import expectError from '../../utils/expectError';
import generateJwtToken from '../../../../utils/jwt/generateToken';
import createUserWithPermission from '../../utils/createUserWithPermission';
import {CAN_GET_COMMENTS, DEFAULT_COMMENTS_PAGINATION_LIMIT, DEFAULT_COMMENTS_PAGINATION_OFFSET} from '../../../../utils/constants';
import {fakePosts, fakeComments} from '../../../../utils/fakesFactory';

describe(__filename, () => {

  const { service, request } = initTests();

  it('should fail to get comments when unauthenticated', async () => {
    const response = await request.get(`${API_ROUTE_V1}/comments`);
    expectError(response, UNAUTHORISED_401_HTTP_CODE);
  });

  it('should fail to get comments when invalid token provided in authorization header', async () => {
    const response = await request.get(`${API_ROUTE_V1}/comments`)
                                  .set('Authorization' , TEST_INVALID_JWT_TOKEN);
    expectError(response, UNAUTHORISED_401_HTTP_CODE);
  });

  it('should fail to get user when insufficent permissions', async () => {
    const userWithoutPermissions = await service.createUser(TEST_VALID_REGISTER_USER);
    const validToken = await generateJwtToken({data: {id: userWithoutPermissions.id}});
    const response = await request.get(`${API_ROUTE_V1}/comments/1`)
                                  .set('Authorization' , validToken);
    expectError(response, FORBIDDEN_403_HTTP_CODE);
  });

  it('should get comments when has required permissions and passed offset and limit', async () => {
    const user = await createUserWithPermission(service, CAN_GET_COMMENTS);
    const postData = fakePosts({
      count: 1,
      overrides: { user_id: user.id }, 
      only: ['id','user_id','title', 'body']
    }); 
    const createdPost: any = await service.createPost(postData);

    const comments = fakeComments({
      count: 6, 
      only: ['id','body', 'post_id','user_id'],
      overrides: { post_id:createdPost.id, user_id: user.id },
    }).map(async (user: any) => {
      return service.createComment(user);
    }); 
    await Promise.all(comments);

    const validToken = await generateJwtToken({data: {id: user.id}});

    const response = await request.get(`${API_ROUTE_V1}/comments?offset=0&limit=5`)
                                  .set('Authorization', validToken);
    expect(response.body.count).toBe(5);
    expect(response.body.total).toBe(6);
    expect(response.body.currentPage).toBe(1);
    expect(response.status).toBe(OK_200_HTTP_CODE);
  });

  it('should get comments when offset and limit provided', async () => {
    const user = await createUserWithPermission(service, CAN_GET_COMMENTS);
    const postData = fakePosts({
      count: 1,
      overrides: { user_id: user.id }, 
      only: ['id','user_id','title', 'body']
    }); 
    const createdPost: any = await service.createPost(postData);

    const comments = fakeComments({
      count: 10, 
      only: ['id','body', 'post_id','user_id'],
      overrides: { post_id:createdPost.id, user_id: user.id },
    }).map(async (user: any) => {
      return service.createComment(user);
    }); 
    await Promise.all(comments);

    const validToken = await generateJwtToken({data: {id: user.id}});

    const response = await request.get(`${API_ROUTE_V1}/comments?offset=0&limit=5`)
                                  .set('Authorization', validToken);
    expect(response.body.count).toBe(5);
    expect(response.body.total).toBe(10);
    expect(response.body.currentPage).toBe(1);
    expect(response.status).toBe(OK_200_HTTP_CODE);
  });

  it('should get comments sorted according to the keys provided', async () => {
    const user = await createUserWithPermission(service, CAN_GET_COMMENTS);
    const postData = fakePosts({
      count: 1,
      overrides: { user_id: user.id }, 
      only: ['id','user_id','title', 'body']
    }); 
    const createdPost: any = await service.createPost(postData);

    const comments = fakeComments({
      count: 5, 
      only: ['id','body', 'post_id','user_id'],
      overrides: { post_id:createdPost.id, user_id: user.id },
    }).map(async (user: any) => {
      return service.createComment(user);
    }); 
    await Promise.all(comments);

    const validToken = await generateJwtToken({data: {id: user.id}});

    const response = await request.get(`${API_ROUTE_V1}/comments?sort=id:desc`)
                                  .set('Authorization', validToken);
    expect(response.status).toBe(OK_200_HTTP_CODE);
    expect(response.body.data[0].id).toBe(5);
  });

});