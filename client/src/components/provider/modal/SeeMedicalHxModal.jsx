import { useState, useEffect } from "react";
import auth from "../../../utils/auth";

export default function SeeMedicalHxModal({
  setShowMedHxModal,
  history,
  patientFirstName,
  patientLastName,
}) {
  return (
    <>
      <div className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden flex items-center justify-center p-4 bg-black bg-opacity-50">
        <div className="relative w-full max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl border border-gray-200 max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-300 rounded-t">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800">
                {patientFirstName} {patientLastName}
              </h3>
            </div>

            {/* Content - Scrollable */}
            <div className="flex-grow overflow-y-auto p-6">
              <div className="space-y-4">
                {history.map((x, i) => (
                  <div
                    key={i}
                    className="bg-white border border-gray-200 shadow-lg rounded-lg p-4 md:p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-3 md:gap-4">
                      <div>
                        <h3 className="text-gray-600 text-xs uppercase tracking-wide mb-1">
                          Date
                        </h3>
                        <p className="text-black text-sm md:text-base font-semibold break-words">
                          {x.date}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-gray-600 text-xs uppercase tracking-wide mb-1">
                          Diagnosis
                        </h3>
                        <p className="text-black text-sm md:text-base font-semibold break-words">
                          {x.diagnosis}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-gray-600 text-xs uppercase tracking-wide mb-1">
                          Treatment
                        </h3>
                        <p className="text-black text-sm md:text-base font-semibold break-words">
                          {x.tx}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-gray-600 text-xs uppercase tracking-wide mb-1">
                          Course of Treatment
                        </h3>
                        <p className="text-black text-sm md:text-base font-semibold break-words">
                          {x.courseOfTx}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end p-4 border-t border-gray-200 rounded-b">
              <button
                className="text-red-500 hover:bg-red-50 font-bold uppercase px-4 md:px-6 py-2 text-sm rounded transition-colors duration-200"
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
  );
}
