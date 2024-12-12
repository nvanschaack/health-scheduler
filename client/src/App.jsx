import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <>

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
