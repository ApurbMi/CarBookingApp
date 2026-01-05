import React from 'react'
import { assets } from '../assets/assets'

function Dashboard() {
  return (
    <div className='px-10 py-10 border w-full'>
      <div>
       <div className='w-[450px]'>
        <h1 className='text-2xl'>Admin Dashboard</h1>
        <p className='text-gray-400'>Monitor overall platform performance including total cars, bookings, revenue, and recent activities</p>
       </div>
        <div className='flex flex-col items-center gap-7 mt-6  md:flex-row'>
          <div className='border border-blue-200 flex items-center w-[196px] rounded-lg justify-between px-4 py-2'>
            <div className='flex flex-col gap-2'>
             <p className='text-sm text-gray-400'>Total Car</p>
             <p className='text-2xl text-black'>8</p>
            </div>
            <div className='bg-blue-100 rounded-full p-2'>
             <img src={assets.carIconColored} className='w-6'/>
            </div>
          </div>
          
          <div className='border border-blue-200 flex items-center w-[196px] rounded-lg justify-between px-4 py-2'>
            <div className='flex flex-col gap-2'>
             <p className='text-sm text-gray-400'>Total Car</p>
             <p className='text-2xl text-black'>8</p>
            </div>
            <div className='bg-blue-100 rounded-full p-2'>
             <img src={assets.carIconColored} className='w-6'/>
            </div>
          </div>

          <div className='border border-blue-200 flex items-center w-[196px] rounded-lg justify-between px-4 py-2'>
            <div className='flex flex-col gap-2'>
             <p className='text-sm text-gray-400'>Total Car</p>
             <p className='text-2xl text-black'>8</p>
            </div>
            <div className='bg-blue-100 rounded-full p-2'>
             <img src={assets.carIconColored} className='w-6'/>
            </div>
          </div>

          <div className='border border-blue-200 flex items-center w-[196px] rounded-lg justify-between px-4 py-2'>
            <div className='flex flex-col gap-2'>
             <p className='text-sm text-gray-400'>Total Car</p>
             <p className='text-2xl text-black'>8</p>
            </div>
            <div className='bg-blue-100 rounded-full p-2'>
             <img src={assets.carIconColored} className='w-6'/>
            </div>
          </div>
        </div>
         
       <div className='mt-7 flex flex-col gap-8 md:flex-row'>
         <div className='md:w-[520px] h-[340px] w-[400px] border border-blue-300 rounded-lg overflow-scroll'>
           <div className='px-5 py-5'>
          <h1>Recent Bookings</h1>
          <p className='text-gray-400 text-sm'>Latest customer bookings</p>    
        </div> 
          <div className='flex flex-col gap-3'>
             <div className='px-3 flex justify-between'>
           <div className='flex gap-2 items-center'>
            <div className='bg-blue-100 rounded-full p-2'>
            <img src={assets.listIconColored} className='w-5'/>
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-[14px] text-black'>BMW 3 Series</p>
              <p className='text-[11px] text-gray-400'>4/1/2025</p>
            </div>
           </div>
           <div className='flex gap-4 items-center'>
              <div>
                <span className='text-gray-400'>230$</span>
              </div>
           <div className='border border-gray-400 rounded-2xl px-3 py-0.5'>
            confirmed
           </div>

           </div>

          </div>
           
           <div className='px-3 flex justify-between'>
           <div className='flex gap-2 items-center'>
            <div className='bg-blue-100 rounded-full p-2'>
            <img src={assets.listIconColored} className='w-5'/>
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-[14px] text-black'>BMW 3 Series</p>
              <p className='text-[11px] text-gray-400'>4/1/2025</p>
            </div>
           </div>
           <div className='flex gap-4 items-center'>
              <div>
                <span className='text-gray-400'>230$</span>
              </div>
           <div className='border border-gray-400 rounded-2xl px-3 py-0.5'>
            confirmed
           </div>

           </div>

          </div>
           
           <div className='px-3 flex justify-between'>
           <div className='flex gap-2 items-center'>
            <div className='bg-blue-100 rounded-full p-2'>
            <img src={assets.listIconColored} className='w-5'/>
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-[14px] text-black'>BMW 3 Series</p>
              <p className='text-[11px] text-gray-400'>4/1/2025</p>
            </div>
           </div>
           <div className='flex gap-4 items-center'>
              <div>
                <span className='text-gray-400'>230$</span>
              </div>
           <div className='border border-gray-400 rounded-2xl px-3 py-0.5'>
            confirmed
           </div>

           </div>

          </div>
           
           <div className='px-3 flex justify-between'>
           <div className='flex gap-2 items-center'>
            <div className='bg-blue-100 rounded-full p-2'>
            <img src={assets.listIconColored} className='w-5'/>
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-[14px] text-black'>BMW 3 Series</p>
              <p className='text-[11px] text-gray-400'>4/1/2025</p>
            </div>
           </div>
           <div className='flex gap-4 items-center'>
              <div>
                <span className='text-gray-400'>230$</span>
              </div>
           <div className='border border-gray-400 rounded-2xl px-3 py-0.5'>
            confirmed
           </div>

           </div>

          </div>



          </div>


        </div> 

          <div className='w-[316px] h-[162px] border border-blue-300 flex flex-col gap-4 px-5 py-5 rounded-lg'>
             <div>
              <p className='text-lg'>Monthly revenue</p>        
              <p className='text-sm text-gray-400'>revenue for current month</p>
           </div>   
            <div>
                <span className='text-blue-600 font-bold text-[32px]'>1230$</span>
            </div>

          </div>



       </div>


      </div>
    </div>
  )
}

export default Dashboard