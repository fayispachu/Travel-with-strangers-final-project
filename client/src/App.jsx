import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import Profile from "./pages/Profile";
export const UserContext = createContext();
function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return setLoading(false);
    }

    const { data } = await axios.get("http://localhost:4000/api/user/login", {
      headers: {
        Authorization: `Barrer ${token}`,
      },
    });
    setUser(data.user);
    setLoading(false);
  };


  useEffect(() => {
    handleUser();
  }, []);

  return (
    <>
      <UserContext.Provider
        value={{
          user,
          setUser,
          loading
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/admin/fayis" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            {/* <Route path="/profile" element={<Profile />} /> */}
            <Route path="/profile" element={<Profile />} />

            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
