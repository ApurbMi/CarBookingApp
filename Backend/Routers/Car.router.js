const express = require('express');
const upload = require('../Middlewares/multer.middleware');
const route = express.Router();
const car = require('../Controllers/car.controller');
const authCheck = require('../Middlewares/auth.middleware');

route.post('/car-post',authCheck,upload.single('image'),car.addCar);
route.get('/all-cars',car.getAllCar);
route.get('/car/:Id',car.getCarById);
route.put('/update-car/:id',authCheck,upload.single('image'),car.updateCar);
route.delete('/delete-car/:id',authCheck,car.deleteCar);

module.exports = route;