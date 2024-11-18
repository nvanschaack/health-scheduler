import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { seeAvailability } from "../../utils/patientApi";

export default function ScheduleAppt() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const appointments = [
    {
      id: 1,
      doctor: "Dr. John Smith",
    },
    {
      id: 2,
      doctor: "Dr. Emily Johnson",
    },
    {
      id: 3,
      doctor: "Dr. Michael Brown",
    },
    {
      id: 4,
      doctor: "Dr. Sarah Davis",
    },
    {
      id: 5,
      doctor: "Dr. James Wilson",
    },
  ];

  const handleDocChange = (event) => {
    setSelectedDoctor(event.target.value)
  };

  console.log(selectedDoctor);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1); 
    const day = date.getDate();

    const formattedMonth = month < 10 ? '0' + month : month;
    const formattedDay = day < 10 ? '0' + day : day;

    return `${year}-${formattedMonth}-${formattedDay}`
  };
  
  console.log(formatDate(selectedDate));
  // console.log(new Date().getDate());

  const handleSubmit = async (event) => {
    event.preventDefault();

    //when user clicks submit, we want to run the "seeAvailability" API - the date and the provider ID provided will be used as parameters to find what times the provider is available
  }

  return (
    <div>
      {/* when patient schedules an appt, we need to have access to the providers availability. */}
      {/* first the user has to select the provider, then the use can see/ select their appointment based on the availability */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Schedule an Appointment</h1>

        <div className="bg-blue-500 p-4 rounded shadow mb-4">
          <label className="block text-white mb-2" htmlFor="doctor-select">
            Choose a doctor:
          </label>
          <select
            id="doctor-select"
            className="block w-full bg-white border border-blue-300 rounded shadow appearance-none p-2 text-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
            onChange={handleDocChange}
          >
            <option value="">--Select Doctor--</option>
            {appointments.map((appointment) => (
              <option key={appointment.id} value={appointment.id}>
                {appointment.doctor}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-blue-500 p-4 rounded shadow">
          <label className="block text-white mb-2">Select a Date:</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="block w-full bg-white border border-blue-300 rounded shadow p-2 text-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
            dateFormat="yyyy-MM-dd"
          />
        </div>
        <button className="bg-blue-500 p-3 rounded shadow text-white mt-4"> Submit </button>
      </div>
    </div>
  );
}
