import * as jwt from 'jsonwebtoken';
import getNumberOption from '../config/getNumberOption';
import getStringOption from '../config/getStringOption';
import { ONE_HOUR, JWT_ALGORITM } from '../constants';

export interface Options {
  data: any;
  algorithm?: string;
}

export default async function(options: Options): Promise<string>{
  
  const expiresIn: number = getNumberOption(process.env.JWT_EXPIRATION_TIME, ONE_HOUR);
  const algorithm: string = getStringOption(options.algorithm, JWT_ALGORITM);
  const secret: string = getStringOption(process.env.JWT_SECRET, '');

  const token: string = await jwt.sign(
    { data: options.data }, secret, { expiresIn, algorithm}
  );

  return Promise.resolve(`JWT ${token}`);
}

