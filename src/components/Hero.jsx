import React, { useState } from "react";
import DealModal from "./DealModal";
import GetDealModal from "./GetDealModal";
import Navbar from "./Navbar";

const Hero = () => {
  const [isModalOpen, setModal] = useState(false);
  const [isGetDealModal, setGetDealModal] = useState(false);

  function openModal1() {
    setModal(true);
  }
  function closeModal1() {
    setModal(false);
  }
  function openModal2() {
    setGetDealModal(true);
  }
  function closeModal2() {
    setGetDealModal(false);
  }

  return (
    <>
      <Navbar />
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-cyan-100 to-purple-200 overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400 opacity-20 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 opacity-20 rounded-full blur-3xl -z-10"></div>
        <div className="max-w-xl w-full mx-auto px-6 py-12 bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl border border-blue-100 flex flex-col items-center">
          <img
            src="/images/lens.png"
            alt="BOGO"
            className="w-32 h-18 mb-4 drop-shadow-lg mx-2"
          />
          <h1 className="text-4xl font-extrabold text-blue-600 mb-8 tracking-tight text-center">
            Get your Pair
          </h1>
          <div className="flex flex-col sm:flex-row gap-6 w-full justify-center">
            <button
              className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white py-3 px-8 rounded-xl font-bold text-lg shadow-xl transition-all duration-200 transform hover:scale-110 border-2 border-blue-200 hover:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-200"
              onClick={openModal1}
            >
              <span className="inline-block align-middle mr-2">🛒</span>
              Make a Deal
            </button>
            <button
              className="flex-1 bg-gradient-to-r from-green-500 to-teal-400 hover:from-green-600 hover:to-teal-500 text-white py-3 px-8 rounded-xl font-bold text-lg shadow-xl transition-all duration-200 transform hover:scale-110 border-2 border-green-200 hover:border-green-400 focus:outline-none focus:ring-4 focus:ring-green-200"
              onClick={openModal2}
            >
              <span className="inline-block align-middle mr-2">🔍</span>
              Find a Deal
            </button>
          </div>
        </div>
        {isModalOpen && <DealModal onClose={closeModal1} />}
        {isGetDealModal && <GetDealModal onClose={closeModal2} />}
      </section>
    </>
  );
};

export default Hero;
