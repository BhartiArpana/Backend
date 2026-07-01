import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // ❌ agar login nahi hai
  if (!token) {
    return <Navigate to="/login" />;
  }

  // ❌ agar agent nahi hai
  if (user?.role !== "agent") {
    return <Navigate to="/login" />;
  }

  // ✅ sab sahi
  return children;
};

export default Protected;