import { useState, useEffect } from "react";
import Header from "../../components/Header";
import { formatDate } from "../../utils/tools";

export default function SetAvailability() {
  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-xl font-bold mb-4">Availibility Dashboard</h2>
        <h1 className="text-2xl font-bold mb-4">
          {/* {formatDate(new Date())} Schedule */}
        </h1>
        <div className="flex space-x-4">
          <div className="flex-1 bg-blue-50 text-gray-800 p-4 rounded-lg shadow-md border border-blue-100">
            {/* {appointmentTodayData.length > 0 ? (
              appointmentTodayData?.map((appointment, i) => (
                <div
                  className="mt-4 bg-blue-100 p-4 rounded-md shadow-sm 
                       hover:bg-blue-200 transition-colors duration-200 
                       cursor-pointer active:bg-blue-300"
                  key={i}
                  onClick={() => clickable(appointment.id)}
                >
                  <p className="text-blue-800 font-medium">
                    <span className="text-gray-700 mr-2">
                      {appointment.time}
                    </span>
                    {appointment.patientName}
                  </p>
                </div>
              ))
            ) : (
              <h1 className="text-gray-600 text-center py-4">
                No Appointments Scheduled Today.
              </h1>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}
