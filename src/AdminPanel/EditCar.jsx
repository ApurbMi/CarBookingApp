import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { getLatLongFromAddress } from "../Utilites/getLatLong";

function EditCar() {
  const { Id } = useParams();

  const [car, setCar] = useState(null);

  // form states
  const [orginialAddress,setOrignialAddress] = useState('');
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [category, setCategory] = useState("");
  const [transmission, setTransmission] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [seating, setSeating] = useState("");
  const [dailyPrice, setDailyPrice] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
 
  // image states
  const [image, setImage] = useState(null); // existing image URL or preview
  const [newImage, setNewImage] = useState(null); // new file

  /* ================= FETCH CAR ================= */
  useEffect(() => {
    getCarById();
  }, [Id]);

  const getCarById = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/admin/car/${Id}`
      );

      if (res.data.success) {
        const data = res.data.carData;
        setCar(data);

        // populate form AFTER data arrives
        setBrand(data.brand);
        setModel(data.model);
        setYear(data.year);
        setCategory(data.category);
        setTransmission(data.transmission);
        setFuelType(data.fuel_type);
        setSeating(data.seating_capacity);
        setDailyPrice(data.pricePerDay);
        setDescription(data.description);
        setAddress(data.location.address);
        setImage(data.image);
        setOrignialAddress(data.location.address);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  /* ================= IMAGE ================= */
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      setImage(URL.createObjectURL(file)); // preview
    }
  };

  /* ================= UPDATE ================= */
  const updateCar = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      if(address!=orginialAddress){
        const coordinate = await getLatLongFromAddress(address);
         if(coordinate===null){
            toast.error('Invalid address');
            return;
         }
         formData.append('location',JSON.stringify({
            address,
            Longitude:coordinate.Longitude,
            Latitude:coordinate.Latitude
         }))
        }
      if (newImage) formData.append("image", newImage);

      formData.append("brand", brand);
      formData.append("model", model);
      formData.append("year", year);
      formData.append("category", category);
      formData.append("transmission", transmission);
      formData.append("fuel_type", fuelType);
      formData.append("seating_capacity", seating);
      formData.append("pricePerDay", dailyPrice);
      formData.append("description", description);
       const token = JSON.parse(localStorage.getItem('user')).userToken;
      const res = await axios.put(
        `http://localhost:5000/admin/update-car/${Id}`,
        formData,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
      );

      if (res.data.success) {
        toast.success("Car updated successfully");
      }
    } catch (err) {
      console.log(err.message);
      toast.error("Update failed");
    }
  };

  return (
    <div className="w-full px-10 py-10">
      <h1 className="text-2xl font-semibold">Edit Car</h1>

      {/* IMAGE */}
      <div className="flex items-center gap-5 mb-6 mt-5">
        <label
          htmlFor="carImage"
          className="w-32 h-32 border rounded-lg flex items-center justify-center cursor-pointer"
        >
          {image ? (
            <img
              src={image}
              alt="Car"
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <span className="text-gray-400">Upload</span>
          )}
        </label>

        <input
          type="file"
          id="carImage"
          className="hidden"
          accept="image/*"
          onChange={handleImageUpload}
        />
      </div>

      {/* FORM */}
      <form className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <input value={brand} onChange={e=>setBrand(e.target.value)} placeholder="Brand" />
        <input value={model} onChange={e=>setModel(e.target.value)} placeholder="Model" />
        <input value={year} onChange={e=>setYear(e.target.value)} placeholder="Year" type="number" />
        <input value={dailyPrice} onChange={e=>setDailyPrice(e.target.value)} placeholder="Price" type="number" />
        <input value={category} onChange={e=>setCategory(e.target.value)} placeholder="Category" />
        <input value={transmission} onChange={e=>setTransmission(e.target.value)} placeholder="Transmission" />
        <input value={fuelType} onChange={e=>setFuelType(e.target.value)} placeholder="Fuel Type" />
        <input value={seating} onChange={e=>setSeating(e.target.value)} placeholder="Seating" type="number" />
      </form>

      <div className="mt-5">
        <input
          value={address}
          onChange={e=>setAddress(e.target.value)}
          placeholder="Location"
          className="w-full border p-2 rounded"
        />
      </div>

      <div className="mt-5">
        <textarea
          value={description}
          onChange={e=>setDescription(e.target.value)}
          placeholder="Description"
          className="w-full border p-2 rounded"
          rows="4"
        />
      </div>

      <button
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded"
        onClick={updateCar}
      >
        ✔ Update Car
      </button>
    </div>
  );
}

export default EditCar;
