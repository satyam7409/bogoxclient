import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const isValidIndianNumber = (number) => {
    const trimmed = number.trim();
    const regex = /^[6-9]\d{9}$/;
    return regex.test(trimmed);
  };

  async function handleSendOTP() {
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }

    if (!isValidIndianNumber(phone)) {
      setError("Please enter a valid 10-digit Indian mobile number");
      return;
    }

    setError(""); // Clear any previous error

    try {
      const response = await fetch("http://localhost:8080/otp-send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phone.trim(), name: name.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/verify-otp", { state: { phone: phone.trim(), name: name.trim() } });
        alert("OTP sent successfully");
      } else {
        alert("Failed to generate OTP");
      }
    } catch (error) {
      setError("Network error, please try again");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-xl font-semibold mb-4 text-center">Sign In</h2>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded-md mb-2"
        />

        <input
          type="tel"
          placeholder="Enter 10-digit phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))} // allow only digits
          maxLength={10}
          className="w-full p-2 border rounded-md mb-2"
        />

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <button
          onClick={handleSendOTP}
          className="w-full bg-blue-500 text-white p-2 rounded-md mt-2 hover:bg-blue-600"
        >
          Send OTP
        </button>
      </div>
    </div>
  );
};

export default SignIn;
