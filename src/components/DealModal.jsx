import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../context/UserContext";

const DealModal = ({ onClose }) => {
  const { isLogin, setIsLogin } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate("/signin");
    }
  }, [isLogin, navigate]);

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [area, setArea] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [hasMembership, setHasMembership] = useState(null);
  const [additionalInfo, setAdditionalInfo] = useState("");

  // Function to Get Current Location
  const getCurrentLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          let lat = position.coords.latitude;
          let lon = position.coords.longitude;
          try {
            let response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
            );
            let data = await response.json();
            const addressDetails = data.address;
            setCity(
              addressDetails.city ||
                addressDetails.town ||
                addressDetails.village ||
                ""
            );
            setState(addressDetails.state || "");
            setArea(
              addressDetails.suburb ||
                addressDetails.neighbourhood ||
                addressDetails.county ||
                ""
            );
          } catch (error) {
            console.error("Error fetching address:", error);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          alert("Failed to get location.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handelSumbit = async (e) => {
    e.preventDefault();

    const dealData = {
      name,
      phoneNumber,
      city,
      state,
      area,
      productPrice,
      hasMembership: hasMembership ?? false,
      additionalInfo,
    };

    try {
      const response = await fetch("http://localhost:8080/create_deal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(dealData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Deal created Successfully");
        onClose();
      } else {
        console.error("Error:", data.message);
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error submitting the deal", error);
      alert("Failed, Try again");
    }
  };

  return (
    <div className="modal-overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="modal-content bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-2xl max-w-2xl w-full relative border border-blue-200">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-2xl text-blue-400 hover:text-blue-700 font-bold transition"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-3xl font-extrabold text-blue-700 mb-6 text-center tracking-tight">
          Create a New Deal
        </h2>
        <form>
          {/* Name */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-base font-semibold mb-1 text-blue-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="block text-base font-semibold mb-1 text-blue-700"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              placeholder="Enter your phone number"
              required
            />
          </div>

          {/* State, City, Area in Grid with Get Location Button */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div>
              <label
                htmlFor="state"
                className="block text-base font-semibold mb-1 text-blue-700"
              >
                State
              </label>
              <input
                type="text"
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                placeholder="State"
                required
              />
            </div>
            <div>
              <label
                htmlFor="city"
                className="block text-base font-semibold mb-1 text-blue-700"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                placeholder="City"
                required
              />
            </div>
            <div>
              <label
                htmlFor="area"
                className="block text-base font-semibold mb-1 text-blue-700"
              >
                Area
              </label>
              <input
                type="text"
                id="area"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                placeholder="Area"
                required
              />
            </div>
          </div>

          {/* Get Location Button */}
          <button
            type="button"
            onClick={getCurrentLocation}
            className="bg-gradient-to-r from-green-400 to-teal-400 text-white py-2 px-6 rounded-lg shadow hover:from-green-500 hover:to-teal-500 transition mb-6 font-semibold"
          >
            📍 Get Current Location
          </button>

          {/* Product Price & Membership (Side by Side) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="productPrice"
                className="block text-base font-semibold mb-1 text-blue-700"
              >
                Product Price
              </label>
              <input
                type="number"
                id="productPrice"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                placeholder="Enter product price"
                required
              />
            </div>

            {/* Membership Radio Buttons */}
            <div>
              <label className="block text-base font-semibold mb-1 text-blue-700">
                Do you have a membership?
              </label>
              <div className="flex items-center gap-6 mt-2">
                <label className="flex items-center gap-2 text-blue-600 font-medium">
                  <input
                    type="radio"
                    name="membership"
                    value="yes"
                    checked={hasMembership === true}
                    onChange={() => setHasMembership(true)}
                    className="w-5 h-5 accent-blue-500"
                  />
                  Yes
                </label>
                <label className="flex items-center gap-2 text-blue-600 font-medium">
                  <input
                    type="radio"
                    name="membership"
                    value="no"
                    checked={hasMembership === false}
                    onChange={() => setHasMembership(false)}
                    className="w-5 h-5 accent-blue-500"
                  />
                  No
                </label>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mb-6">
            <label
              htmlFor="additionalInfo"
              className="block text-base font-semibold mb-1 text-blue-700"
            >
              Additional Information
            </label>
            <textarea
              id="additionalInfo"
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              placeholder="Enter any additional details"
              rows={3}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              onClick={handelSumbit}
              className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white py-3 px-10 rounded-xl font-bold text-lg shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              Create Deal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DealModal;
