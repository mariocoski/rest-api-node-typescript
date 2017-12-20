
import CreateUserSignature from './users/createUser/Signature';
import GetUserSignature from './users/getUser/Signature';
import GetUsersSignature from './users/getUsers/Signature';
import UpdateUserSignature from './users/updateUser/Signature';
import DeleteUserSignature from './users/deleteUser/Signature';

type CommonPromiseSignature = () => Promise<void>;

export default interface Repo {
    readonly createUser: CreateUserSignature;
    readonly getUser: GetUserSignature;
    readonly getUsers: GetUsersSignature;
    readonly updateUser: UpdateUserSignature;
    readonly deleteUser: DeleteUserSignature;
    readonly clearRepo: CommonPromiseSignature;
    readonly migrate: CommonPromiseSignature;
    readonly rollback: CommonPromiseSignature;
}