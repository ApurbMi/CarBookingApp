import React, { useEffect, useState } from 'react'
import HeroPage from './HeroPage';
import Card from '../components/card';
import { assets, dummyCarData } from '../assets/assets';
import Banner from '../components/banner';
import CustomerInfo from '../components/customerInfo';
import { motion } from 'motion/react';
import Map from './map';
import axios from 'axios';

function MainPage() {
           
const [cars,setCars] = useState([]);
const getAllCar = async ()=>{
    try{
   const res = await axios.get('http://localhost:5000/admin/all-cars');
    if(res.data.success===true){
        const updatedList = res.data.allCar.slice(0,3);
          const cleanCarObj = updatedList.map((obj)=>{
                return  {
                ...obj,
                location: obj.location?.address || 'Location not available',
                latitude: obj.location?.Latitude,
                longitude: obj.location?.Longitude
              };
          })
        setCars(cleanCarObj);   
    }

    }
    catch(err){
        console.log(err);
    }

}     
useEffect(()=>{
    getAllCar();
},[]);
    return (
        <div>
            <HeroPage/>
 <div className='flex flex-col items-center py-20 px-6 md:px-16 lg:px-24 xl:px-32'>

   <div
   className='bg-white'>
               <motion.div
               initial={{y:50,opacity:0}}
      whileInView={{y:0,opacity:1}}
      transition={{duration:0.5 , delay:0.4}}
               className='mt-20'>
                <h1 
                className='text-4xl text-center font-medium'>Featured Vehicles</h1>
                <p className='text-gray-400 text-[15px] text-center'>Explore our selection of premium vehicles available for your next adventure.</p>
              </motion.div> 
{/* cards of car */}
             

 <motion.div 
 initial={{y:100,opacity:0}}
      whileInView={{y:0,opacity:1}}
      transition={{duration:0.9 , delay:0.6}}
 className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18">
              {cars.map((obj,index)=>{
                      return (
                          <Card key={index} carObj={obj} />
                        )            
                    })}
                 </motion.div>              
        </div> 

    <div className='flex items-center justify-center mt-20'>

         <button className='border border-gray-400 rounded-lg px-3 py-2 flex gap-2 text-gray-500 cursor-pointer hover:bg-gray-200'>
            Explore all cars
            <img src={assets.arrow_icon}/>
         </button>

    </div>


 </div>


            

    <Banner/>
 <CustomerInfo/>
 <Map/>

        
        </div>
    )
}

export default MainPage
