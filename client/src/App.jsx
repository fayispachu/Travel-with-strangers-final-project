import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

import Profile from "./pages/Profile";
import { TripProvider } from "./context/TripContext";
import { UsersDetailsProvider } from "./context/UserContext";
import { PostProvider } from "./context/UserPostContext";
import ProtectedRouter from "./components/ProtectedRouter";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword ";
function App() {
  return (
    <>
      <PostProvider>
        <TripProvider>
          <UsersDetailsProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/admin/fayis" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRouter>
                      <Profile />
                    </ProtectedRouter>
                  }
                />

                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route
                  path="/reset-password/:token"
                  element={<ResetPassword />}
                />

                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </BrowserRouter>
          </UsersDetailsProvider>
        </TripProvider>
      </PostProvider>
    </>
  );
}

export default App;
