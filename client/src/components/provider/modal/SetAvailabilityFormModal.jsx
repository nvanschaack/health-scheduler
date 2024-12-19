import { useState } from "react";
import auth from "../../../utils/auth";

//API IMPORTS
import { setAvailability } from "../../../utils/providerApi";

export default function SetAvailabilityFormModal({
  setShowAvailabilityFormModal,
}) {
  //STATE
  const [availabilityData, setAvailabilityData] = useState({
    availableDate: "",
    availableStartTime: "",
    availableEndTime: "",
  });
  //GLOBAL TOKEN
  const token = auth.retrieveTokenFromLocalStorage();

  //ON CHANGE
  const handleChange = (event) => {
    setAvailabilityData({
      ...availabilityData,
      [event.target.name]: event.target.value,
    });
  };
  //ON SUBMIT
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      //bring in api
      const setAvailabilityProvider = await setAvailability(
        token,
        availabilityData
      );
      const response = await setAvailabilityProvider.json();
      console.log(response);
      //window refresh
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-opacity-50 bg-black">
        <div className="relative w-[70%] my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
              <h3 className="text-3xl font=semibold">Add Availability</h3>
            </div>
            <div className="relative p-6 flex-auto">
              {/* FORM: */}
              <form
                className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full"
                onSubmit={handleSubmit}
              >
                <label className="block text-black text-sm font-bold mb-1">
                  Date
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                  name="availableDate"
                  type="date"
                  value={availabilityData.availableDate}
                  onChange={handleChange}
                />
                <label className="block text-black text-sm font-bold mb-1">
                  Start time
                </label>
                <input
                  type="time"
                  className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                  name="availableStartTime"
                  value={availabilityData.availableStartTime}
                  onChange={handleChange}
                />
                <label className="block text-black text-sm font-bold mb-1">
                  End time
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                  name="availableEndTime"
                  type="time"
                  value={availabilityData.availableEndTime}
                  onChange={handleChange}
                />
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
                onClick={() => setShowAvailabilityFormModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
