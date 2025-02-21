import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children, isAdmin }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://127.0.0.1:8000/admin/get-users", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        const userData = response.data;
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || (isAdmin && user.role !== "admin")) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;