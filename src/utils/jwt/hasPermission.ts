import {ForbiddenError} from '../errors';
export interface Options {
  permissionName: string;
  user: any;
}

export default ({user, permissionName}: Options): void => {
  const {permissions} = user;
  if(!permissions || !permissions.length) throw new ForbiddenError();
  console.log(permissionName, permissions);
  const hasPermission = (permissions.filter((permission: any) => permission.name === permissionName)).length;
  if(! hasPermission) throw new ForbiddenError();
}