//1. get-all-car ko update krna hai , add new Date() logic compare the date of return in booking model and update its booking status to expire if pending and completed if comfired if currentdate is more less completed date
//2. also if for any car booking is complted then it is avaible so get id of that car and update its isAvalable 
//3. run a loop over booking model over all its confiremed and pending data
//4. if date is complted for booking model entity then update the status to complted in booking model as well as make car isAvaible key to true
//5. for booking isAvl should be true;
//6. make a getallbooking,getallbookingOfUser,updateAction




/*Goals

Update getAllCar API to dynamically check booking status:

If the current date is past the returnDate of a booking:

Update booking status:

"pending" → "expired"

"confirmed" → "completed"

Update the car availability (isAvaliable) if booking completed.

Loop over all bookings:

Completed bookings → isAvaliable of corresponding car → true.

Update booking model entity status based on the current date.

Simplify getAllBooking, getAllBookingOfUser, and updateAction APIs with clean comments.*/

const Booking = require("../Models/Booking.model");
const sendResponse = require('../Utilites/error.utilite');
const mongoose = require('mongoose');
const carModel = require('../Models/Car.model');



const checkClash = async (carId,pickupDate,returnDate)=>{
      
   const value =  await Booking.findOne({
      car:carId,
      pickupDate:{$lt:returnDate},
      returnDate:{$gt:pickupDate},
       status: { $in: ["Pending", "Confirmed"] }
    })
     
    if(value){
      return true;
    }
    else{
      return false;
    }
}



const postBooking = async (req,res,next)=>{

     if(await checkClash(req.car,req.pickupDate,req.returnDate)){
           return res.json(401).message({
            message:"Date clash this car is already booked for this Date",
            success:false
           })

     }      
      const bookingData = req.body;
      try{
          const pickupDate = bookingData.pickupDate;
          const returnDate = bookingData.returnDate;
        if(new Date(pickupDate) > new Date(returnDate)){
           return next(sendResponse(401,'Invalid date input'))
        }
      
        const BookingRow = new Booking(bookingData);
       const val =  await BookingRow.save();
        return res.status(200).json({
            message:"Booking Saved successfully",
            success:true,
            savedBooking:val
        })
      } 
      catch(err){
         next(err)
      }    
}

const getAllBooking = async (req,res,next) =>{
       const role = req.user.role;
       if(role==='user'){
          return res.status(401).json({
            message:'No authority to use this request',
            success:false
          })
       }
    try{
       let allBookings = await Booking.find().populate('user').populate('car');    

           if(allBookings.length===0){
              return res.json({
                message:'Empty list',
                success:false,
                list:allBookings
              })
           }        
       return res.status(200).json({
          message:'List of all Bookings',
          success:true,
          list:allBookings
       })

    }
    catch(err){
      next(err);
    }
}

const getAllBookingOfUser = async (req,res,next) =>{
           const userId = req.params.id;
           try{
            if(!mongoose.Types.ObjectId.isValid(userId)){
              return  next(sendResponse(401,'Invalid or empty userId'));
            }
                const allBooking = await Booking.find({user:userId}).populate('user').populate('car');
                 
               return res.status(200).json({
                message:'filter list of book as per user',
                success:true,
                list:allBooking
               })  

           }
           catch(err){
                next(err);
           }
}


const updateBookingStatus = async (req,res,next) => {      
    const role = req.user.role;
    if(role==='user'){
        return res.status(401).json({
            message:'Only admin can access this api',
            success:false
        })
    }
    
    try{
    const newStatusObj = req.body;
        const updated = await Booking.findByIdAndUpdate(newStatusObj.id,{
            status:newStatusObj.status
          },{
            new:true,
            runValidators:true
          })
          
          if(!updated){
              return res.status(404).json({
                message:'book update failed',
                success:false
              }) 
          }
         
          return res.status(200).json({
            message:'Book status updated successfully',
            success:true
          })

    }
    catch(err){
       next(err)
    }
}


const getCarListAsPerDateRange = async (req,res,next) =>{
      try{ 
  const pickupDate = new Date(req.body.pickupDate);
  const returnDate =new Date(req.body.returnDate);
    
const conflictingBookings = await Booking.find({
  status: { $in: ['confirmed', 'pending'] },
  startDate: { $lte: returnDate },
  endDate: { $gte: pickupDate }
}).distinct("car");

const cars = await carModel.find({
  _id: { $nin: conflictingBookings },
});


     res.status(200).json({
      message:"List of all cars free at given range of date",
      carList:cars,
      success:true     
     });
    }
    catch(err){
      next(err);
    }
    
}

module.exports = {
     getAllBooking,
     postBooking,
     getAllBookingOfUser,
     updateBookingStatus,
     getCarListAsPerDateRange
}

