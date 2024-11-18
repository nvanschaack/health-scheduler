import { useState, useEffect } from "react";
import Header from "../../components/Header";
export default function PatientHome() {
  const [id, setId] = useState(null);
  const [appointmentInfo, setAppointmentInfo] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [filterType, setFilterType] = useState("upcoming");

  const appointments = [
    {
      id: 1,
      date: "2024-11-14",
      time: "09:00 AM",
      doctor: "Dr. John Smith",
    },
    {
      id: 2,
      date: "2024-11-14",
      time: "10:30 AM",
      doctor: "Dr. Emily Johnson",
    },
    {
      id: 3,
      date: "2024-11-15",
      time: "11:00 AM",
      doctor: "Dr. Michael Brown",
    },
    {
      id: 4,
      date: "2024-11-16",
      time: "01:00 PM",
      doctor: "Dr. Sarah Davis",
    },
    {
      id: 5,
      date: "2024-11-17",
      time: "02:30 PM",
      doctor: "Dr. James Wilson",
    },
  ];

  const clickable = (appointmentId) => {
    // console.log(id);
    setId(appointmentId);
  };

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
