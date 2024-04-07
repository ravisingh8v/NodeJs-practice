// Imports 
const express = require('express');
const morgan = require('morgan');
const app = express();

// Modules 
const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')


// Middleware 
app.use(express.json());
app.use(morgan('dev'));

app.use((req, res, next) => {
  console.log('Call before sending any response or request');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});


// Routings 
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);


module.exports = app