import {Request, Response} from 'express';

type Handler = (req: Request, res: Response) => Promise<void>;

export default Handler;