import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets, dummyCarData } from '../assets/assets';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-hot-toast'
import { useUserState } from '../ContextApi/authContext';
function CarInfo() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [pickUpDate,setPickUpDate] = useState('');
  const [returnDate,setReturnDate] = useState('');
  const {user,setUser} = useUserState();
  const [isA,setIsA] = useState(true);
const getCarInfo = async ()=>{
  try{
  const res = await axios.get(`http://localhost:5000/admin/car/${id}`);
   if(res.data.success===true){
    console.log(res.data.carData);
       setCar(res.data.carData);
       setIsA(res.data.carData.isAvaliable);
   }
  }
  catch(err){
   console.log(err.message);
  }  
}

 const navigate = useNavigate();
  
useEffect(() => {
  window.scrollTo(0, 0);
}, []);

useEffect(()=>{
  getCarInfo();
},[])

async function handleBooking(e){
e.preventDefault();
      const user3 =  JSON.parse(localStorage.getItem("user"));
      const userId = user3.userId; 
      const carId = id;
      console.log(user3)
      try{
     const res = await axios.post('http://localhost:5000/book/post-booking',{
      car:carId,
      user:userId,
  pickupDate:pickUpDate,
  returnDate:returnDate,
  price: car?.pricePerDay
},{
  headers:{
    Authorization:`Bearer ${user3?.userToken}`
  }
});  
if(res.data.success===true){
    toast.success('Booking of car is done successfully.');
    console.log(user);
    setPickUpDate('');
    setReturnDate('');
    setIsA(false);
}
else{
  toast.error(res.data.message);
}
} 
catch(err){
     console.log(err.message);     
}    
}

  return (
    <div className='px-10 md:px-16 lg:px-26 py-15 mb-30'>
      <motion.button 
      initial={{x:40,opacity:0}}
         animate={{x:0,opacity:1}}
         transition={{duration:0.8 , delay:0.6}}
         onClick={()=>{
            navigate(-1);
         }}
      className='flex gap-2 items-center outline-none bg-transparent text-gray-500 mb-4'>
        <img src={assets.arrow_icon} className='transform scale-x-[-1]'/>
        Back to all cars
      </motion.button>

      <div className='grid grid-cols-1 lg:grid-cols-3 mt-5 gap-6'>
         <motion.div 
         initial={{y:40,opacity:0}}
         animate={{y:0,opacity:1}}
         transition={{duration:0.6 , delay:0.4,ease:"easeOut"}}
         className='col-span-2'>
        <img src={car?.image} alt="cars"  className='w-full h-auto md:max-h-100 shadow-md rounded-xl mb-4 object-cover'/>
        
         <motion.div
         initial={{y:20,opacity:0}}
         animate={{y:0,opacity:1}}
         transition={{duration:0.6 , delay:0.4}}
         >
          <motion.h1
          initial={{y:20,opacity:0}}
         animate={{y:0,opacity:1}}
         transition={{duration:0.6 , delay:0.4}}
          className='text-2xl font-semibold'>
       {car?.model} {car?.brand} 
          </motion.h1>
           <p className='text-[19px] text-gray-500'>  
            {car?.category} • {car?.year}                                                                                                                {/* "category": "SUV" "year": 2006,*/}
           </p>
         </motion.div>
         <hr className='border-b-gray-400 mt-4'/>
         <div className='grid grid-cols-2 md:grid-cols-4 mt-7 gap-4'>
          <div className='flex flex-col justify-center items-center px-4 py-4 bg-gray-200 rounded-sm'>
            <img src={assets.users_icon} className='h-5'/>
            {car?.seating_capacity}
          </div>
           <div className='flex flex-col justify-center items-center px-4 py-4 bg-gray-200 rounded-sm'>
            <img src={assets.users_icon} className='h-5'/>
            {car?.transmission}
          </div>
           <div className='flex flex-col justify-center items-center px-4 py-4 bg-gray-200 rounded-sm'>
            <img src={assets.users_icon} className='h-5'/>
            {car?.location?.address}
          </div>
           <div className='flex flex-col justify-center items-center px-4 py-4 bg-gray-200 rounded-sm'>
            <img src={assets.users_icon} className='h-5'/>
            {car?.fuel_type}
          </div>

         </div>

          <div className='mt-7'>
          <h1 className='text-xl text-gray-950 font-semibold mb-3'>
            Description
            </h1> 
<p className='text-[16px] text-gray-400'>
{car?.description}
</p>
          </div>
         <div className='mt-4'>
           <h1 className='text-[22px] font-semibold'>
            Features
           </h1>
           <div className='grid grid-cols-1 md:grid-cols-2 text-gray-400 text-[16px] gap-4 mt-4'>              
               

  <div className="flex items-center gap-2">
    <img src={assets.check_icon} alt="" />
    <p>Bluetooth</p>
  </div>

  <div className="flex items-center gap-2">
    <img src={assets.check_icon} alt="" />
    <p>360 Camera</p>
  </div>

  <div className="flex items-center gap-2">
    <img src={assets.check_icon} alt="" />
    <p>GPS</p>
  </div>

  <div className="flex items-center gap-2">
    <img src={assets.check_icon} alt="" />
    <p>Rear View Mirror</p>
  </div>

  <div className="flex items-center gap-2">
    <img src={assets.check_icon} alt="" />
    <p>Heated Seats</p>
  </div>

           </div>
         </div>


         </motion.div>
         
        <div>
           <motion.form
           initial={{x:40,opacity:0}}
         animate={{x:0,opacity:1}}
         transition={{duration:0.8 , delay:0.6}}
           className='w-full bg-white shadow-2xl rounded-2xl flex flex-col gap-3 px-9 py-6 sticky top-20'>
            <div className='flex justify-between items-center'>
                <h1 className='text-[22px] font-semibold'>
                  {car?.pricePerDay}$
                </h1>
                <p className='text-[17px] text-gray-400'>
                    per day
                </p>
            </div>
              <hr className='border-b-gray-400 mb-2'/>
               <label className='text-[16px] text-gray-400'>Pickup Date</label>
               <input type='date' className='border border-gray-400 rounded-sm p-2 mb-4'
                 onChange={(e)=>{
                    setPickUpDate(e.target.value);
                 }}
                 value={pickUpDate}
               />
                 <label className='text-[16px] text-gray-400'>Return Date</label>
               <input type='date' className='border border-gray-400 rounded-sm p-2'
                onChange={(e)=>{
                    setReturnDate(e.target.value);
                }}
                value={returnDate}
               />
               {
                (isA)?<>
                <button className='bg-blue-500 text-white py-2 rounded-sm mt-6'
               onClick={(e)=>{
                   handleBooking(e);
               }}
               disabled={user===null}
               >
                Book Now
               </button>

                </>:<>
                <button className='bg-blue-900 text-white py-2 rounded-sm mt-6'
                  onClick={(e)=>{
                      e.preventDefault();
                      toast.error('Already booked');
                  }}
               >
                Booked
               </button>
                </>
               }
               
               <p className='text-sm text-center text-gray-400'>No credit card required to reserve</p>
           </motion.form>
        </div>

        <div>
        </div>
      </div>
    </div>
  );
}

export default CarInfo;
