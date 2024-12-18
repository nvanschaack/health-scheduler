import { useState, useEffect } from "react";
import Header from "../../components/Header";
import auth from "../../utils/auth";

//API IMPORTS
import { seeAllAvailability } from "../../utils/providerApi";

export default function SetAvailability() {
  //STATE
  const [availabilityData, setAvailabilityData] = useState([]);

  //GLOBAL TOKEN
  const token = auth.retrieveTokenFromLocalStorage();

  const allAvailability = async () => {
    try {
      const providerAvailability = await seeAllAvailability(token);
      const response = await providerAvailability.json();

      //grouped represents the reduced array from the original array "response"
      const grouped = response.reduce((acc, item) => {
        //item represents each "item" in the array
        //deconstructing each item in the array to only pull out date and start time
        const { date, availableStartTime } = item;
        //if date doesn't exist as a key in the acc object, then make the date the key with an empty array as the value
        if (!acc[date]) acc[date] = [];
        //if the date matches an already existing date in the object, push the startTime into the empty array thats set as the value
        acc[date].push(availableStartTime);
        //return the object with all of the key-value pairs
        return acc;
      }, {});
      setAvailabilityData(grouped);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    allAvailability();
  }, []);

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-xl font-bold mb-4">Availability Dashboard</h2>
        <div className="flex space-x-4">
          <div className="flex-1 bg-blue-50 text-gray-800 p-4 rounded-lg shadow-md border border-blue-100">
            {/* USING OBJECT.ENTRIES TO MAP THROUGH THE DATE AND TIMES OF THE AVAILABILITYDATA OBJECT */}
            {Object.entries(availabilityData).map(([date, times]) => (
              <div key={date} className="mb-6">
                <h2 className="text-2xl font-bold text-blue-800 mb-3 border-b-2 border-blue-200 pb-2">
                  {date}
                </h2>
                <ul className="space-y-2">
                  {times.map((time, i) => (
                    <li
                      key={i}
                      className="bg-blue-100 p-3 rounded-md shadow-sm hover:bg-blue-200 transition-colors duration-200"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-blue-800 font-medium">
                          {time}
                        </span>
                        <span className="text-sm text-gray-600">
                          {time.isAvailable === 1 ? "Open" : "Booked"}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* {availabilityData.length > 0 ? (
              availabilityData?.map((x, i) => (
                <div
                  className="mt-4 bg-blue-100 p-4 rounded-md shadow-sm 
                       hover:bg-blue-200 transition-colors duration-200 
                       cursor-pointer active:bg-blue-300"
                  key={i}
                  // onClick={() => clickable(appointment.id)}
                >
                  <p className="text-blue-800 font-medium">
                    <span className="text-gray-700 mr-2">{x.date}</span>
                    {x.availableStartTime}
                    {x.isAvailable === 1 ? 
                    (<span className="text-gray-700 m-2">Open</span>) :
                    (<span className="text-gray-700 m-2">Booked</span>)
                    }
                  </p>
                </div>
              ))
            ) : (
              <h1 className="text-gray-600 text-center py-4">
                No Appointments Scheduled Today.
              </h1>
            )} */
}
