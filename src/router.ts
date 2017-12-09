import {Application, Router, Request, Response, NextFunction} from 'express';

const router =  (app: Application) => {
  //init your main express router
  const apiRouter: Router = Router();

  //handle GET request to /api/v1
  apiRouter.get('/', (req: Request, res: Response) => {
      res.status(200).json({message: "This is where the awesomeness happen..."});
  });

  app.use('/api/v1', apiRouter);

};

export default router;
