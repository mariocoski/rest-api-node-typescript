import Signature from './Signature';
import Config from '../../../utils/sequelize/Config';
import {Options} from './Signature';
import hashPassword from '../../../../utils/hashPassword';
import {PostInstance} from '../../../../models/interfaces/post';
import {UniqueConstraintError} from 'sequelize';
import {ModelNotFoundError} from '../../../../utils/errors';
import { POST_MODEL_VISIBLE_PROPERTIES } from '../../../../utils/constants';
import {ForeignKeyConstraintError} from 'sequelize';
export default (config: Config) => {
  return async ({id, data}: Options) => {
  
      const foundPost: PostInstance | null = await config.models.Post.findOne({
        attributes: POST_MODEL_VISIBLE_PROPERTIES,
        where: { id }  
      });

      if(foundPost === null) throw new ModelNotFoundError('Post');
    
      try {

        await config.models.Post.update(
          {
            ...data, 
            updated_at: (new Date().toDateString())
          },
          {
            where : {id}
          }
        );
      }catch(err){
        if(err instanceof ForeignKeyConstraintError){
          throw new ModelNotFoundError('user');
        }
        console.log(err.message);
        // throw err;
      }
    
      return await config.models.Post.findOne({
        attributes: POST_MODEL_VISIBLE_PROPERTIES,
        where: { id }  
      });
    }; 
}