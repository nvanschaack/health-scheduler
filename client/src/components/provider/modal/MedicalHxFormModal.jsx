import { useState } from "react";
import auth from "../../../utils/auth";

//API IMPORTS
import { addMedicalHx } from "../../../utils/providerApi";

export default function MedicalHxFormModal({ setShowMedHxFormModal }) {
//STATE VARIABLES
const [medicalHx, setMedicalHx] = useState(
  {
    diagnosis: '',
    dateOfDiagnosis: '',
    tx: '',
    courseOfTx: '',
    patientId: 0
  }
);

const handleChange = (event) => {
  
};

//handles the API
const handleSubmit = (event) => {

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
              <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                <label className="block text-black text-sm font-bold mb-1">
                  Diagnosis
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" name="diagnosis" value={medicalHx.diagnosis}/>
                <label className="block text-black text-sm font-bold mb-1">
                  Date of diagnosis
                </label>
                <input
                  type="date"
                  className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                  name="dateOfDiagnosis"
                  value={medicalHx.dateOfDiagnosis}
                />
                <label className="block text-black text-sm font-bold mb-1">
                  Treatment
                </label>
                <textarea className="shadow appearance-none border rounded w-full py-2 px-1 text-black" name="tx" value={medicalHx.tx}></textarea>
                <label className="block text-black text-sm font-bold mb-1">
                  Course of treatment
                </label>
                <textarea className="shadow appearance-none border rounded w-full py-2 px-1 text-black" name="courseOfTx" value={medicalHx.courseOfTx}></textarea>
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
              <button
                className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                type="button"
                onClick={() => setShowMedHxFormModal(false)}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
