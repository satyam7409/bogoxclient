import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsChatLeftText } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { GiSunglasses } from "react-icons/gi";
import ProfileModal from "./ProfileModal"; // make sure path is correct
import useUser from "../context/UserContext";

const Navbar = () => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const navigate = useNavigate();
  const { isLogin, setIsLogin } = useUser();
  
  return (
    <>
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-blue-600 font-extrabold text-2xl"
          >
            <GiSunglasses size={28} className="text-blue-500" />
            <span>LensDeal</span>
          </Link>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Chat Button */}
            <Link to="/all-chats">
              <button className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition">
                <BsChatLeftText size={20} />
              </button>
            </Link>

            {/* Profile or Sign In */}
            {isLogin ? (
              <button
                onClick={() => setShowProfileModal(true)}
                className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition"
              >
                <FaRegUserCircle size={20} />
              </button>
            ) : (
              <Link to="/signin">
                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition font-medium shadow">
                  Sign In
                </button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Profile Modal */}
      {showProfileModal && (
        <ProfileModal onClose={() => setShowProfileModal(false)} />
      )}
    </>
  );
};

export default Navbar;
