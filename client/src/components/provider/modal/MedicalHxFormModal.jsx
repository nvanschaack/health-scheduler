import { useState } from "react";
import auth from "../../../utils/auth";
import ToastContainer from "../../ToastContainer";

//API IMPORTS
import { addMedicalHx } from "../../../utils/providerApi";

export default function MedicalHxFormModal({
  setShowMedHxFormModal,
  patientId,
}) {
  //STATE VARIABLES
  const [medicalHx, setMedicalHx] = useState({
    diagnosis: "",
    dateOfDiagnosis: "",
    tx: "",
    courseOfTx: "",
    patientId: patientId,
  });
  const [isVisible, setIsVisible] = useState(false);

  //handle the form changes
  const handleChange = (event) => {
    setMedicalHx({
      ...medicalHx,
      [event.target.name]: event.target.value,
    });
  };
//toast functionality
const showToast = () => {
  setIsVisible(true);
  setTimeout(() => {
    setIsVisible(false);
    setShowMedHxFormModal(false)
  }, 3000); // Toast will be visible for 3 seconds

};
  //handles the API
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(medicalHx);
    

    try {
      const token = auth.retrieveTokenFromLocalStorage();
      const hx = await addMedicalHx(token, medicalHx)   

      if (hx.ok) {
        showToast()
      }
    } catch (error) {
      console.log(error);
      
    }
  };

  return (
    <>
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-opacity-50 bg-black">
        <div className="relative w-[70%] my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
              <h3 className="text-3xl font=semibold">Add Medical History</h3>
            </div>
            <div className="relative p-6 flex-auto">
              {/* FORM: */}
              <form
                className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full"
                onSubmit={handleSubmit}
              >
                <label className="block text-black text-sm font-bold mb-1">
                  Diagnosis
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                  name="diagnosis"
                  value={medicalHx.diagnosis}
                  onChange={handleChange}
                />
                <label className="block text-black text-sm font-bold mb-1">
                  Date of diagnosis
                </label>
                <input
                  type="date"
                  className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                  name="dateOfDiagnosis"
                  value={medicalHx.dateOfDiagnosis}
                  onChange={handleChange}
                />
                <label className="block text-black text-sm font-bold mb-1">
                  Treatment
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                  name="tx"
                  value={medicalHx.tx}
                  onChange={handleChange}
                ></textarea>
                <label className="block text-black text-sm font-bold mb-1">
                  Course of treatment
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                  name="courseOfTx"
                  value={medicalHx.courseOfTx}
                  onChange={handleChange}
                ></textarea>
                <button
                  className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                type="button"
                onClick={() => setShowMedHxFormModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
        <ToastContainer isVisible={isVisible} setIsVisible={setIsVisible} message="Medical history added"/>
      </div>
    </>
  );
}
