const fs = require('fs')

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

// Get all Tour
exports.getAllTour = (req, res) => {
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
exports.getTourById = (req, res) => {
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
exports.createTour = (req, res) => {
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

exports.updateTour = (req, res) => {
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
exports.deleteTour = (req, res) => {
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

