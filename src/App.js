import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import InventoryPage from "./pages/InventoryPage";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import ManageProductsPage from "./pages/ManageProductPage";
import ManageSalesPage from "./pages/ManageSalesPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/manage-products" element={<ManageProductsPage />} />
        <Route path="/manage-sales" element={<ManageSalesPage />} />
      </Routes>
    </Router>
  );
}

export default App;