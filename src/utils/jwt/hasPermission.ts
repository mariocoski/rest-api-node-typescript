import {ForbiddenError} from '../errors';
import {CAN_ADMINISTER}  from '../constants';

export interface Options {
  permissionName: string;
  user: any;
}

export default ({user, permissionName}: Options): void => {
  const {permissions} = user;
  if(!permissions || !permissions.length) throw new ForbiddenError();
  const hasPermission: boolean = (permissions.filter((permission: any) => 
  { 
    return (permission.name === permissionName) || (permission.name === CAN_ADMINISTER)
  })).length > 0;
  if(! hasPermission) throw new ForbiddenError();
}