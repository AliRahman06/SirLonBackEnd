import { resolve } from 'path';
import { config } from 'dotenv';
config({path: resolve(__dirname, '../.env') })

import express, { NextFunction, Response, Request } from 'express';
import createError, { HttpError } from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import pubsub from './routes/pubsub';
import airRouter from './routes/air';
import nutrisiRouter from './routes/nutrisi';
import siramRouter from './routes/siram';
import fs from 'fs';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, '../', 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));

app.use(logger('common', {
  stream: fs.createWriteStream(path.join(__dirname, '/logs/access.log'),{flags: 'a'})
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../', 'public')));
app.use('/pubsub', pubsub);
app.use('/air', airRouter);
app.use('/nutrisi', nutrisiRouter);
app.use('/siram', siramRouter);

// catch 404 and forward to error handler
app.use(function(req: Request, res: Response, next:NextFunction) {
  next(createError(404));
});

// error handler
app.use(function(err:HttpError, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
 
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
