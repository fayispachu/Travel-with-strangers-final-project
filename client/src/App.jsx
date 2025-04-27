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
import { AgencyDetailsProvider } from "./context/AgencyContext";
import ProtectedRouter from "./components/ProtectedRouter";
function App() {
  return (
    <>
      <PostProvider>
        <TripProvider>
          <UsersDetailsProvider>
            <AgencyDetailsProvider>
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

                  <Route path="/" element={<Home />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                </Routes>
              </BrowserRouter>
            </AgencyDetailsProvider>
          </UsersDetailsProvider>
        </TripProvider>
      </PostProvider>
    </>
  );
}

export default App;
