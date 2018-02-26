import initTests from '../../utils/initTests';
import {API_ROUTE_V1} from '../../../../utils/constants';
import {Response} from 'express';
import { OK, CREATED, FORBIDDEN, UNAUTHORIZED, NOT_FOUND, CONFLICT } from 'http-status-codes';
import config from '../../../../config';
import {TEST_INVALID_JWT_TOKEN, TEST_VALID_ANOTHER_REGIRSTER_USER, TEST_VALID_REGISTER_USER } from '../../../../utils/testValues';
import expectError from '../../utils/expectError';
import generateJwtToken from '../../../../utils/jwt/generateToken';
import createUserWithPermission from '../../utils/createUserWithPermission';
import {CAN_GET_POSTS, DEFAULT_POSTS_PAGINATION_LIMIT, DEFAULT_POSTS_PAGINATION_OFFSET} from '../../../../utils/constants';
import {fakePosts} from '../../../../utils/fakesFactory';

describe(__filename, () => {

  const { service, request } = initTests();

  it('should fail to get posts when unauthenticated', async () => {
    const response = await request.get(`${API_ROUTE_V1}/posts`);
    expectError(response, UNAUTHORIZED);
  });

  it('should fail to get posts when invalid token provided in authorization header', async () => {
    const response = await request.get(`${API_ROUTE_V1}/posts`)
                                  .set('Authorization' , TEST_INVALID_JWT_TOKEN);
    expectError(response, UNAUTHORIZED);
  });

  it('should fail to get posts when insufficent permissions', async () => {
    const userWithoutPermissions = await service.createUser(TEST_VALID_REGISTER_USER);
    const validToken = await generateJwtToken({data: {id: userWithoutPermissions.id}});
    const response = await request.get(`${API_ROUTE_V1}/posts`)
                                  .set('Authorization' , validToken);
    expectError(response, FORBIDDEN);
  });

  it('should get posts with default offset and limit when not passed', async () => {
    const user = await createUserWithPermission(service, CAN_GET_POSTS);

    const posts = fakePosts({
      count: 10,
      overrides: {
        user_id: user.id
      }, 
      only: ['user_id','title', 'body']
    }).map(async (post: any) => {
      return service.createPost(post);
    }); 
    await Promise.all(posts);

    const validToken = await generateJwtToken({data: {id: user.id}});

    const response = await request.get(`${API_ROUTE_V1}/posts`)
                                  .set('Authorization', validToken);
    expect(response.status).toBe(OK);
    expect(response.body.count).toBe(10);
    expect(response.body.total).toBe(10);
    expect(response.body.perPage).toBe(DEFAULT_POSTS_PAGINATION_LIMIT);
    expect(response.body.currentPage).toBe(1);
  });

  it('should get posts when offset and limit provided', async () => {
    const user = await createUserWithPermission(service, CAN_GET_POSTS);

    const posts = fakePosts({
      count: 10,
      overrides: {
        user_id: user.id
      }, 
      only: ['user_id','title', 'body']
    }).map(async (post: any) => {
      return service.createPost(post);
    }); 
    await Promise.all(posts);

    const validToken = await generateJwtToken({data: {id: user.id}});

    const response = await request.get(`${API_ROUTE_V1}/posts?offset=0&limit=5`)
                                  .set('Authorization', validToken);
    expect(response.body.count).toBe(5);
    expect(response.body.total).toBe(10);
    expect(response.body.currentPage).toBe(1);
    expect(response.status).toBe(OK);
  });

  it('should get posts sorted according to the keys provided', async () => {
    const user = await createUserWithPermission(service, CAN_GET_POSTS);
    
    const posts = fakePosts({
      count: 5,
      overrides: {
        user_id: user.id
      }, 
      only: ['user_id','title', 'body']
    }).map(async (post: any) => {
      return service.createPost(post);
    }); 

    await Promise.all(posts);

    const validToken = await generateJwtToken({data: {id: user.id}});

    const response = await request.get(`${API_ROUTE_V1}/posts?sort=id:desc`)
                                  .set('Authorization', validToken);
                                 
    expect(response.status).toBe(OK);
    expect(response.body.data[0].id).toBe(5);
  });
});