import React from "react";
import { TrashIcon } from "@heroicons/react/24/solid";

//API Imports

//deconstructing availabilityId from props
export default function DeleteAvailabilityButton({availabilityId}) {
    //add functionality - needs to receive availabilityID
  return (
    <div>
      <TrashIcon className="size-6 text-red-500" onClick={()=>console.log(availabilityId)
      }/>
    </div>
  );
}
