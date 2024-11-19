import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//API imports:
import { seeAvailability } from "../../utils/patientApi";
import { seeAllByRole } from "../../utils/universalApi";

export default function ScheduleAppt() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [providersData, setProvidersData] = useState([]);
  const [providerAvailability, setProviderAvailability] = useState(null);

  //FETCH PROVIDER DATA: using a req.query
  const fetchProviderData = async () => {
    try {
      // const token = Auth.retrieveTokenFromLocalStorage();
      const response = await seeAllByRole("provider");
      const providerNames = await response.json();

      // console.log(providerNames);
      setProvidersData(providerNames);
    } catch (error) {
      console.log(error);
    }
  };

  //PULL ALL PROVIDERS' NAMES: on page load, we need to run the API that pulls all of the provider names
  useEffect(() => {
    fetchProviderData();
  }, []);

  const handleDocChange = (event) => {
    setSelectedDoctor(event.target.value);
  };

  function formatDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const formattedMonth = month < 10 ? "0" + month : month;
    const formattedDay = day < 10 ? "0" + day : day;

    return `${year}-${formattedMonth}-${formattedDay}`;
  }
  // console.log(new Date().getDate());

  //SUBMIT
  const handleSubmit = async (event) => {
    event.preventDefault();

    //creating an object because we have to get acces to TWO properties in order for seeAvailability API to run on back-end (it takes in "providerId" and "availableDate")
    const userOptions = {
      providerId: selectedDoctor,
      availableDate: formatDate(selectedDate),
    };

    try {
      // const token = Auth.retrieveTokenFromLocalStorage();
      const response = await seeAvailability(userOptions);
      const availability = await response.json();

      setProviderAvailability(availability);
    } catch (error) {
      console.log(error);
    }
  };

  //BOOKING AN APPOINTMENT
  const handleBookAppt = (apptId) => {
    const obj = {
      providerId: selectedDoctor,
      provider_availability_id: apptId,
    };
    console.log(obj);
  };

  return (
    <div>
      {/* when patient schedules an appt, we need to have access to the providers availability. */}
      {/* first the user has to select the provider, then the use can see/ select their appointment based on the availability */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Schedule an Appointment</h1>
        <div>
          <div className="bg-blue-500 p-4 rounded shadow mb-4">
            <label className="block text-white mb-2" htmlFor="doctor-select">
              Choose a doctor:
            </label>
            <select
              id="doctor-select"
              className="block w-full bg-white border border-blue-300 rounded shadow appearance-none p-2 text-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
              onChange={handleDocChange}
            >
              <option value="">--Select Doctor--</option>
              {providersData.map((provider) => (
                <option key={provider.id} value={provider.id}>
                  {provider.firstName} {provider.lastName}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-blue-500 p-4 rounded shadow">
            <label className="block text-white mb-2">Select a Date:</label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              className="block w-full bg-white border border-blue-300 rounded shadow p-2 text-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
              dateFormat="MM-dd-yyy"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 p-3 rounded shadow text-white mt-4"
          >
            See Availability
          </button>
        </div>
        {providerAvailability && (
          <div className="bg-blue-500 p-4 rounded shadow mt-4">
            {/* if providerAvailability is equal to a certain message that the backend sends when there is NO data, then display "No availability this date", else display a button with the available time. On clicking the button, it will run handleBookAppt with a parameter of that appointments' specific id.*/}
            {providerAvailability === "no appointments found"
              ? "No availability this date"
              : providerAvailability.map((x) => (
                  <button
                    key={x.id}
                    className="bg-white p-3 rounded shadow-lg text-blue-500 m-4"
                    onClick={() => handleBookAppt(x.id)}
                  >
                    {x.availableStartTime}
                  </button>
                ))}
          </div>
        )}
      </div>
    </div>
  );
}