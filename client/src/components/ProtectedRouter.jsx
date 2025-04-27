import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
function ProtectedRouter({ children }) {
  const { loading } = useContext(UserContext);
  const token = localStorage.getItem("token");
  if (loading) {
    return <div>Loading..........</div>;
  }
  if (!token) {
    return <Navigate to={"/login"} />;
  }
  return children;
}

export default ProtectedRouter;
