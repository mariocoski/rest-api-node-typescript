require('babel-polyfill');

//this will load all env variables for dev and test mode
if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
}

//load http module
import * as http from 'http';
import app from './app';
import {makeHash} from './utils';
import * as bcrypt from 'bcrypt';
import * as R from 'ramda';
const {sequelize,models} = require('./models');
import * as iconvLite from 'iconv-lite';

//used for characted encoding conversion
iconvLite.encodingExists('foo');

//signal events are emitted when the Node.js process receives a signal
//SIGINT signal is with -C in most terminal programs
process.on('SIGINT', () => {
  process.exit(0);
});

//this is when testing with jest - its set up
//process.env.NODE_ENV to be test
//in this case we will choose test port accordingly
const IS_TEST: boolean = process.env.NODE_ENV === 'test';

//we will replace those port number later on with env vars
const port: number = IS_TEST ? 3001 : 3000;

//create a server
const server: http.Server = new http.Server(app);

async function dbInit(){
  await sequelize.sync();
}

if(process.env.NODE_ENV !== 'test'){
  dbInit();
}

//listen on the provided port
server.listen(port, () => {
  if(! IS_TEST){
    console.log(`Listening at http://localhost:${port}/api/v1`);
  }
});

//server error handler
/* istanbul ignore next */
server.on('error', (error: any, port: number) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  switch (error.code) {
    case 'EACCES':
      if(process.env.NODE_ENV !== 'test'){
        console.log(`${port} requires elevated privileges`);
      }
      process.exit(1);
    case 'EADDRINUSE':
      if(process.env.NODE_ENV !== 'test'){
        console.log(`${port} is already in use`);
      }
      process.exit(1);
    default:
      throw error;
  }
});

export default server;