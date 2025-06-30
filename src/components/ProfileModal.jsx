import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import YourDealsModal from "./YourDealsModal";
import { FaRegUserCircle } from "react-icons/fa";

const ProfileModal = ({ onClose }) => {
  const [user, setUser] = useState(null);
  const [showDealsModal, setShowDealsModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:8080/islogin", {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          setUser(data.user);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8080/logout", {
        method: "POST",
        credentials: "include",
      });
      navigate("/signin");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <>
      <div className="fixed top-8 right-8 z-50">
        <div className="relative bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-80 border border-blue-100">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-2xl text-blue-400 hover:text-blue-700 font-bold transition"
          >
            &times;
          </button>

          <div className="flex flex-col items-center mb-4">
            <FaRegUserCircle size={48} className="text-blue-500 mb-2" />
            <h2 className="text-2xl font-extrabold text-blue-700 mb-1">
              Profile
            </h2>
          </div>

          {user ? (
            <>
              <div className="mb-4 text-center">
                <div className="text-lg font-semibold text-gray-800 mb-1">
                  {user.name}
                </div>
                <div className="text-gray-500 text-sm">{user.phone}</div>
              </div>

              <button
                onClick={() => setShowDealsModal(true)}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white py-2 rounded-lg font-semibold mb-3 shadow transition-all duration-150"
              >
                Your Deals
              </button>

              <button
                onClick={handleLogout}
                className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white py-2 rounded-lg font-semibold shadow transition-all duration-150"
              >
                Logout
              </button>
            </>
          ) : (
            <p className="text-center text-gray-500">Loading...</p>
          )}
        </div>
      </div>

      {showDealsModal && (
        <YourDealsModal onClose={() => setShowDealsModal(false)} />
      )}
    </>
  );
};

export default ProfileModal;
