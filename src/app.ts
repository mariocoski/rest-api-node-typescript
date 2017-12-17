import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
import * as passport from 'passport';
import * as cors from 'cors';
import * as compression from 'compression';
import * as fs from 'fs';
//we will import the module which will handle routing for our app
//we will populate this file in as sec
import httpRouter from './router';
//that will create an express app which we will
//exports and pass to http.createServer() function
const app: express.Application = express();

//body parser parses request bodies. Those could contain like json or url encoded form //data. The form data will then appear in req.body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//in the meantime (as we don't have any gzip module on nginx yet
//we will compress response bodies for all requests) 
//using compression middleware
app.use(compression());


app.use(logger('common', {
    stream: fs.createWriteStream('./access.log', {flags: 'a'})
}));
//we would you morgan for logging requests
//flags: 'a' opens the file in append mode.
app.use(logger('common', {
    stream: fs.createWriteStream('./access.log', {flags: 'a'})
}));
//doing console.log
app.use(logger('dev'));

//we will use cors middleware for enabling cores and for all requests
//you can read more about cors here:
//https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
const corsMiddleware = cors({ origin: '*', preflightContinue: true });
app.use(corsMiddleware);
app.options('*', corsMiddleware);

httpRouter(app);

const myApp: express.Application = app;

export default myApp;
