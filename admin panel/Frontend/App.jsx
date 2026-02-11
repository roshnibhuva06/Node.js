import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./dashboard/Signup.jsx";
import Signin from "./dashboard/Signin.jsx";
import VerifyOtp from "./dashboard/VerifyOtp.jsx";
import Homepage from "./dashboard/homepage.jsx";
import './App.css';

function App() {
  return (
    
      <Routes>

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/signin" />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/homepage" element={<Homepage />} />

      </Routes>

  );
}

export default App;
