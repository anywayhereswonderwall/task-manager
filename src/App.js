import * as React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./app.scss";
import { useAuth } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const { currentUser } = useAuth();

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/" />;
  };

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route
          path="/home"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
