import { Navigate, Route, Routes } from "react-router";
import Login from "./Features/Auth/Pages/Login";
import Register from "./Features/Auth/Pages/Register";
import UseAuth from "./Features/Auth/Hooks/UseAuth";
import Home from "./Features/Emotions Detection /Pages/Home";

const AppRoutes = () => {
   const { user, loading } = UseAuth();

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Home /> : <Navigate to="/login" replace />}
      />
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to="/" replace /> : <Register />} />
    </Routes>
  );
};

export default AppRoutes;