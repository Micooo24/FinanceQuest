import React, { useEffect, useState, useRef } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const ProtectedRoute = ({ children, isAdmin }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const toastShown = useRef(false);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const role = localStorage.getItem("userRole");

    if (authToken && role) {
      setIsAuthenticated(true);
      setUserRole(role);
    } else {
      if (!toastShown.current) {
        toast.error("Please log in to continue");
        toastShown.current = true; 
      }
    }

    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (isAdmin && userRole !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
