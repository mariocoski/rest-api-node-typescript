import Signature from './Signature';
import Config from '../../../utils/sequelize/Config';
import {Options} from './Signature';
import { COMMENT_MODEL_VISIBLE_PROPERTIES } from '../../../../utils/constants';
import {CommentInstance} from '../../../../models/interfaces/comment';
import ModelNotFoundError from '../../../../utils/errors/ModelNotFoundError';

export default (config: Config) => {
  return async ({id}: Options) => {
    const comment: CommentInstance | null = await config.models.Comment.findOne({
      attributes: COMMENT_MODEL_VISIBLE_PROPERTIES,
      where: { id }  
    });
    if(comment === null) throw new ModelNotFoundError('Comment');

    return comment.get({ plain: true });
  }; 
}