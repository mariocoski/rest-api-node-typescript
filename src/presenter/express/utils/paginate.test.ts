import initTests from './initTests';
import {API_ROUTE_V1,AUTH_PARAM_NAME, AUTH_BODY_FIELD_NAME, AUTH_SCHEME_NAME,} from '../../../utils/constants';
import {Response} from 'express';
import {OK_200_HTTP_CODE, UNPROCESSABLE_ENTITY_422_HTTP_CODE, NOT_FOUND_404_HTTP_CODE, FORBIDDEN_403_HTTP_CODE, UNAUTHORISED_401_HTTP_CODE} from '../utils/constants';
import config from '../../../config';
import {TEST_INVALID_JWT_TOKEN, TEST_VALID_ANOTHER_REGIRSTER_USER, TEST_VALID_REGISTER_USER,TEST_DEFAULT_ROLE_NAME } from '../../../utils/testValues';
import paginate from './paginate';
import {fakeUsers} from '../../../utils/fakesFactory';

describe(__filename, () => {

  const { service, request } = initTests();

  it('should fail to get user when unauthenticated', async () => {
    const data: any[] = fakeUsers({count: 25, only: ['id']});
    const baseUrl: string = `${API_ROUTE_V1}/users`;
    const offset: number = 5;
    const limit: number = 5; 
    const paginatedData: any[] = data.slice(offset, offset + limit);
    const total = data.length;
    const paginatedResults = paginate({
      total,
      paginatedData,
      offset,
      limit,
      baseUrl
    });

    const expectedPaginatedResults = {
      _links: {
        first: `${baseUrl}?offset=0&limit=${limit}`,
        last:  `${baseUrl}?offset=20&limit=${limit}`,
        prev: `${baseUrl}?offset=0&limit=${limit}`,
        next: `${baseUrl}?offset=10&limit=${limit}`,
        self: `${baseUrl}?offset=5&limit=${limit}`,
        baseUrl
      },
      
      currentPage: 2,
      firstPage: 1,
      lastPage: 5,
      numberOfPages: Math.ceil(total / limit),
      count: paginatedData.length,
      total,
      perPage: limit,
      data: paginatedData
    };

    expect(paginatedResults).toEqual(expectedPaginatedResults);
  });

  
});