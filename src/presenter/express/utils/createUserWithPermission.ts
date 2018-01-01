import Service from '../../../service/Service';
import {TEST_VALID_REGIRSTER_USER,TEST_DEFAULT_ROLE_NAME } from '../../../utils/testValues';


export default (service: Service, permissionName: string): Promise<any> => {
  return new Promise(async(resolve,reject)=>{
    const user: any = await service.createUser(TEST_VALID_REGIRSTER_USER);
    const role = { name: TEST_DEFAULT_ROLE_NAME };
    const permission = { name: permissionName };
    await service.createUserPermissions({userId: user.id, permissions: [permission], role });
    resolve(user);
  });
 
}