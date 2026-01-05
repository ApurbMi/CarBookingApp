const express = require('express');
const app = express();
const db = require('mongoose');
const dotenv = require('dotenv');
const carRoute = require('./Routers/Car.router');
const userRoute = require('./Routers/User.router');
const bookingRoute = require('./Routers/Booking.router');
const cors = require('cors');
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function DbConnection() {
      try{
     const val =  await db.connect(process.env.DB_LINK);
           console.log('Mongo Atlas Database connection successfull');
      }
      catch(err){
      console.log(err);
      }
}
DbConnection();

app.use(cors({
    origin: ["http://localhost:5173"],
    credentials:true
}));


app.use('/admin',carRoute);

app.use('/user',userRoute);

app.use('/book',bookingRoute);


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500; // fallback to 500 if undefined
    const message = err.message || 'Network issue';

    return res.status(statusCode).json({
        message: message,
        success: false
    });
});


app.listen(process.env.PORT,()=>{
    console.log("server is started");
})


