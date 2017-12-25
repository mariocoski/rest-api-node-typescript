import initTests from '../../utils/initTests';
import {API_ROUTE_V1} from '../../../../utils/constants';
import {Response} from 'express';
import {CREATED_201_HTTP_CODE} from '../../utils/constants';
import config from '../../../../config';
import {TEST_VALID_USER} from '../../../../utils/testValues';

describe(__filename, () => {

  const { service, request } = initTests();

  it('should succesfully register a user', async () => {

    const response = await request.post(`${API_ROUTE_V1}/auth/register`)
                                  .send(TEST_VALID_USER);
         
    const {user, token} = response.body;

    expect(response.status).toBe(CREATED_201_HTTP_CODE);
    expect(token).toMatch(/JWT/);
    expect(user).toMatchSnapshot();
  });

});