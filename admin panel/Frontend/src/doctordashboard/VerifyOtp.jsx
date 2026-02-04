import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
// import OTPInput from "otp-input-react";
// import { auth_api } from "../utils/globals";

export default function VerifyOtp() {

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state;   // email signin se ayega

  const [otp, setOtp] = useState("");

  const verifyOtp = async () => {
    try {

      const res = await axios.post(
        `${auth_api}/verify-otp`,
        {
          email: email,
          otp: Number(otp)
        },
        { withCredentials: true }
      );

      alert(res.data.message);

      if (res.data.status) {
        navigate("/hospital-dashboard");
      }

    } catch (err) {
      alert("OTP Verification Failed");
    }
  };

 return (
    <div className="hospital-auth-bg">

        <div className="hospital-card">

            <h3 className="hospital-title">
                🏥 OTP Verification
            </h3>

            <p className="hospital-subtitle">
                Enter OTP sent to <b>{email}</b>
            </p>

            <div className="d-flex justify-content-center otp-container">
                <OTPInput
                    value={otp}
                    onChange={setOtp}
                    autoFocus
                    OTPLength={6}
                    otpType="number"
                    disabled={false}
                />
            </div>

            <p className="otp-expire">
                OTP expires in 120 seconds
            </p>

            <button onClick={verifyOtp} className="hospital-btn">
                Verify & Login
            </button>

        </div>
    </div>
);
}
