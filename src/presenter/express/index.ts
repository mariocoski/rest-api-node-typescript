import { Router, Request, Response} from 'express';
import Config from './Config';
import enhancedRouter from './enhancedRouter';
import {register, login, forgetPassword,resetPassword} from './auth';
import {getPosts, createPost} from './posts';
import {getUserById, getUsers, updateUser, createUser, deleteUserById} from './users';

export default (config: Config): Router => {
  const router: Router = enhancedRouter(config);

  router.get('/', (req: Request, res: Response) => {
    res.status(200)
       .json({message: "This is where the awesomeness happen..."});
  });

  router.post('/auth/register', register(config));
  router.post('/auth/login', login(config));
  router.post('/auth/forget-password', forgetPassword(config));
  router.post('/auth/reset-password', resetPassword(config));

  router.post('/users', createUser(config));
  router.delete('/users/:user_id', deleteUserById(config));
  router.get('/users/:user_id', getUserById(config));
  router.get('/users', getUsers(config));
  router.patch('/users/:user_id', updateUser(config));
  

  router.get('/posts', getPosts(config));
  router.post('/posts', createPost(config));

  return router;
}