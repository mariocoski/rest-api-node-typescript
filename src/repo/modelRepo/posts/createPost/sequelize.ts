import Signature from './Signature';
import Config from '../../../utils/sequelize/Config';
import {Options} from './Signature';
import {PostInstance} from '../../../../models/interfaces/post';
import {UserInstance} from '../../../../models/interfaces/user';
import {ModelNotFoundError} from '../../../../utils/errors';
import * as moment from 'moment';

export default (config: Config) => {
  return async ({title, body, user_id}: Options) => {
    
    const user: UserInstance | null = await config.models.User.findById(user_id);

    if(user === null){
      throw new ModelNotFoundError('user');
    }

    const post: PostInstance = await config.models.Post.create({
      title, body, user_id
    });

    return post.get({ plain: true });
  }; 
}