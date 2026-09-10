import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import EmployeeForm from "./pages/EmployeeForm";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/employee-form"
          element={<EmployeeForm />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;