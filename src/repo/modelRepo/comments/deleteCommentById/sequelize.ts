import Signature from './Signature';
import Config from '../../../utils/sequelize/Config';
import {Options} from './Signature';
import hashPassword from '../../../../utils/hashPassword';
import {CommentInstance} from '../../../../models/interfaces/comment';
import ModelNotFoundError from '../../../../utils/errors/ModelNotFoundError';

export default (config: Config) => {
  return async ({id}: Options) => {
   
    const post: CommentInstance | null = await config.models.Comment.findOne({
      where: { id }  
    });
    if(post === null) throw new ModelNotFoundError('Comment');

    await config.models.Comment.destroy({
      where: { id }  
    });
  }; 
}