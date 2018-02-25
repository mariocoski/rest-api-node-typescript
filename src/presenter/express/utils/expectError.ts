import { UNPROCESSABLE_ENTITY } from 'http-status-codes'; 
interface Response {
  status: number;
  body: any;
}

export default (response: Response, expectedStatusCode: number = UNPROCESSABLE_ENTITY) => {
  expect(response.status).toBe(expectedStatusCode);
  expect(response.body).toMatchSnapshot();
}