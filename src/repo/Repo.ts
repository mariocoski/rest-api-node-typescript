
import {createUserSignature, getUserSignature, getUsersSignature, 
    updateUserSignature, deleteUserSignature} from './users'

export default interface Repo {
    readonly createUser: CreateUserSignature;
    readonly getUser: GetUserSignature;
    readonly getUsers: GetUsersSignature;
    readonly updateUser: UpdateUserSignature;
    readonly deleteUser: DeleteUserSignature;
}