require('babel-polyfill');

//this will load all env variables for dev and test mode
if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
}

//load http module
import * as http from 'http';
import app from './app';
const {sequelize, models} = require('./models');
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
  await sequelize.sync({force:true});
  try{
    await models.User.create({firstname: 'John', lastname: 'Malkovic', email: 'tok@op.pl', password: 'passowrd'});
    await models.Post.create({user_id: 1, title: 'New post', body: 'Excellent!'});
    await models.Comment.create({post_id: 1,  body: 'Good job!'});
    await models.Role.create({id: 1, name: 'admin', description: 'here'});
    await models.Role.create({id: 2, name: 'editor', description: 'here', deleted_at: '2015-12-12 12:12:12'});
    await models.UserRole.create({user_id: 1,role_id: 1});
    await models.UserRole.create({user_id: 1,role_id: 2});
  
     const myUser =await models.User.findById(1);
    console.log(myUser.email);
    await myUser.destroy();
    const user = await models.User.findAll({include: {model: models.Post}});
    const roles = await models.Comment.findAll({paranoid: true});
   console.log(user,roles);
  }catch(e) {
    console.log(e);
  }
  
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