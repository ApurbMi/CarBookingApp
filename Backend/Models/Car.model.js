const mongoose = require('mongoose');

const carSchema = new mongoose.Schema(
  {
    
    brand: {
      type: String,
      required: true,
    },

    model: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    year: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    seating_capacity: {
      type: Number,
      required: true,
    },

    fuel_type: {
      type: String,
      required: true,
    },

    transmission: {
      type: String,
      required: true,
    },

    pricePerDay: {
      type: Number,
      required: true,
    },
    
    location: {
       address:{
          type:String,
          required:true,
       },
       Latitude:{
          type:Number,
          required:true,  
       },
       Longitude:{
          type:Number,
          required:true,
       }
    },

    description: {
      type: String,
      required: true,
    },

    isAvaliable: {
      type: Boolean,
      default:true
    },

  },
  { timestamps: true }
);

const Car = mongoose.model("Car", carSchema);

module.exports = Car
