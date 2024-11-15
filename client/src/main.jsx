import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import PatientHome from "./pages/patient/PatientHome.jsx";
import ScheduleAppt from "./pages/patient/ScheduleAppt.jsx";
import SeeUpcomingVisits from "./pages/patient/SeeUpcomingVisits.jsx";
import ProviderHome from "./pages/provider/ProviderHome.jsx";
import SeeFullSchedule from "./pages/provider/SeeFullSchedule.jsx";
import SeeOneAppt from "./pages/provider/SeeOneAppt.jsx";
import SetAvailability from "./pages/provider/SetAvailability.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <SignUp />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "patient",
        children: [
          {
            index: true,
            element: <PatientHome />,
          },
          {
            path: "schedule",
            element: <ScheduleAppt />,
          },
          {
            path: "upcoming-visits",
            element: <SeeUpcomingVisits />,
          },
        ],
      },
      {
        path: "provider",
        children: [
          {
            index: true,
            element: <ProviderHome />
          },
          {
            path: "schedule",
            element: <SeeFullSchedule />
          },
          {
            path: "appointment",
            element: <SeeOneAppt />
          },
          {
            path: "availability",
            element: <SetAvailability />
          }
        ]
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
