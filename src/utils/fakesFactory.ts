import * as faker from 'faker';
import * as R from 'ramda';

export interface OverrideInterface {
  [key: string]: any;
}

export interface Options {
  count?: number;
  only?: string[];
  overrides?: OverrideInterface;
}
 
export const fakeUsers = (options: Options): any => {
  const settings = {
    count: 1,
    only: [],
    overrides: {},
    ...options
  };
  const items: any[] = [];
  for(let i = 0; i < settings.count; i++){
    const password = faker.internet.password();
    const user = {
      id: i + 1,
      email: faker.internet.email(),
      password,
      password_confirmation: password,
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      bio: faker.lorem.sentences(10),
      ...settings.overrides
    };
    const pickable: string[] = settings.only.length ? settings.only : Object.keys(user);
    items.push(R.pick(pickable, user));
  }
  return items.length > 1 ? items : items[0];
}