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
      email: faker.internet.exampleEmail(),
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


export const fakePosts = (options: Options): any => {
  const settings = {
    count: 1,
    only: [],
    overrides: {},
    ...options
  };
  const items: any[] = [];
  for(let i = 0; i < settings.count; i++){
    const post = {
      id: i + 1,
      user_id: 1,
      title: faker.lorem.sentences(1),
      body: faker.lorem.sentences(10),
      ...settings.overrides
    };
    const pickable: string[] = settings.only.length ? settings.only : Object.keys(post);
    items.push(R.pick(pickable, post));
  }
  return items.length > 1 ? items : items[0];
}

export const fakeComments = (options: Options): any => {
  const settings = {
    count: 1,
    only: [],
    overrides: {},
    ...options
  };
  const items: any[] = [];
  for(let i = 0; i < settings.count; i++){
    const post = {
      id: i + 1,
      user_id: 1,
      post_id: 1,
      body: faker.lorem.sentences(10),
      ...settings.overrides
    };
    const pickable: string[] = settings.only.length ? settings.only : Object.keys(post);
    items.push(R.pick(pickable, post));
  }
  return items.length > 1 ? items : items[0];
}


