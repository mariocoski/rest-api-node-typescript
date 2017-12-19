
import {createUserSignature, getUserSignature, getUsersSignature, 
        updateUserSignature, deleteUserSignature} from './users'


export default interface Service {
  readonly createUser: createUserSignature;
  readonly getUser: getUserSignature;
  readonly getUsers: getUsersSignature;
  readonly updateUser: updateUserSignature;
  readonly deleteUser: deleteUserSignature;

}