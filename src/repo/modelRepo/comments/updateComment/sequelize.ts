import Signature from './Signature';
import Config from '../../../utils/sequelize/Config';
import {Options} from './Signature';
import hashPassword from '../../../../utils/hashPassword';
import {CommentInstance} from '../../../../models/interfaces/comment';
import {UserInstance} from '../../../../models/interfaces/user';
import {PostInstance} from '../../../../models/interfaces/post';
import {UniqueConstraintError} from 'sequelize';
import {ModelNotFoundError} from '../../../../utils/errors';
import { COMMENT_MODEL_VISIBLE_PROPERTIES,POST_MODEL_VISIBLE_PROPERTIES} from '../../../../utils/constants';
import {ForeignKeyConstraintError} from 'sequelize';
export default (config: Config) => {
  return async ({id, data}: Options) => {
    
        await config.models.Comment.update(
          {
            ...data,
            updated_at: (new Date().toDateString())
          },
          {
            where : {id}
          }
        );
    
      const comment: any  = await config.models.Comment.findOne({
        attributes: COMMENT_MODEL_VISIBLE_PROPERTIES,
        where: { id }  
      });

      return comment.get({plain: true});
    }; 
}