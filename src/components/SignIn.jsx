import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  async function handleSendOTP() {
    try {
      const response = await fetch("http://localhost:8080/otp-send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = await response.json();
      if (response.ok) {
        navigate("/verify-otp", { state: { phone: phone } });
        alert("otp send sucees fully");
      } else {
        alert("faiuled to generate otp");
      }
    } catch (error) {
      setError("Network error, try again");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-xl font-semibold mb-4 text-center">Sign In</h2>
        <input
          type="tel"
          placeholder="Enter phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 border rounded-md mb-2"
        />
        <button
          onClick={handleSendOTP}
          className="w-full bg-blue-500 text-white p-2 rounded-md mt-2 hover:bg-blue-600"
        >
          {"Send OTP"}
        </button>
      </div>
    </div>
  );
};

export default SignIn;
