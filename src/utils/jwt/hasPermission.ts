import {ForbiddenError} from '../errors';
import {CAN_ADMINISTER}  from '../constants';

export interface Options {
  permissionName: string;
  permissions: any[];
}

export default ({permissions, permissionName}: Options): void => {
  if(!permissions.length) throw new ForbiddenError();
  const hasPermission: boolean = (permissions.filter((permission: any) => 
  { 
    return (permission.name === permissionName) || (permission.name === CAN_ADMINISTER)
  })).length > 0;
  if(! hasPermission) throw new ForbiddenError();
}