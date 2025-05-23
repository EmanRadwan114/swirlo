import { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (decoded, token, navigate) => {
    setUser({
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture,
      token,
    });
    navigate("/");
  };

  const handleLogout = (navigate) => {
    setUser(null);
    navigate("/");
  };

  const handelLoginError = () => {
    console.log("error in login with google api ");
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
