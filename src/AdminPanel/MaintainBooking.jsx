import React from "react";

const bookings = [
  {
    carImg: "https://via.placeholder.com/60",
    carName: "Toyota Corolla",
    date: "4/10/2025 To 4/15/2025",
    total: "$447",
    status: "Confirmed",
    color: "bg-green-100 text-green-600",
  },
  {
    carImg: "https://via.placeholder.com/60",
    carName: "Honda Civic",
    date: "4/10/2025 To 4/15/2025",
    total: "$447",
    status: "Completed",
    color: "bg-blue-100 text-blue-600",
  },
  {
    carImg: "https://via.placeholder.com/60",
    carName: "BMW 3 Series",
    date: "4/10/2025 To 4/15/2025",
    total: "$447",
    status: "Pending",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    carImg: "https://via.placeholder.com/60",
    carName: "Tesla Model 3",
    date: "4/10/2025 To 4/15/2025",
    total: "$447",
    status: "Available",
    color: "bg-emerald-100 text-emerald-600",
  },
];

export default function MaintainBooking() {
  return (
    <div className="w-full px-10 py-10">
      
      {/* Header */}
      <h1 className="text-2xl font-semibold">Manage Bookings</h1>
      <p className="text-gray-500 text-sm mt-1">
        Track all customer bookings, approve or cancel requests, and manage booking statuses
      </p>

      {/* Table */}
      <div className="mt-6 border rounded-lg overflow-hidden bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="py-4 px-6">Car</th>
              <th className="py-4 px-6">Date Range</th>
              <th className="py-4 px-6">Total</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6">Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b, i) => (
              <tr key={i} className="border-t">
                
                {/* Car */}
                <td className="py-4 px-6 flex items-center gap-3">
                  <img
                    src={b.carImg}
                    alt={b.carName}
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  <span>{b.carName}</span>
                </td>

                {/* Date */}
                <td className="py-4 px-6 text-gray-700">{b.date}</td>

                {/* Total */}
                <td className="py-4 px-6">{b.total}</td>

                {/* Status Badge */}
                <td className="py-4 px-6">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${b.color}`}
                  >
                    {b.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="py-4 px-6">
                  <select className="border rounded-md px-3 py-1 outline-none cursor-pointer">
                    <option>Cancel</option>
                    <option>Approve</option>
                    <option>Delete</option>
                  </select>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
