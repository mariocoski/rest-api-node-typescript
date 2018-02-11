import Signature from './Signature';
import Config from '../../../utils/sequelize/Config';
import {Options} from './Signature';
import hashPassword from '../../../../utils/hashPassword';
import {PostInstance} from '../../../../models/interfaces/post';
import ModelNotFoundError from '../../../../utils/errors/ModelNotFoundError';

export default (config: Config) => {
  return async ({id}: Options) => {
   
    const post: PostInstance | null = await config.models.Post.findOne({
      where: { id }  
    });
    if(post === null) throw new ModelNotFoundError('Post');

    await config.models.Post.destroy({
      where: { id }  
    });
  }; 
}