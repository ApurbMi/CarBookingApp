import React from 'react'
import { assets } from '../assets/assets'
import {motion} from 'motion/react'
function Banner() {
  return (
    <>
     <motion.div
     initial={{y:50,opacity:0}}
      whileInView={{y:0,opacity:1}}
      transition={{duration:0.6 , delay:0.4}}
     
     className='flex flex-col px-2 sm:px-30 items-center mt-15'>
         <div className='
       bg-linear-to-r from-blue-500 to-blue-300
         flex md:justify-between md:flex-row flex-col px-5 py-8 items-center rounded-xl'>
       
       <motion.div
       initial={{opacity:0,y:20}}
      whileInView={{opacity:1,y:0}}
      transition={{duration:0.9 , delay:0.8}}
       className='
       text-white flex flex-col items-start sm:p-5 gap-4'>
        <h1 className='text-3xl font-medium'>
       Do You Own a Luxury Car?
        </h1>
        <p className='text-lg'>
          Monetize your vehicle effortlessly by listing it on CarRental.
We take care of insurance, driver verification and secure payments — so you can earn passive income, stress-free.
        </p>
        <div>
            <button className='text-blue-400 bg-white px-4 py-2 text-sm rounded-xl'>
            List your car
          </button>
        </div>          
       </motion.div>

         <motion.div
         initial={{x:40,opacity:0}}
      whileInView={{x:0,opacity:1}}
      transition={{duration:0.9 , delay:0.7}}
         
         className='relative top-8 p-5 sm:p-0 md:w-165'>
          <img src={assets.banner_car_image}/>
         </motion.div>

     </div>
      
     </motion.div>


    </>
  )
}

export default Banner