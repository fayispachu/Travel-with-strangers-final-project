import { createContext, useState, useEffect } from "react";
export const UserContext = createContext();
import axios from "axios";
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/user/profile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(data.doc);
    } catch (error) {
      console.log(error, "errror from user check faild");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    checkUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loading,
        checkUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
