import { createContext, useState } from "react";

export const AuthContext = createContext();
import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  function handleLoginSuccess(credentialResponse) {
    const decod = jwtDecode(credentialResponse.credential);
    setUser({
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture,
      token: credentialResponse.credential,
    });
    navigate("/");
  }
  function handelLoginError() {
    console.log("error in login with google api ");
  }
  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        handleLoginSuccess,
        handleLogout,
        handelLoginError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
