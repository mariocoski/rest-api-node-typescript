import Service from '../../../service/Service';
import {TEST_VALID_REGISTER_USER,TEST_DEFAULT_ROLE_NAME } from '../../../utils/testValues';
import {fakeUsers} from '../../../utils/fakesFactory';
import * as faker from 'faker';
export default (service: Service, permissionName: string): Promise<any> => {
  return new Promise(async(resolve,reject)=>{
    const newUser = fakeUsers({count: 1, only: [
      'email', 'firstname', 'password', 'lastname', 'bio'
    ]});
    try {
      const user: any = await service.createUser(newUser);
      
      const role = { name: faker.random.words(2) };
      const permission = { name: permissionName };
      await service.createUserPermissions({userId: user.id, permissions: [permission], role });
      resolve(user);
    }catch(e){
      console.log(e);
      reject(e);
    }
    
  });
 
}