import { useState, useEffect } from "react";
import auth from "../../../utils/auth";

export default function SeeMedicalHxModal({
  setShowMedHxModal,
  history,
  patientFirstName,
  patientLastName,
}) {
  return (
    <div>
      <>
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-opacity-50 bg-black">
          <div className="relative w-[70%] my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                <h3 className="text-3xl font=semibold">
                  {patientFirstName} {patientLastName}
                </h3>
              </div>
              <div className="relative p-6 flex-auto">
                {/* MED HX CONTENT HERE */}
                {history.map((x, i) => (
                  <div
                    key={i}
                    className="bg-white border border-gray-200 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-gray-600 text-xs uppercase tracking-wide mb-1">
                          Date
                        </h3>
                        <p className="text-black text-sm font-semibold">
                          {x.date}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-gray-600 text-xs uppercase tracking-wide mb-1">
                          Diagnosis
                        </h3>
                        <p className="text-black text-sm font-semibold">
                          {x.diagnosis}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-gray-600 text-xs uppercase tracking-wide mb-1">
                          Treatment
                        </h3>
                        <p className="text-black text-sm font-semibold">
                          {x.tx}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-gray-600 text-xs uppercase tracking-wide mb-1">
                          Course of Treatment
                        </h3>
                        <p className="text-black text-sm font-semibold">
                          {x.courseOfTx}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  onClick={() => setShowMedHxModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}
