import React from 'react'
import { assets } from '../assets/assets';
import {motion} from 'motion/react';
import { useNavigate } from 'react-router-dom';
function Card({carObj}) {
  const navigate = useNavigate();
  function carInfoNav(){
       navigate(`/car/${carObj._id}`)   
    
  }
  return (
    <>      
     <div 
     onClick={()=>{
        carInfoNav();
     }}
     className='group overflow-hidden rounded-2xl shadow-lg hover:-translate-y-1 duration-500 relative'>
        <div className='h-48 overflow-hidden relative'>
          <img src={carObj.image} className='object-cover w-full h-full group-hover:scale-105 duration-500'/>
     
        <span className='text-white bg-blue-500 rounded-2xl px-2 py-1 text-[12px] absolute top-2 left-2'>Available now</span>
            
       <div>
          <span className='bg-black text-white font-medium p-2 rounded-xl absolute right-3 top-36 text-lg'>{carObj.pricePerDay}$<span className='text-gray-400'>/day</span></span>

       </div>



        </div>
      <div>
           <div className='flex flex-col items-start p-5'>
            <p className='text-lg text-black'>
              {carObj.brand} {carObj.model}
            </p>
            <p className='text-sm'>
              {carObj.category} • {carObj.year}
                 
            </p>

            </div>   
            <div className='grid grid-cols-2 p-5 gap-2 text-gray-600 text-sm'>
              <div className='flex flex-row items-center'>
              <img src={assets.carIcon} className='h-4 mr-2'/> <span>{carObj.transmission}</span>
              </div>
               <div className='flex flex-row items-center'>
              <img src={assets.location_icon} className='h-4 mr-2'/> <span>{carObj.location} </span>
              </div> 
              <div className='flex flex-row items-center'>
              <img src={assets.listIcon} className='h-4 mr-2'/> <span>{carObj.seating_capacity} Seats</span>
              </div> 
              
              <div className='flex flex-row items-center'>
              <img src={assets.fuel_icon} className='h-4 mr-2'/> <span>{carObj.fuel_type}</span>
              </div>


            </div>
         </div>     
    
    
     </div>



    </>
  )
}

export default Card