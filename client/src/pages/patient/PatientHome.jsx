import { useState, useEffect } from "react";
import Header from "../../components/Header";
import auth from "../../utils/auth";
import { formatDate } from "../../utils/tools";

//API imports:
import {
  seeAllApptsByPatient,
  seeOneApptPatient,
} from "../../utils/patientApi";

export default function PatientHome() {
  //STATE VARIABLES
  const [id, setId] = useState(null);
  const [appointmentInfo, setAppointmentInfo] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [filterType, setFilterType] = useState("upcoming");
  const [appointments, setAppointments] = useState([]);

  const seeAllAppts = async () => {
    const token = auth.retrieveTokenFromLocalStorage();
    try {
      const response = await seeAllApptsByPatient(token);
      const allAppointments = await response.json();

      setAppointments(allAppointments);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    seeAllAppts();
  }, []);

  const clickable = (appointmentId) => {
    setId(appointmentId);
  };

  const seeApptPatient = async () => {
    try {
      if (id !== null) {
        //the backend is expecting a req.body object, so sending just "id" won't work since it's a string. We have to put id in an object with the key matching the name we gave it on the backend (appointmentId)
        const readableId = {
          appointmentId: id,
        };
        const token = auth.retrieveTokenFromLocalStorage();
        const response = await seeOneApptPatient(readableId, token);
        const oneAppt = await response.json();
        setAppointmentInfo(oneAppt[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    seeApptPatient();
  }, [id]);

  //event is technically not a parameter here - so we dont need to pass it as a param when we call it in the select tag
  const handleChange = (event) => {
    const value = event.target.value;

    setFilterType(value);
  };

  //The appointments will be filtered based on the date
  const filterData = () => {
    const today = new Date();

    const past = appointments.filter((app) => {
      const appDate = new Date(app.date);
      return appDate < today;
    });

    const upcoming = appointments.filter((app) => {
      const appDate = new Date(app.date);
      return appDate >= today;
    });

    if (filterType === "upcoming") {
      setFilteredData(upcoming);
    } else if (filterType === "past") {
      setFilteredData(past);
    } else {
      setFilteredData(appointments);
    }
  };

  useEffect(() => {
    filterData();
  }, [filterType]);

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Patient Dashboard
        </h1>
        <div className="flex space-x-4">
          <div className="flex-1 bg-blue-50 text-gray-800 p-4 rounded-lg shadow-md border border-blue-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-blue-800">
                Appointments
              </h2>
              <select
                className="ml-4 bg-blue-600 text-white p-2 rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-blue-300 
                         transition-colors duration-200"
                onChange={handleChange}
              >
                <option value="upcoming">Upcoming</option>
                <option value="all">All</option>
                <option value="past">Past</option>
              </select>
            </div>
            {filteredData.map((appointment, index) => (
              <div
                key={index}
                onClick={() => clickable(appointment.id)}
                className="mt-4 bg-blue-100 p-4 rounded-md shadow-sm 
                         hover:bg-blue-200 transition-colors duration-200 
                         cursor-pointer active:bg-blue-300"
              >
                <p className="text-blue-800 font-medium">{appointment.date}</p>
              </div>
            ))}
          </div>
          <div className="flex-1 bg-blue-50 text-gray-800 p-4 rounded-lg shadow-md border border-blue-100">
            {/* TRUE BOOLEAN: if appointment info exists, show this chunk of HTML */}
            {appointmentInfo && (
              <div className="p-4 space-y-3">
                <h3 className="text-lg font-bold text-blue-800 border-b border-blue-100 pb-2">
                  Appointment Information
                </h3>
                <p className="text-gray-700">
                  <span className="font-medium text-blue-700 mr-2">Date:</span>
                  {appointmentInfo.date}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium text-blue-700 mr-2">Time:</span>
                  {appointmentInfo.time}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium text-blue-700 mr-2">
                    Provider:
                  </span>
                  {appointmentInfo.providerName}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
