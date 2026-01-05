import React, { useEffect, useState } from "react";
import {LucideDelete,Edit} from 'lucide-react'
import axios from "axios";
import {toast} from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function EditAndDelete() {
  
const [carArray,setCarArray] = useState([]);
const Navigate = useNavigate();
const getAllCar = async ()=>{
    
  try{
    const res = await axios.get("http://localhost:5000/admin/all-cars");
     if(res.data.success===true){
        setCarArray(res.data.allCar);
     }
     else{
       toast.error(res.data.message);
     }

  }
  catch(err){
    toast.error(err.message);
  }
}

const handleDelete = async (carId)=>{   
  const data = JSON.parse(localStorage.getItem('user'));   
try{
  const res = await axios.delete(`http://localhost:5000/admin/delete-car/${carId}`,{
     headers:{
      Authorization:`Bearer ${data?.userToken}`
    }
  });
  if(res.data.success===true){
     toast.success('Car deleted successfully');
  } 
  else{
    toast.error(res.data.message);
  }
  await getAllCar();
}
catch(err){
toast.error(err.message);
}

}


useEffect(() => {
  const fetchCars = async () => {
    await getAllCar();
  };

  fetchCars();
}, []);



  return (
    <div className="w-full px-10 py-10">
      <h1 className="text-2xl font-semibold">Manage Cars</h1>
      <p className="text-gray-500 mb-6">
        View all listed cars, update their details, or remove them.
      </p>

      <div className="space-y-4">
        {carArray?.map((car) => (
          <div
            key={car?._id}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 border rounded-xl hover:shadow-sm transition"
          >
            {/* LEFT */}
            <div className="flex items-center gap-4">
              <img
                src={car?.image}
                alt={`${car?.brand} ${car?.model}`}
                className="w-24 h-20 rounded-lg object-cover"
              />

              <div>
                <h3 className="font-semibold text-lg">
                  {car?.brand} {car?.model}
                </h3>

                <p className="text-sm text-gray-500">
                  {car?.seating_capacity} seats • {car?.fuel_type} •{" "}
                  {car?.transmission}
                </p>

                <p className="text-sm text-gray-500">
                  {car?.category} • {car?.location?.address}
                </p>
              </div>
            </div>

            {/* MIDDLE */}
            <div className="text-left md:text-center">
              <p className="font-semibold text-lg">
                ₹{car?.pricePerDay}/day
              </p>

              <span
                className={`inline-block mt-1 text-sm px-3 py-1 rounded-full ${
                  car?.isAvaliable
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {car?.isAvaliable ? "Available" : "Not Available"}
              </span>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-4 text-gray-600">
              <Edit className="text-xl cursor-pointer hover:text-black" 
              onClick={()=>{
                Navigate(`/admin/editCar/${car._id}`);
              }}
              />
              <LucideDelete className="text-xl cursor-pointer hover:text-red-500" 
              onClick={()=>{
                handleDelete(car?._id);
              }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EditAndDelete;
