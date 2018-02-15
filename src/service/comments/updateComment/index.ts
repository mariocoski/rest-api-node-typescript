
import Config from '../../Config';
import Signature from './Signature';
import {ModelNotFoundError} from '../../../utils/errors';
import {CommentAttributes} from '../../../models/interfaces/comment';
import {UserAttributes} from '../../../models/interfaces/user';
import {PostAttributes} from '../../../models/interfaces/post';
export default (config: Config): Signature =>
  async ({id, data: {user_id, post_id, body}}) => {

    const foundComment: CommentAttributes | null = await config.repo.getCommentById({ id: parseInt(id) });

    if(foundComment === null) throw new ModelNotFoundError('Comment');
    
    if(post_id){
      const foundPost: PostAttributes | null = await config.repo.getPostById({id: parseInt(post_id)});
      if(foundPost === null) throw new ModelNotFoundError('Post');
    }

    if(user_id){
      const foundUser: UserAttributes | null = await config.repo.getUserById({id: parseInt(user_id)});  
      if(foundUser === null) throw new ModelNotFoundError('User');
    }
    return config.repo.updateComment({
        id,
        data: {user_id, post_id, body} 
    });
  };