import {ForbiddenError} from '../errors';
export interface Options {
  permissionName: string;
  user: any;
}

export default ({user, permissionName}: Options): void => {
  const {permissions} = user;
  if(!permissions || !permissions.length) throw new ForbiddenError();
  const hasPermission: boolean = (permissions.filter((permission: any) => permission.name === permissionName)).length > 0;
  if(! hasPermission) throw new ForbiddenError();
}