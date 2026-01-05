import React, { useEffect, useState } from 'react'
import { assets, dummyMyBookingsData } from '../assets/assets'
import { motion } from 'motion/react'
import axios from 'axios'
// {
//         "_id": "684800fa0fb481c0cfd92e56",
//         "car": dummyCarData[2],
//         "user": "6847f7cab3d8daecdb517095",
//         "owner": "67fe3467ed8a8fe17d0ba6e2",
//         "pickupDate": "2025-06-11T00:00:00.000Z",
//         "returnDate": "2025-06-12T00:00:00.000Z",
//         "status": "pending",
//         "price": 600,
//         "createdAt": "2025-06-10T09:55:06.379Z",
//     }


function BookingList({obj,index}){
 return (
<>
  <motion.div
            initial={{ opacity: 0,x:50 }}
            whileInView={{opacity: 1,x:0 }}
            transition={{
              duration: 0.6,
              delay:  index*0.2,
              ease: "easeOut",
            }}
  className='border border-gray-300 rounded-xl p-7 flex justify-between'>
   
     <div className='flex gap-4'>


{/* first-div */}
      <div>
          <div>
        <img src={obj?.car?.image} className='w-3xs h-auto md:max-h-35 shadow-md rounded-xl mb-4 object-cover'/>
        </div>
           <div>
         <h1 className='text-[10x] font-semibold'>
            {obj?.car?.brand}
         </h1>
         <p className='text-sm text-gray-400'>
          {obj?.car?.year} • {obj?.car?.model}
         </p>
        </div>
      </div>
        
        
        
        {/* second-div */}
        <div className='flex flex-col gap-4'>
          
          <div className='flex items-center gap-3'>
             <span className='bg-gray-300 rounded-2xl text-[13px] px-2 py-1'>Booking#{index+1}</span> 
            {obj?.status==='Pending' &&<span className={`bg-yellow-300 rounded-2xl text-[13px] px-2 py-1`}>{obj?.status}</span>}
            {obj?.status==='Confirmed' &&<span className={`bg-green-300 rounded-2xl text-[13px] px-2 py-1`}>{obj?.status}</span>}
            {obj?.status==='Completed' &&<span className={`bg-blue-300 rounded-2xl text-[13px] px-2 py-1`}>{obj?.status}</span>}
           </div>
          
          <div className='flex flex-col gap-1'>
            <div>
              <div className='flex items-center gap-2'>
               <img src={assets.calendar_icon_colored}/>
               <p className='text-sm'>Rental Period</p>
              </div>
              <p className='pl-[23px] text-sm text-gray-400'>
               {new Date(obj?.pickupDate).toLocaleDateString()} -  {new Date(obj?.returnDate  ).toLocaleDateString()}
              </p>
            </div>
            <div>
              <div className='flex items-center gap-2'>
                <img src={assets.location_icon_colored}/>
                <p className='text-sm'>Pickup Location</p>
              </div>
               <p className='pl-[23px] text-sm text-gray-400'>{obj?.car?.location?.address}</p>
            </div>
            <div>
                 <div className='flex items-center gap-2'>
                 <img src={assets.location_icon_colored}/>
                 <p className='text-sm'>Return Location</p>
                 </div>
                  <p className='pl-[23px] text-sm text-gray-400'>Downtown Office</p>
            </div>


          </div>

        </div>
      </div> 
     
    {/* border-start */}
     <div className='flex flex-col items-end gap-2'>
        <span className='text-sm text-gray-400'>
          Total Price
        </span>
        <span className='text-xl text-blue-500 font-mono font-semibold'>
          {obj?.car?.pricePerDay}$
        </span>
        <span className='text-sm text-gray-400'>
         Booked on  {new Date(obj?.pickupDate).toLocaleDateString()}
        </span>
     </div>
    {/*border-end  */}
  </motion.div>
</>
 )

}

function MyBooking() {

const [bookingArray,setBookingArray] = useState([]);


async function getAllBooking() {
const user = JSON.parse(localStorage.getItem('user'));
console.log(user);
    try{
      const res = await axios.get(`http://localhost:5000/book/get-allBookingUser/${user?.userId}`,{
    headers:{
      Authorization:`Bearer ${user.userToken}`
    }
   });  
   
   if(res.data.success===true){
       setBookingArray(res.data.list);           
   }
   else{
      console.log(res.data.message);
   }

    } 
    catch(err){
      console.log(err.message);
    }  
}  
useEffect(()=>{
  console.log(4)
   getAllBooking();
},[]);


  return (
    <>
    <div className='px-10 py-10 sm:px-25 mb-3'>
       <motion.div
            initial={{ opacity: 0,y:20 }}
            whileInView={{opacity: 1,y:0 }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: "easeOut",
            }}
       >
          <h1 className='text-2xl font-semibold'>
            My Booking
          </h1>
       <p className='text-[16px] mt-3 text-gray-400'>View and manage your car bookings</p>
       </motion.div>
        <div className='flex flex-col gap-4 mt-5 mb-8'>

 {
   bookingArray?.map((obj,index)=>{
     return (
      <BookingList
      key={index} obj={obj} index={index}/>
     )
   })
 }
  </div>
    </div>
    </>
  )
}

export default MyBooking