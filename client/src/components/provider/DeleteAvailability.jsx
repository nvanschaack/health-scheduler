import React from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import auth from "../../utils/auth";

//API Imports
import { deleteAvailability } from "../../utils/providerApi";

//deconstructing availabilityId from props
export default function DeleteAvailabilityButton({ availabilityId }) {
  //GLOBAL TOKEN
  const token = auth.retrieveTokenFromLocalStorage();

  //STOPPED HERE
  const delAvail = async () => {
    try {
      const del = await deleteAvailability(token, availabilityId);
      //do i need this since I'm technically just deleting data?
      const response = await del.json();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <TrashIcon
        className="size-6 text-red-500"
        onClick={() => console.log(availabilityId)}
      />
    </div>
  );
}
