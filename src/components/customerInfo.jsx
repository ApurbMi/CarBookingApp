import React from "react";
import { assets } from "../assets/assets";
import { motion } from "motion/react";

function CustomerInfo() {
  // ⭐ Testimony Object Array
  const testimonials = [
    {
      img: assets.testimonial_image_1,
      name: "Emma Rodriguez",
      location: "Barcelona, Spain",
      text: `I've rented cars from various companies, but the experience with CarRental was exceptional."`,
      
    },
    {
      img: assets.testimonial_image_2,
      name: "John Smith",
      location: "New York, USA",
      text: `"CarRental made my trip so much easier. The car was delivered right to my door, and the customer service was fantastic!"`,
      
    },
    {
      img: assets.testimonial_image_1,
      name: "Ava Johnson",
      location: "Sydney, Australia",
      text: `"I highly recommend CarRental! Their fleet is amazing, and I always feel like I'm getting the best deal with excellent service."`,
      
    },
  ];

  return (
    <div className="lg:px-24 xl:px-44 md:px-16 px-6 py-28">
      
      {/* Title */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex flex-col items-center text-center justify-center"
      >
        <h1 className="text-[40px] text-gray-900 font-semibold">
          What Our Customers Say
        </h1>
        <p className="text-[16px] text-gray-500/90 max-w-156">
          Discover why discerning travelers choose StayVenture for their luxury
          accommodations around the world.
        </p>
      </motion.div>

      {/* ⭐ Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-8">
        {testimonials.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0,y:40 }}
            whileInView={{opacity: 1,y:0 }}
            transition={{
              duration: 0.6,
              delay: i * 0.2,
              ease: "easeOut",
            }}
            viewport={{ once: true, amount: 0.3 }}
            className="bg-white p-6 shadow-lg rounded-xl hover:-translate-y-2 duration-300"
          >
            <div className="flex items-center gap-3">
              <img src={item.img} className="w-12 h-12 rounded-full" />
              <div>
                <p className="text-xl">{item.name}</p>
                <p className="text-gray-500">{item.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-1 mb-2 mt-2">
              <img src={assets.star_icon} />
              <img src={assets.star_icon} />
              <img src={assets.star_icon} />
              <img src={assets.star_icon} />
              <img src={assets.star_icon} />
            </div>

            <p className="text-gray-500">{item.text}</p>
          </motion.div>
        ))}
      </div>

      {/* Subscribe section */}
      <div>
        <motion.div
          initial={{ opacity: 0,y:40 }}
            whileInView={{opacity: 1,y:0 }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: "easeOut"}} 
        className="flex flex-col items-center justify-center text-center py-10 md:my-10 my-3 mb-10 space-y-2">
          <h1 className="text-4xl font-semibold">Never Miss a Deal!</h1>
          <p className="text-[17px] text-gray-500 mt-2">
            Subscribe to get the latest offers, new arrivals, and exclusive
            discounts
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0,y:40 }}
            whileInView={{opacity: 1,y:0 }}
            transition={{
              duration: 0.7,
              delay: 0.5,
              ease: "easeOut"}}
        className="flex items-center md:h-13 h-12 max-w-2xl m-auto">
          <input
            type="text"
            placeholder="Enter your email id"
            className="outline-none border-r-none border border-gray-300 px-3 h-full w-full"
          />
          <button className="bg-blue-600 text-white md:h-13 h-12 px-5 rounded-r-sm sm:px-10">
            Subscribe
          </button>
        </motion.form>
      </div>
    </div>
  );
}

export default CustomerInfo;
