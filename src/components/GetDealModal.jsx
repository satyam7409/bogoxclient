import { useEffect, useState } from "react";
import { VscAccount } from "react-icons/vsc";
import { MdOutlineMessage } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import useUser from "../context/UserContext";

const GetDealModal = ({ onClose }) => {
  const [deals, setDeals] = useState([]);
  const { isLogin, setIsLogin } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate("/signin");
    }
  }, [isLogin, navigate]);

  // Fetch deals
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:8080/deals", {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          console.log("Response not received properly.");
          return;
        }
        const result = await response.json();
        setDeals(result);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="modal-overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="modal-content bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-2xl max-w-4xl w-full relative border border-blue-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-blue-400 hover:text-blue-700 font-bold transition"
        >
          &times;
        </button>
        <h2 className="text-3xl font-extrabold text-blue-700 mb-8 text-center tracking-tight">
          Available Deals
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {deals.map((deal) => (
            <div
              key={deal._id}
              className="flex flex-col bg-gradient-to-br from-blue-50 via-cyan-50 to-purple-50 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200 border border-blue-100"
            >
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 rounded-full bg-blue-200 flex items-center justify-center text-3xl font-bold text-blue-700 shadow mr-4">
                  <VscAccount />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-xl font-bold text-blue-700">
                    {deal.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {deal.city}, {deal.state}
                  </p>
                  <p className="text-sm text-gray-400">{deal.phoneNumber}</p>
                </div>
              </div>

              <div className="flex flex-col space-y-2 mb-6">
                {deal.productPrice && (
                  <p className="text-lg font-semibold text-gray-800">
                    Price:{" "}
                    <span className="text-blue-600">₹{deal.productPrice}</span>
                  </p>
                )}
                <p
                  className={`text-sm font-semibold ${
                    deal.hasMembership ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {deal.hasMembership ? "Has Membership" : "No Membership"}
                </p>
              </div>

              <div className="mt-auto flex justify-center">
                <Link
                  to={`/chat/${deal._id}`}
                  className="flex items-center gap-2 py-2 px-6 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white rounded-full text-base font-semibold shadow-lg transition-all duration-150"
                >
                  <MdOutlineMessage className="text-lg" />
                  Contact Seller
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GetDealModal;
