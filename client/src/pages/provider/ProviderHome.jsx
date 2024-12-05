import { useState, useEffect } from "react";
import Header from "../../components/Header";
import auth from "../../utils/auth";

//API IMPORTS
import { dayOfAppts } from "../../utils/providerApi";

export default function ProviderHome() {
  const [appointmentTodayData, setAppointmentTodayData] = useState([]);

  const appointmentsToday = async () => {
    const token = auth.retrieveTokenFromLocalStorage();
    const appts = await dayOfAppts(token);
    const response = await appts.json();

    setAppointmentTodayData(response);
  };

  useEffect(() => {
    appointmentsToday();
  }, []);

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Provider Dashboard</h1>
        <div className="flex space-x-4">
          <div className="flex-1 bg-blue-500 text-white p-4 rounded shadow">
            {appointmentTodayData.map((appointment)=>(
              <div className="mt-4 bg-blue-700 p-4 rounded shadow">
                <p>{appointment.time} - {appointment.patientName}</p>
              </div>
            ))}
          </div>
          <div className="flex-1 bg-green-500 text-white p-4 rounded shadow"></div>
        </div>
      </div>
    </div>
  );
}
