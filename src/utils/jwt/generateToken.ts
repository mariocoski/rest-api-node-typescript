import * as jwt from 'jsonwebtoken';
import getNumberOption from '../config/getNumberOption';
import getStringOption from '../config/getStringOption';
import config from '../../config';
import {Config} from '../../config';
import {v4} from 'uuid';

export interface Options {
  data: any;
}

export default function({data}: Options): Promise<string>{
  return new Promise((resolve, reject) => {
    jwt.sign({ data, jti: v4() }, config.jwt.secret, { algorithm: config.jwt.algoritm, expiresIn:  config.jwt.expiresIn }, (err, token) => {
      if(err) reject(err);
      resolve(`JWT ${token}`);
    });
  });
}

