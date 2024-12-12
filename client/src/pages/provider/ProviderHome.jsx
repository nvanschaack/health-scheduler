import { useState, useEffect } from "react";
import Header from "../../components/Header";
import auth from "../../utils/auth";
import { formatDate } from "../../utils/tools";
import MedicalHxFormModal from "../../components/provider/modal/MedicalHxFormModal";
import SeeMedicalHxModal from "../../components/provider/modal/SeeMedicalHxModal";

//API IMPORTS
import { dayOfAppts, seeOneApptProvider } from "../../utils/providerApi";
import { getMedicalHx } from "../../utils/providerApi";

export default function ProviderHome() {
  //STATE VARIABLES
  const [appointmentTodayData, setAppointmentTodayData] = useState([]);
  const [id, setId] = useState(null);
  const [appointmentInfo, setAppointmentInfo] = useState({});
  // MODAL STATE
  const [showMedHxFormModal, setShowMedHxFormModal] = useState(false);
  const [showMedHxModal, setShowMedHxModal] = useState(false);
  const [history, setHistory] = useState([]);
  const [patientId, setPatientId] = useState(null);

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

  //SEE MEDICAL HX MODAL (being passed as props to SeeMedicalHxModal.jsx)
  // Passing state "history" which we set in this function as a prop so it can be accessed in seeMedicalHxModal
  const seeMedHx = async () => {
    try {
      const medHx = await getMedicalHx(token, patientId);
      const response = await medHx.json();
      setHistory(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    seeMedHx();
  }, [patientId]);

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
      setPatientId(response[0].patientId);
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
          <div className="flex-1 bg-blue-50 text-gray-800 p-4 rounded-lg shadow-md border border-blue-100">
            {appointmentTodayData.length > 0 ? (
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
            )}
          </div>
          {/* TRUE BOOLEAN: if appointment info exists, show this chunk of HTML */}
          {appointmentInfo && (
            <div className="w-full max-w-md mx-auto mt-4 bg-white shadow-md rounded-lg border border-gray-200">
              <div className="bg-blue-50 border-b border-blue-100 p-4">
                <h2 className="text-blue-800 text-lg font-semibold">
                  Appointment Information
                </h2>
              </div>
              <div className="p-4 space-y-3">
                <p className="text-gray-700 font-medium">
                  Patient:
                  <span className="ml-2 text-blue-800">
                    {appointmentInfo.patient_firstName}{" "}
                    {appointmentInfo.patient_lastName}
                  </span>
                </p>
                <p>
                  Age:
                  <span> {appointmentInfo.patient_age}</span>
                </p>
                <p>
                  DOB:
                  <span> {appointmentInfo.dob}</span>
                </p>
                <p className="text-gray-600">
                  Appointment Time:
                  <span className="ml-2 text-blue-700">
                    {appointmentInfo.start}
                  </span>
                </p>
                <div className="flex space-x-3 pt-2">
                  <button
                    className="w-full py-2 px-4 border border-blue-500 text-blue-700 rounded-md 
                       hover:bg-blue-50 transition-colors duration-200 focus:outline-none 
                       focus:ring-2 focus:ring-blue-300"
                    onClick={() => setShowMedHxModal(true)}
                  >
                    See Medical History
                  </button>
                  <button
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-md 
                       hover:bg-blue-700 transition-colors duration-200 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => setShowMedHxFormModal(true)}
                  >
                    Add Medical History
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {showMedHxFormModal ? (
        <MedicalHxFormModal
          setShowMedHxFormModal={setShowMedHxFormModal}
          patientId={appointmentInfo.patientId}
          seeMedHx ={seeMedHx}
        />
      ) : null}
      {showMedHxModal ? (
        <SeeMedicalHxModal
          setShowMedHxModal={setShowMedHxModal}
          history={history}
          patientFirstName={appointmentInfo.patient_firstName}
          patientLastName={appointmentInfo.patient_lastName}
        />
      ) : null}
    </div>
  );
}
