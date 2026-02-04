import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./doctordashboard/Signup.jsx";
import Signin from "./doctordashboard/Singin.jsx";
import './App.css';

function App() {
  return (
    
      <Routes>

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/signin" />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />

      </Routes>

  );
}

export default App;
