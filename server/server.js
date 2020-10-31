import express from 'express';
import path from 'path';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import passport from 'passport';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

import indexRouter from './routes/index.js';
import usersRouter from './routes/usersRoutes.js';
import postsRouter from './routes/postsRoutes.js';

dotenv.config();

connectDB();

const app = express();

// Router

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Middleware
app.use(express.json());

//Routes
app.get('/', (req, res) => {
  res.send('Backend API runnig....');
});
const __dirname = path.resolve();
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

//Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

//Middlewares
app.use(notFound);
app.use(errorHandler);

// Server listening
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});
