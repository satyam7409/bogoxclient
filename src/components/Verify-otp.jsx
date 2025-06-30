import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useUser from "../context/UserContext";
const Verifyotp = () => {
  const { isLogin, setIsLogin } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const phone = location.state?.phone || "No phone received";
  const name = location.state?.name || "No name received";

  async function handleVerifyOTP() {
    try {
      const response = await fetch("http://localhost:8080/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          otp: otp,
          phone: phone,
          name: name, 
        }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("user created");
        setIsLogin(true);
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("netwrok problem");
    }
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-xl font-semibold mb-4 text-center">Verify OTP</h2>

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full p-2 border rounded-md mb-2"
        />
        <button
          onClick={handleVerifyOTP}
          className="w-full bg-green-500 text-white p-2 rounded-md mt-2 hover:bg-green-600"
        >
          Verify OTP
        </button>
        {/* {message && <p className="text-center text-sm mt-3">{message}</p>} */}
      </div>
    </div>
  );
};

export default Verifyotp;
