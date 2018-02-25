import initTests from './initTests';
import {API_ROUTE_V1,AUTH_PARAM_NAME, AUTH_BODY_FIELD_NAME, AUTH_SCHEME_NAME,} from '../../../utils/constants';
import {Response} from 'express';
import config from '../../../config';
import {TEST_INVALID_JWT_TOKEN, TEST_VALID_ANOTHER_REGIRSTER_USER, TEST_VALID_REGISTER_USER,TEST_DEFAULT_ROLE_NAME } from '../../../utils/testValues';
import paginate from './paginate';
import {fakeUsers} from '../../../utils/fakesFactory';

describe(__filename, () => {

  const { service, request } = initTests();

  it('should paginate when the offset and limit is provided', async () => {
    const data: any[] = fakeUsers({count: 25, only: ['id']});
    const baseUrl: string = `${API_ROUTE_V1}/users`;
    const offset: number = 0;
    const limit: number = 10; 
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
        prev: null,
        next: `${baseUrl}?offset=10&limit=${limit}`,
        self: `${baseUrl}?offset=0&limit=${limit}`,
        baseUrl
      },
      
      currentPage: 1,
      firstPage: 1,
      lastPage: 3,
      numberOfPages: Math.ceil(total / limit),
      count: paginatedData.length,
      total,
      perPage: limit,
      data: paginatedData
    };

    expect(paginatedResults).toEqual(expectedPaginatedResults);
  });
});