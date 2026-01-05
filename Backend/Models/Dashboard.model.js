const mongoose = require('mongoose');

const dashboardSchema = new mongoose.Schema(
  {
    totalCars: {
      type: Number,
      default: 0,
    },

    totalBookings: {
      type: Number,
      default: 0,
    },

    pendingBookings: {
      type: Number,
      default: 0,
    },

    completedBookings: {
      type: Number,
      default: 0,
    },

    recentBookings: [
      {
        type: Object, // you can replace with Booking model reference later
        required: false,
      }
    ],

    monthlyRevenue: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Dashboard = mongoose.model("Dashboard", dashboardSchema);

module.exports = Dashboard;

