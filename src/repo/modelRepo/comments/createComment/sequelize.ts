import Signature from './Signature';
import Config from '../../../utils/sequelize/Config';
import {Options} from './Signature';
import {CommentInstance} from '../../../../models/interfaces/comment';
import {ModelNotFoundError} from '../../../../utils/errors';
import * as moment from 'moment';

export default (config: Config) => {
  return async ({post_id, user_id, body }: Options) => {
    
    const comment: any = await config.models.Comment.create({
      post_id, body, user_id
    });

    return comment.get({ plain: true });
  }; 
}