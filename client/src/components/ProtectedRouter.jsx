import { useContext } from "react";
import { UserAuthContext } from "../App";
import { Navigate } from "react-router-dom";
function ProtectedRouter({ children }) {
  const { user, loading } = useContext(UserAuthContext);

  if (loading) {
    return <div>Loading..........</div>;
  }
  if (!user) {
    return <Navigate to={"/login"} />;
  }
  return <>{children}</>;
}

export default ProtectedRouter;
