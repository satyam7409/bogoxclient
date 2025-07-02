import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../context/UserContext";
import { auth } from "../firebase"; // adjust if path is different
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

const SignIn = () => {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const { setIsLogin } = useUser();

  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            console.log("reCAPTCHA solved");
          },
        }
      );
    }
  }, []);

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

    setError("");
    const fullPhone = "+91" + phone.trim();

    try {
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        fullPhone,
        window.recaptchaVerifier
      );
      setConfirmation(confirmationResult);
      alert("OTP sent successfully");
    } catch (error) {
      console.error("Error sending OTP", error);
      setError("Failed to send OTP. Try again.");
    }
  }

  const verifyOtp = async () => {
    if (!otp.trim()) {
      setError("Please enter the OTP");
      return;
    }

    try {
      const result = await confirmation.confirm(otp.trim());
      const user = result.user;

      const idToken = await user.getIdToken();

      // Send this token to your backend to register/login the user
      const response = await fetch("https://bogoxserver.onrender.com/firebase-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          token: idToken,
          name: name.trim(),
        }),
      });

      const data = await response.json();
      console.log("Login response:", data);
      if (response.ok) {
        alert("Logged in successfully!");
        setIsLogin(true);
        navigate("/"); // or dashboard
      } else { 
        alert(data.error || "Login failed");
      }
    } catch (error) {
      console.error("OTP verification failed", error);
      setError("Invalid OTP. Try again.");
    }
  };

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
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
          maxLength={10}
          className="w-full p-2 border rounded-md mb-2"
        />

        {!confirmation ? (
          <button
            onClick={handleSendOTP}
            className="w-full bg-blue-500 text-white p-2 rounded-md mt-2 hover:bg-blue-600"
          >
            Send OTP
          </button>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 border rounded-md mb-2"
            />
            <button
              onClick={verifyOtp}
              className="w-full bg-green-500 text-white p-2 rounded-md mt-2 hover:bg-green-600"
            >
              Verify OTP
            </button>
          </>
        )}

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
};

export default SignIn;

