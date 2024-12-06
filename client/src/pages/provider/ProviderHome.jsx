import { useState, useEffect } from "react";
import Header from "../../components/Header";
import auth from "../../utils/auth";
import { formatDate } from "../../utils/tools";

//API IMPORTS
import { dayOfAppts, seeOneApptProvider } from "../../utils/providerApi";

export default function ProviderHome() {
  //STATE VARIABLES
  const [appointmentTodayData, setAppointmentTodayData] = useState([]);
  const [id, setId] = useState(null);
  const [appointmentInfo, setAppointmentInfo] = useState({});

  //GLOBAL TOKEN
  const token = auth.retrieveTokenFromLocalStorage();

  //setting the state for appointments just for the current day (an array)
  const appointmentsToday = async () => {
    try {
      const appts = await dayOfAppts(token);
      const response = await appts.json();

      setAppointmentTodayData(response);
    } catch (error) {
      console.log(error);
    }
  };

  //setting state for one appointment depending on which appointment is clicked on (the click event is what sets state for "id" so we can then see that specific appointments info on the right-hand side)
  const seeApptProvider = async () => {
    try {
      //the backend is expecting a req.body object, so sending just "id" won't work since it's a string. We have to put id in an object with the key matching the name we gave it on the backend (appointmentId)
      const readableId = {
        appointmentId: id,
      };

      const oneAppt = await seeOneApptProvider(token, readableId);
      const response = await oneAppt.json();

      setAppointmentInfo(response[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    appointmentsToday();
  }, []);

  const clickable = (appointmentId) => {
    setId(appointmentId);
  };

  useEffect(() => {
    seeApptProvider();
  }, [id]);

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-xl font-bold mb-4">Provider Dashboard</h2>
        <h1 className="text-2xl font-bold mb-4">
          {formatDate(new Date())} Schedule
        </h1>
        <div className="flex space-x-4">
          <div className="flex-1 bg-blue-500 text-white p-4 rounded shadow">
            {appointmentTodayData.length > 0 ? (
              appointmentTodayData?.map((appointment, i) => (
                <div
                  className="mt-4 bg-blue-700 p-4 rounded shadow"
                  key={i}
                  onClick={() => clickable(appointment.id)}
                >
                  <p>
                    {appointment.time} - {appointment.patientName}
                  </p>
                </div>
              ))
            ) : (
              <h1>No Appointments Scheduled Today.</h1>
            )}
          </div>
          <div className="flex-1 bg-green-500 text-white p-4 rounded shadow">
            {/* TRUE BOOLEAN: if appointmentInfo exists, display its information */}
            {appointmentInfo && (
              <div className="mt-4 bg-green-500  p-4  ">
                <h3 className="text-lg font-bold">Appointment Information</h3>
                <p>
                  {appointmentInfo.patient_firstName}{" "}
                  {appointmentInfo.patient_lastName}
                </p>
                <p>{appointmentInfo.start}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
