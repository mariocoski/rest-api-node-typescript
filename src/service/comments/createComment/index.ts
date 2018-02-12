
import Config from '../../Config';
import Signature from './Signature';
import {Options} from './Signature';
import {ModelNotFoundError} from '../../../utils/errors';
import {PostAttributes} from '../../../models/interfaces/post';
import {UserAttributes} from '../../../models/interfaces/user';

export default (config: Config): Signature =>
  async ({user_id, post_id, body}: Options) => {
    const user: UserAttributes | null = await config.repo.getUserById({id: user_id});
    
    if(user === null){
      throw new ModelNotFoundError('user');
    }

    const post: PostAttributes | null = await config.repo.getPostById({id: post_id});

    if(post === null){
      throw new ModelNotFoundError('post');
    }

    return config.repo.createComment({user_id, post_id, body});
  };