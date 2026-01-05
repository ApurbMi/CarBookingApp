import React, { useState } from "react";
import { getLatLongFromAddress } from "../Utilites/getLatLong";
import  {toast} from 'react-hot-toast'
import axios from "axios";

function AddCar() {
   const [image, setImage] = useState(null);
   const [model,setModel] = useState("");
   const [brand,setBrand] = useState("");
   const [transmission,setTransmission] = useState("");
   const [seating,setSeating] = useState(0);
   const [category,setCategoty] = useState("");
   const [fuelType,setfuelType] = useState("");
   const [location,setLocation] = useState({
      Latitude:0,
      Longitude:0,
  })
  const [address,setAdress] = useState('');
   const [description,setDescription] = useState("");
   const[year,setYear] = useState(0);
    const [dailyPrice,setDailyPrice] = useState(0);
   const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
   };



const uploadCar = async (e)=>{
        e.preventDefault(); 
       const formData = new FormData();
       let data = JSON.parse(localStorage.getItem("user"));

   console.log(address);
const res = await getLatLongFromAddress(address);
   if(res===null){
      toast.error('Invalid address');
      return;
   }
   setLocation({
     Longitude:res.Longitude,
     Latitude:res.Latitude,
   })      
  
formData.append("brand", brand);
formData.append("model", model);
formData.append("image", image); // File object OR image URL
formData.append("year", year);
formData.append("category", category);
formData.append("seating_capacity", seating);
formData.append("fuel_type", fuelType);
formData.append("transmission", transmission);
formData.append("pricePerDay", dailyPrice);
formData.append("description", description);
formData.append("location",JSON.stringify({
     address:address,
     Longitude:res.Longitude,
     Latitude:res.Latitude
}));
   
try{
const res = await axios.post('http://localhost:5000/admin/car-post',formData,{
    headers:{
      Authorization:`Bearer ${data?.userToken}`
    }
   });
   
    if(res.data.success===true){
      console.log(res);
      toast.success('Car Added successfully');
      setAdress('');
      setBrand('');
      setCategoty('');
      setDailyPrice(0);
      setDescription('');
      setImage(null);
      setSeating(0);
      setTransmission('');
      setYear(0);
      setfuelType('');
      setModel('')
    }

  }
   catch(err){
    console.error(err);
   }  
    
}




  return (
    <div className="w-full px-10 py-10">
      <h1 className="text-2xl font-semibold">Add New Car</h1>
      <p className="text-gray-500 mb-6">
        Fill in details to list a new car for booking, including pricing, availability, and car specifications.
      </p>

      {/* Image Upload */}
      <div className="flex items-center gap-5 mb-6">
        <label
          htmlFor="carImage"
          className="w-32 h-32 border border-gray-300 rounded-lg flex flex-col justify-center items-center cursor-pointer"
        >
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="Car Preview"
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <span className="text-gray-400 text-sm">Upload</span>
          )}
        </label>

        <input type="file" id="carImage" className="hidden" 
        onChange={handleImageUpload} />

        <p className="text-gray-500">Upload a picture of your car</p>
      </div>

      {/* Form */}
      <form className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {/* Brand */}
        <div className="flex flex-col">
          <label className="mb-1">Brand</label>
          <input
            type="text"
            placeholder="e.g. BMW, Mercedes, Audi..."
            className="input outline-none border border-gray-300 rounded-xl py-2 px-2"
            value={brand}
            onChange={(e)=>{
               setBrand(e.target.value)
            }}
          />
        </div>

        {/* Model */}
        <div className="flex flex-col">
          <label className="mb-1">Model</label>
          <input
            type="text"
            placeholder="e.g. X5, E-Class, M4..."
            className="input outline-none border border-gray-300 rounded-xl py-2 px-2"
            value={model}
            onChange={(e)=>{
              setModel(e.target.value);
            }}
          />
        </div>

        {/* Year */}
        <div className="flex flex-col">
          <label className="mb-1">Year</label>
          <input
            type="number"
            placeholder="2025"
            className="input outline-none border border-gray-300 rounded-xl py-2 px-2"
            value={year}
            onChange={(e)=>{
               setYear(e.target.value);           
            }}
          />
        </div>

        {/* Price */}
        <div className="flex flex-col">
          <label className="mb-1">Daily Price ($)</label>
          <input
            type="number"
            placeholder="100"
            className="input outline-none border border-gray-300 rounded-xl py-2 px-2"
            value={dailyPrice}
            onChange={(e)=>{
              setDailyPrice(e.target.value);
            }}
          />
        </div>

        {/* Category */}
        <div className="flex flex-col">
          <label className="mb-1">Category</label>
          <input
            type="text"
            placeholder="Sedan, SUV, Hatchback..."
            value={category}
            className="input outline-none border border-gray-300 rounded-xl py-2 px-2"
            onChange={(e)=>{
                  setCategoty(e.target.value);
            }}
          />
        </div>

        {/* Transmission */}
        <div className="flex flex-col">
          <label className="mb-1">Transmission</label>
          <input
            type="text"
            placeholder="Automatic / Manual"
            value={transmission}
            className="input outline-none border border-gray-300 rounded-xl py-2 px-2"
            onChange={(e)=>{
               setTransmission(e.target.value);
            }}
          />
        </div>

        {/* Fuel Type */}
        <div className="flex flex-col">
          <label className="mb-1">Fuel Type</label>
          <input
            type="text"
            placeholder="Petrol, Diesel, EV..."
            value={fuelType}
            className="input outline-none border border-gray-300 rounded-xl py-2 px-2"
            onChange={(e)=>{
               setfuelType(e.target.value);
            }}
          />
        </div>

        {/* Seating */}
        <div className="flex flex-col">
          <label className="mb-1">Seating Capacity</label>
          <input
            type="number"
            placeholder="5"
            value={seating}
            className="input outline-none border border-gray-300 rounded-xl py-2 px-2"
            onChange={
              (e)=>{
                   setSeating(e.target.value);
              }
            }
          />
        </div>
      </form>

      {/* Location */}
      <div className="mt-5 flex flex-col">
        <label className="mb-1">Location</label>
        <input
          type="text"
          placeholder="e.g. San Francisco, CA"
          value={address}
          className="input outline-none border border-gray-300 rounded-xl py-2 px-2 w-full"
          onChange={(e)=>{
               setAdress(e.target.value);  
          }}
        />
      </div>

      {/* Description */}
      <div className="mt-5 flex flex-col">
        <label className="mb-1">Description</label>
        <textarea
          placeholder="Describe your car, its condition, and any notable details..."
          rows="4"
          value={description}
          className="input outline-none border border-gray-300 rounded-xl py-2 px-2 w-full resize-none"
          onChange={(e)=>{
             setDescription(e.target.value);
          }}
        ></textarea>
      </div>

      {/* Submit Button */}
      <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
       onClick={(e)=>{
          uploadCar(e);
       }}
      >
        ✔ List Your Car
      </button>
    </div>
  );
}

export default AddCar;
