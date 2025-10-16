import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landing";
import CartPage from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ComplaintsBook from "./pages/ComplaintsBook";
import TermsConditions from "./pages/TermsConditions";
import CollectionDetail from "./pages/ColletionDetail";
import RecoverPassword from "./pages/RecoverPassword";
import Product from "./pages/Product";
import ConfirmNewPassword from "./pages/ConfirnNewPassword";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ReportsAnalytics from "./pages/ReportsAnalytics";
import Orders from "./pages/Orders";
import ContentManagement from "./pages/ContentManagement";
import Inventory from "./pages/Inventory";
import ProductGallery from "./pages/ProductGallery";
import UserManagement from "./pages/UserManagement";
import ProductRegister from "./pages/ProductRegister";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/complaints-book" element={<ComplaintsBook />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/collection-detail" element={<CollectionDetail />} />
        <Route path="/recover-password" element={<RecoverPassword />} />
        <Route path="/product" element={<Product />} />

        <Route path="/admin/profile" element={<Profile />} />
        <Route path="/admin/reports" element={<ReportsAnalytics />} />
        <Route path="/admin/orders" element={<Orders />} />
        <Route path="/admin/content" element={<ContentManagement />} />
        <Route path="/admin/inventory" element={<Inventory />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/product-gallery" element={<ProductGallery />} />
        <Route path="/admin/products" element={<ProductRegister />} />

        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route
          path="/confirm-new-password/:token"
          element={<ConfirmNewPassword />}
        />
      </Routes>
    </>
  );
}

export default App;
