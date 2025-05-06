
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAdminAuth = (requireAuth = true) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const adminAuth = localStorage.getItem("admin_authenticated");
      const authenticated = adminAuth === "true";
      setIsAuthenticated(authenticated);

      if (requireAuth && !authenticated) {
        // Redirect to login if authentication is required but user is not authenticated
        navigate("/admin/login");
      }
    };

    checkAuth();
  }, [navigate, requireAuth]);

  const logout = () => {
    localStorage.removeItem("admin_authenticated");
    setIsAuthenticated(false);
    navigate("/admin/login");
  };

  return { isAuthenticated, logout };
};
