import { useState, useEffect } from "react";
import Header from "../../components/Header";
import auth from "../../utils/auth";
import { formatDate } from "../../utils/tools";

  //API imports:
import { seeAllApptsByPatient, seeOneApptPatient } from "../../utils/patientApi";
  
export default function PatientHome() {
  const [id, setId] = useState(null);
  const [appointmentInfo, setAppointmentInfo] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [filterType, setFilterType] = useState("upcoming");
  const [appointments, setAppointments] = useState([]);

  const seeAllAppts = async() => {
    const token = auth.retrieveTokenFromLocalStorage();
    try {
      const response = await seeAllApptsByPatient(token);
      const allAppointments = await response.json();
      console.log(allAppointments);
      
      setAppointments(allAppointments);

    } catch (error) {
      console.log(error);
    }

  }
  useEffect(()=> {
    seeAllAppts()
  }, [])

  const clickable = (appointmentId) => {
    console.log(id);
    setId(appointmentId);
  };

  //NEED TO BRING IN SEEONEAPPTPATIENT API - BUT APPOINTMENT ID IS NOT RETURNING
  useEffect(() => {
    const appointment = appointments.find((apptId) => apptId.id === id);
    setAppointmentInfo(appointment);
  }, [id]);

  //event is technically not a parameter here - so we dont need to pass it as a param when we call it in the select tag
  const handleChange = (event) => {
    const value = event.target.value;

    setFilterType(value);
  };

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
        <h1 className="text-2xl font-bold mb-4">Patient Dashboard</h1>
        <div className="flex space-x-4">
          <div className="flex-1 bg-blue-500 text-white p-4 rounded shadow">
            <div className="flex items-center justify-between">
              <h2 className="text-xl">Appointments</h2>
              <select
                className="ml-4 bg-blue-700 text-white p-2 rounded"
                onChange={handleChange}
              >
                <option value="upcoming">Upcoming</option>
                <option value="all">All</option>
                <option value="past">Past</option>
              </select>
            </div>
            {filteredData.map((appointment) => (
              //we have to INVOKE the function on click versus automatically invoking on page load. so instead of just saying "clickable(appointment.id)", we say "() => clickable(appointment.id)"
              <div
                onClick={() => clickable(appointment.id)}
                className="mt-4 bg-blue-700 p-4 rounded shadow"
              >
                <p>{appointment.date}</p>
              </div>
            ))}
          </div>
          <div className="flex-1 bg-green-500 text-white p-4 rounded shadow">
            {/* TRUE BOOLEAN: if appointmentInfo exists, display its information */}
            {appointmentInfo && (
              <div className="mt-4 bg-green-500  p-4  ">
                <h3 className="text-lg font-bold">Appointment Information</h3>
                <p>{appointmentInfo.date}</p>
                <p>{appointmentInfo.time}</p>
                <p>{appointmentInfo.doctor}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
