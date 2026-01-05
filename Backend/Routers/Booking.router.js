const express = require('express');
const authCheck = require('../Middlewares/auth.middleware');
const route = express.Router();
const bookingMethods = require('../Controllers/booking.controller');

route.post('/post-booking',authCheck,bookingMethods.postBooking);
route.get('/get-allBooking',authCheck,bookingMethods.getAllBooking);
route.get('/get-allBookingUser/:id',authCheck,bookingMethods.getAllBookingOfUser);
route.put('/update-booking',authCheck,bookingMethods.updateBookingStatus);


module.exports = route;