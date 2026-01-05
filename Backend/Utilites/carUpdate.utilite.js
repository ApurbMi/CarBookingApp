const bookingModel = require('../Models/Booking.model');
const Car = require('../Models/Car.model');

async function carUpdate(){
   const today = new Date();
    
   const bookings = await bookingModel.find({
    status:{$in:["Pending","Confirmed"]},
    returnDate:{$lt:today}
   }).select("status");
    if(bookings.length==0){
        return;
    }
  await bookingModel.bulkWrite(
       bookings.map((obj)=>{
         return {
            updateOne:{
                filter:{
                   _id:obj._id
                },
                update:{
                   $set:{
                      status:(obj.status==='Pending')?"Expired":"Completed"
                   }
                }
            }
         }
       })
  )

}

module.exports = carUpdate