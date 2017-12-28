import {UNPROCESSABLE_ENTITY_422_HTTP_CODE} from './constants';

interface Response {
  status: number;
  body: any;
}

export default (response: Response, expectedStatusCode: number = UNPROCESSABLE_ENTITY_422_HTTP_CODE) => {
  expect(response.status).toBe(expectedStatusCode);
  expect(response.body).toMatchSnapshot();
}