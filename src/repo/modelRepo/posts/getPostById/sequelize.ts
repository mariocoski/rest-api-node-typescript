import Signature from './Signature';
import Config from '../../../utils/sequelize/Config';
import {Options} from './Signature';
import { POST_MODEL_VISIBLE_PROPERTIES } from '../../../../utils/constants';
import {PostInstance} from '../../../../models/interfaces/post';
import ModelNotFoundError from '../../../../utils/errors/ModelNotFoundError';

export default (config: Config) => {
  return async ({id}: Options) => {
    const post: PostInstance | null = await config.models.Post.findOne({
      attributes: POST_MODEL_VISIBLE_PROPERTIES,
      include: [ { model: config.models.Comment, as: 'comments' } ],
      where: { id }  
    });
    if(post === null) throw new ModelNotFoundError('Post');

    return post.get({ plain: true });
  }; 
}