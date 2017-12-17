import { Router, Request, Response} from 'express';
import Config from './Config';
import enhancedRouter from './enhancedRouter';


export default (config: Config): Router => {
  const router: Router = enhancedRouter(config);

  router.get('/', (req: Request, res: Response) => {
    res.status(200).json({message: "This is where the awesomeness happen..."});
  });
  
  return router;
}