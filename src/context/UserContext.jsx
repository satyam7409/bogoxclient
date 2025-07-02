
import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true); // for proper sync

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch("https://bogoxserver.onrender.com/islogin", {
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setIsLogin(true); // user is logged in
        } else {
          setIsLogin(false); // not logged in
        }
      } catch (err) {
        console.error("Login check failed:", err);
        setIsLogin(false);
      } finally {
        setLoading(false); // finished checking
      }
    };

    checkLogin();
  }, []);

  return (
    <UserContext.Provider value={{ isLogin, setIsLogin, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export default () => useContext(UserContext);
