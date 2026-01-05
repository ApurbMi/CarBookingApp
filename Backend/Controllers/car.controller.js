const Car = require("../Models/Car.model");
const carUpdate = require("../Utilites/carUpdate.utilite");
const uploadToCloudinary = require("../Utilites/cloudinary.utilite");
const sendResponse = require("../Utilites/error.utilite");
const mongoose = require('mongoose');


 const addCar = async (req, res,next) => {
      const role =  req.user.role;
     

       if(role==='user'){
          return next(sendResponse(401,'User is not allowed to perform this'));
       }

    try {
        const car = req.body;
        if (!req.file) {
            return res.status(401).json({
                success: false,
                message: "Image file is required",
            });
        }
    
         const parsedLocation = JSON.parse(car.location);
        const found = await Car.findOne({
            brand: car.brand,
            model: car.model,
            category: car.category,
            seating_capacity: Number(car.seating_capacity),
            fuel_type: car.fuel_type,
            transmission: car.transmission,
            description: car.description,
            "location.address": parsedLocation.address,
            year: Number(car.year),
        });
       
        if (found) {
            return res.status(200).json({
                message: "Duplicate car found!",
                success: false,
            });
        }
        
        const result = await uploadToCloudinary(req.file.buffer, "car-rental/car");
             const latitude = Number(parsedLocation.Latitude);
const longitude = Number(parsedLocation.Longitude);

         const carObj = new Car({
      brand: req.body.brand,
      model: req.body.model,
      category: req.body.category,
      seating_capacity: Number(req.body.seating_capacity),
      fuel_type: req.body.fuel_type,
      transmission: req.body.transmission,
      year: Number(req.body.year),
      pricePerDay: Number(req.body.pricePerDay),
      description: req.body.description,
      location:{
        address:parsedLocation.address,
        Latitude:latitude,
        Longitude:longitude
      },
      image: result.secure_url,
    });


        await carObj.save();

        return res.status(200).json({
            message: "Car saved successfully",
            success: true,
        });
    } 
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: err.message,
            success: false,
        });
    }
};

 const getAllCar = async (req,res,next)=>{
      
          await carUpdate();
        
        try{
          const allCar = await Car.find();
            
          return res.status(200).json({
             message:'All car list',
             allCar:allCar,
             success:true
          })
        }
        catch(err){
             next(err);
        }

}

const getCarById = async(req,res,next)=>{
    const carId = req.params.Id; 
    
    try{
      const carData  = await Car.findById(carId);
        if(!carData){
            return res.json({
                message:'No such car is found',
                success:false
            })
        }
         res.status(200).json({
            message:'Car found',
            success:true,
            carData
         });

    }
    catch(err){
        next(err);
    }
}



const updateCar = async (req,res,next)=>{
    const role = req.user.role;
     if(role==='user'){
        return res.status(401).json({
            message:'User are not allowed',
            success:false
        })
     }
      
    
      try{
    const id =  req.params.id;
    console.log(id);
     if(!mongoose.Types.ObjectId.isValid(id)){
        return next(sendResponse(401,'Id is not valid'));
     }

    let updateKeys = req.body;
    if(updateKeys?.location){
        updateKeys.location = JSON.parse(updateKeys.location);
    }


    if(req.file){
        const result = await uploadToCloudinary(req.file.buffer, "car-rental/car");
        updateKeys = {
            ...updateKeys,
            image:result.secure_url
        }
    }
       
    const updatedCar = await Car.findByIdAndUpdate(id,updateKeys,{new:true,runValidators:true});
                if(!updatedCar){
                   return next(sendResponse(404,'Car not found'));
                } 
                    
        return res.status(200).json({
            message:'Car update successfull',
            success:true,
            updatedCar:updatedCar.toObject()
      });
         

      }
      catch(err){
         next(err);
      }
}

const deleteCar = async (req,res,next)=>{
     const role = req.user.role;
     console.log(role);
     if(role==='user'){
        return res.status(401).json({
            message:'User is not allowed',
            success:false
        })
     }  
     try{
        const id = req.params.id;
           if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(sendResponse(401, 'Invalid car id'));
    }

        const flag = await Car.findByIdAndDelete(id);
        if(!flag){
            return next(sendResponse(401,'Car not found'));
        }
        return res.status(200).json({
            message:'Car deleted successfully',
            success:true,
            data:flag
        }); 

     }
     catch(err){
           next(err);
     }
    
}


module.exports = {
addCar,
deleteCar,
updateCar,
getAllCar,
getCarById
}


