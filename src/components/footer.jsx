import React from 'react'
import { assets } from '../assets/assets'
import {Link} from 'react-router-dom'
import { motion } from 'motion/react'
function Footer() {
  return (
    <>
     <motion.footer
       initial={{ opacity: 0,y:60 }}
            whileInView={{opacity: 1,y:0 }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: "easeOut"}}
     className='lg:px-22 md:px-10'>
<div className='grid grid-cols-2 border gap-5 p-3 border-b border-gray-500 sm:grid-cols-2'>
<div className='max-w-80 text-[14px] text-gray-500'>
<img src={assets.logo}/>
<p className='mt-3'>
Premium car rental service with a wide selection of luxury and everyday vehicles for all your driving needs.
</p>
<div className='flex items-center gap-3 mt-5'>
  <img src={assets.facebook_logo}/>
  <img src={assets.gmail_logo}/>
  <img src={assets.instagram_logo}/>
  <img src={assets.twitter_logo}/>
</div>
</div>



 <div className="flex flex-col gap-3">
  <h1 className="text-xl font-semibold">Quick Links</h1>

  <Link to="/" className="text-sm text-gray-500">
    Home
  </Link>

  <Link to="/" className="text-sm text-gray-500">
    Browse Cars
  </Link>

  <Link to="/" className="text-sm text-gray-500">
    List Your Car
  </Link>

  <Link to="/" className="text-sm text-gray-500">
    About Us
  </Link>
</div>

 <div className="flex flex-col gap-3">
  <h1 className="text-xl font-semibold">Resources</h1>

  <Link to="/" className="text-sm text-gray-500">
    Help Center
  </Link>

  <Link to="/" className="text-sm text-gray-500">
    Terms of Service
  </Link>

  <Link to="/" className="text-sm text-gray-500">
    Privacy Policy
  </Link>

  <Link to="/" className="text-sm text-gray-500">
    Insurance
  </Link>
</div>

 <div className="flex flex-col gap-3">
  <h1 className="text-xl font-semibold">Contact</h1>

  <p className='text-sm text-gray-500'>1234 Luxury Drive</p>
  <p className='text-sm text-gray-500'>San Francisco, CA 94107</p>

  <p className="text-sm text-gray-500">
    +1 234 567 890
  </p>

  <p className="text-sm text-gray-500">
    info@example.com
  </p>
</div>





</div>

<div className='flex flex-col justify-between mt-4 mb-6 p-4 sm:flex-row'>
  <p className='text-sm text-gray-500'>© 2025 Brand.Mishra All rights reserved.

</p>
<p className='text-sm text-gray-500'>
  Privacy
|
Terms
|
Cookies
</p>

</div>



     </motion.footer>
    </>
  )
}

export default Footer