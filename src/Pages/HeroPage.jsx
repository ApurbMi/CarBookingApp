import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'motion/react';
import {toast} from 'react-hot-toast'
function HeroPage() {
    const [location,setLocation] = useState('');
     const [pickUpDate,setPickUpDate] = useState(null);
     const [returnDate,setReturnDate] = useState(null);
     const getTheCar = async ()=>{
         if(location.length===0){
            toast.error('Please fill address');
            return;
         }
         else if(pickUpDate===null){
            toast.error('Please enter pickup Date');
            return;
         }
         else if(returnDate===null){
            toast.error('Please enter return Date');
            return;
         }
           
         







     }



  return (

    <>
      <motion.div 
       initial={{opacity:0}}
       animate={{opacity:1}}
       transition={{duration:0.6}}
      className='flex flex-col gap-16 items-center h-screen bg-[#e9ecef]'>

                <motion.h1 
                initial={{y:50 , opacity:0}}
                animate={{y:0,opacity:1}}
                transition={{duration:0.6,delay:0.4}}
                className='text-4xl font-bold text-center md:text-5xl mt-15'>Luxury cars on Rent</motion.h1>

                <motion.form
                initial={{y:50 , opacity:0,scale:0.95}}
                animate={{y:0,opacity:1,scale:1}}
                transition={{duration:0.6,delay:0.5}}
                className='flex flex-col justify-between md:py-5 gap-5 md:px-7 rounded-[10px] w-80 md:w-200 items-start shadow-2xs bg-white md:flex-row
                  md:rounded-[200px] 
                  p-9
                  md:items-center
                '>
                    <div className='flex gap-6 flex-col items-start md:flex-row md:item-center'>

                        <div className='flex flex-col gap-2 items-start'>
                            
<select name="pickupLocation" id="pickupLocation" onChange={(e)=>{
   setLocation(e.target.value);
}}>   
   <option value="">Select Pickup Location</option>
  <option value="Kanke Road, Ranchi, Jharkhand">Kanke Road, Ranchi</option>
  <option value="Doranda, Ranchi, Jharkhand">Doranda, Ranchi</option>
  <option value="Sakchi, Jamshedpur, Jharkhand">Sakchi, Jamshedpur</option>
  <option value="Bistupur, Jamshedpur, Jharkhand">Bistupur, Jamshedpur</option>
  <option value="Sector 4, Bokaro Steel City, Jharkhand">Sector 4, Bokaro Steel City</option>
  <option value="Chas, Bokaro, Jharkhand">Chas, Bokaro</option>
  <option value="Hirapur, Dhanbad, Jharkhand">Hirapur, Dhanbad</option>
  <option value="Bank More, Dhanbad, Jharkhand">Bank More, Dhanbad</option>
  <option value="Kokar, Ranchi, Jharkhand">Kokar, Ranchi</option>
  <option value="Lalpur, Ranchi, Jharkhand">Lalpur, Ranchi</option>
                            </select>
                             {location==="" || location==="Pick the car location"?
                             <>
                            <p className='text-sm text-gray-500'>Please select car location</p>
                             </>
                             :<>
                             <p className='text-sm text-gray-500'>{location}</p>                              
                             </>
                             }
                        </div>

                        <div className='flex flex-col gap-3'>
                            <p>Pick-Up date</p>
                            <input type="date" className='text-sm text-gray-500' onChange={(e)=>{
                                setPickUpDate(e.target.value)
                            }}/>
                        </div>

                        <div className='flex flex-col gap-3'>
                            <p>Return date</p>
                            <input type="date" className='text-sm text-gray-500'
                             onChange={(e)=>{
                                setReturnDate(e.target.value);
                             }}
                            />
                        </div>

                    </div>

                    <div>
                        <motion.button
                        whileHover={{scale:1.05}}
                        transition={{duration:0.3}}
                        className='flex items-center gap-2 py-2 px-7 bg-blue-600 text-white text-lg rounded-3xl'>
                            <img src={assets.search_icon}
                            className='brightness-200'
                            onClick={getTheCar}
                            />
                            Search
                        </motion.button>
                    </div>
                </motion.form>

                <motion.div
                initial={{y:100 , opacity:0}}
                animate={{y:0,opacity:1}}
                transition={{duration:0.8,delay:0.6}}
                className='w-120 md:w-220'>
                    <img src={assets.main_car} />
                </motion.div>

            </motion.div>
    
    
    </>
  )
}

export default HeroPage