// import { react, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { BsChatLeftText } from "react-icons/bs";
// import { FaRegUserCircle } from "react-icons/fa";

// const Navbar = () => {
//   const [userLoggin, setUserLoggin] = useState(false);
//   useEffect(() => {
//     async function handleUser() {
//       const response = await fetch("http://localhost:8080/islogin", {
//         method: "GET",
//         credentials: "include",
//       });
//       if (!response.ok) {
//         console.log("internal server problem");
//       }
//       const data = await response.json();
//       if (data.message == "Loggedin") {
//         setUserLoggin(true);
//       }
//     }
//     handleUser();
//   }, []);

//   return (
//     <nav className="bg-blue-600 p-4 shadow-md">
//       <div className="flex justify-between items-center container mx-auto">
//         {/* Logo */}
//         <div className="text-white font-bold text-2xl">BOGO</div>

//         {/* Right Side Buttons */}
//         <div className="flex items-center gap-4">
//           {/* Chat Icon Button */}
//           <Link to="/all-chats">
//             <button className="bg-white text-blue-600 p-2 rounded-full hover:bg-gray-100 transition shadow-md">
//               <BsChatLeftText size={20} />
//             </button>
//           </Link>

//           {/* Sign Up Button */}
//           <Link to="/signin">
//             <button className="bg-white text-blue-600 py-2 px-6 rounded-md hover:bg-gray-100 transition shadow-md font-semibold">
//               {userLoggin ? <FaRegUserCircle /> : "Sign up"}
//             </button>
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsChatLeftText } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { GiSunglasses } from "react-icons/gi";

const Navbar = () => {
  const [userLoggin, setUserLoggin] = useState(false);

  useEffect(() => {
    async function handleUser() {
      const response = await fetch("http://localhost:8080/islogin", {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        console.log("internal server problem");
      }
      const data = await response.json();
      if (data.message === "Loggedin") {
        setUserLoggin(true);
      }
    }
    handleUser();
  }, []);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-blue-600 font-extrabold text-2xl">
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

          {/* Signin Button */}
          <Link to="/signin">
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition font-medium shadow">
              {userLoggin ? <FaRegUserCircle size={20} /> : "Sign In"}
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
