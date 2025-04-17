import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

import Profile from "./pages/Profile";
import { UserProvider } from "./context/AuthenticationContext";
import { TripProvider } from "./context/TripContext";
function App() {
  return (
    <>
      <UserProvider>
        <TripProvider>
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
        </TripProvider>
      </UserProvider>
    </>
  );
}

export default App;
