import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Subscription from "./pages/Subscription";
import Charity from "./pages/Charity";
import Draw from "./pages/Draw";
import Admin from "./pages/Admin";
import Success from "./pages/Success";
import Winnings from "./pages/Winnings";

function App() {

  // ✅ USER GET FROM LOCALSTORAGE
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Router>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />

        {/* 🔥 DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            user ? <Dashboard /> : <Navigate to="/auth" />
          }
        />

        {/* 🔥 ADMIN */}
        <Route
          path="/admin"
          element={
            user?.role === "admin"
              ? <Admin />
              : <Navigate to="/dashboard" />
          }
        />

        {/* OTHER ROUTES */}
        <Route path="/success" element={<Success/>}/>
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/charity" element={<Charity />} />
        <Route path="/draw" element={<Draw />} />
        <Route path="/winnings" element={<Winnings />} />

      </Routes>
    </Router>
  );
}

export default App;