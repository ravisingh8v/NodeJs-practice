const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const app = express();

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

// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: 'Hello from the server side', app: 'express' });
// });
// app.post('/', (req, res) => {
//   res.status(201).send('Hello your data has been submitted');
// });
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// Get all Tour
const getAllTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    requestedAt: req.requestTime,
    data: {
      tours: tours,
    },
  });
};

// Get tour by ID
const getTourById = (req, res) => {
  console.log(req.params);
  const id = Number(req.params.id);
  const tour = tours.find((el) => el.id === id);

  // if (id > tours.length) {
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

// Create Tour
const createTour = (req, res) => {
  const newId = tours.length - 1 + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      // if (err) {
      //   res.status(500);
      //   res.end(err.message);
      // } else {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
      // }
    }
  );
  console.log(req.body);
};

// Patch Tour data just an example not doing anything with json file

const updateTour = (req, res) => {
  if (req.params.id > tours.length - 1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<New Updated tour is here.....>',
    },
  });
};

// Delete tour by ID
const deleteTour = (req, res) => {
  console.log(req.params);
  const id = Number(req.params.id);

  if (id > tours.length - 1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }
  const tourAfterDelete = tours.filter((el) => el.id !== id);
  console.log(tourAfterDelete);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tourAfterDelete),
    (err) => {
      res.status(204).json({
        status: 'success',
        data: null,
      });
    }
  );
};

// app.get('/api/v1/tours', getAllTour);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getTourById);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

// To Remove File from
// const deleteFile = (req, res) => {
//   fs.unlink(`${__dirname}/deleteMe.txt`, (err) => {
//     if (err.message) return res.end(err.message);
//     res.end('File Has been deleted');
//   });
// };

// app.route('/api/v1/delete-url').get(deleteFile);
const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is currently not available',
  });
};
const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is currently not available',
  });
};
const getUserById = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is currently not available',
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is currently not available',
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is currently not available',
  });
};

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter.route('/').get(getAllTour).post(createTour);
tourRouter.route('/:id').get(getTourById).patch(updateTour).delete(deleteTour);

userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUserById).patch(updateUser).delete(deleteUser);

const port = 3000;
const hostname = '127.0.0.1';
app.listen(port, hostname, () => {
  console.log(`App running on port ${port}.....`);
});
