import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import auth from "./utils/auth.js";

import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import PatientHome from "./pages/patient/PatientHome.jsx";
import ScheduleAppt from "./pages/patient/ScheduleAppt.jsx";
import ProviderHome from "./pages/provider/ProviderHome.jsx";
import SeeFullSchedule from "./pages/provider/SeeFullSchedule.jsx";
import SeeOneAppt from "./pages/provider/SeeOneAppt.jsx";
import SetAvailability from "./pages/provider/SetAvailability.jsx";

//this component is used for when a user is not granted access to a certain page
const AccessDenied = () => <h1>Access Denied</h1>;

//made a component to check the role of the user. if the role is the role we're checking for, then the user will get access to the page
const PrivateRoute = ({ allowedRoles }) => {
  if (!allowedRoles.includes(auth.role())) {
    return <AccessDenied />;
  }
  //else, allow access to the child routes
  return <Outlet />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "patient",
        element: <PrivateRoute allowedRoles={["patient"]} />,
        children: [
          {
            index: true,
            element: <PatientHome />,
          },
          {
            path: "schedule",
            element: <ScheduleAppt />,
          },
        ],
      },
      {
        path: "provider",
        element: <PrivateRoute allowedRoles={["provider"]} />,
        children: [
          {
            index: true,
            element: <ProviderHome />,
          },
          {
            path: "schedule",
            element: <SeeFullSchedule />,
          },
          {
            path: "appointment",
            element: <SeeOneAppt />,
          },
          {
            path: "availability",
            element: <SetAvailability />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
