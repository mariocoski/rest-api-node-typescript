import hasPermission from './hasPermission';
import {ForbiddenError, NotFoundError} from '../errors';
import {CAN_ADMINISTER, CAN_DELETE_USER} from '../constants';
describe(__filename, () => {

  it('should throw an exception when user does not have permission', () =>{
    const user = { 
      permissions: [{name:'other-permission'}]
    };
    expect(() => {
      hasPermission({user, permissionName: 'not-existing-permission'})
    }).toThrowError(ForbiddenError);
  });

  it('should not throw exception when have right permission', () =>{
    const user = { 
      permissions: [{name:'existing-permission'}]
    };
    let success = true;
    try{
      hasPermission({user, permissionName: 'existing-permission'});
    }catch(e){
      success = false;
    }
    expect(success).toBe(true);
  });

  it('should not throw exception when user have an administer permission', () =>{
    const user = { 
      permissions: [{name:CAN_ADMINISTER}]
    };
    let success = true;
    try{
      hasPermission({user, permissionName: CAN_DELETE_USER});
    }catch(e){
      success = false;
    }
    expect(success).toBe(true);
  });

});