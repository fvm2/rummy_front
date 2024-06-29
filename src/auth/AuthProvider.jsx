import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import PropTypes from "prop-types"; // Esto es por el error de ESLint

function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  function logout() {
    setToken(null);
  }

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token])

  return (
      <AuthContext.Provider value={{ token, setToken, logout }}>
        {children}
      </AuthContext.Provider>
    )
}

// Lo siguiente hace que ESLint no marque error.
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;