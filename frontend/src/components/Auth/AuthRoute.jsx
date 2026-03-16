import { Navigate } from "react-router-dom";
import { getUserFromStorage } from "../../utils/getUserFromStorage";

const AuthRoute = ({ children }) => {
  const user = getUserFromStorage();

  return user ? children : <Navigate to="/login" />;
};

export default AuthRoute;