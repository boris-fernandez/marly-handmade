// App.jsx
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProviderWrapper } from "./contexts/AuthContext.jsx";
import { useCart } from "./contexts/CartContext.jsx";
import { CartDrawer } from "./components/CartDrawer";

import LandingPage from "./pages/Landing";
import CartPage from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ComplaintsBook from "./pages/ComplaintsBook";
import TermsConditions from "./pages/TermsConditions";
import SeaCollectionDetail from "./pages/SeaColletionDetail";
import RecoverPassword from "./pages/RecoverPassword";
import Product from "./pages/Product";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import ShippingPolicy from "./pages/ShippingPolicy.jsx";
import ExchangePolicy from "./pages/ExchangePolicy.jsx";
import FAQ from "./pages/FAQ.jsx";
import OurStory from "./pages/OurStory.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import Returns from "./pages/Returns.jsx";

import ConfirmNewPassword from "./pages/ConfirmNewPassword";
import Dashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";
import ReportsAnalytics from "./pages/ReportsAnalytics";
import Orders from "./pages/Orders";
import ContentManagement from "./pages/ContentManagement";
import Inventory from "./pages/Inventory";
import ProductGallery from "./pages/ProductGallery";
import UserManagement from "./pages/UserManagement";
import ProductRegister from "./pages/ProductRegister";
import Buy from "./pages/Buy.jsx";

import { FilterProvider } from "./contexts/FilterContext.jsx";


function App() {
  const { open, closeCart } = useCart();

  return (
    <AuthProviderWrapper>
      <FilterProvider> 
      <CartDrawer open={open} onClose={closeCart} />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/complaints-book" element={<ComplaintsBook />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/sea-collection-detail" element={<SeaCollectionDetail />} />
        <Route path="/recover-password" element={<RecoverPassword />} />
        <Route path="/product/:slug" element={<Product />} />
        <Route path="/product/sea-collection" element={<SeaCollectionDetail />} />

        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/exchange" element={<ExchangePolicy />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/returns" element={<Returns />} />
        <Route path="/shop" element={<SeaCollectionDetail />} />
        <Route path="/buy" element={<Buy />} />

        {/* ADMIN */}
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/profile" element={<Profile />} />
        <Route path="/admin/reports" element={<ReportsAnalytics />} />
        <Route path="/admin/orders" element={<Orders />} />
        <Route path="/admin/content" element={<ContentManagement />} />
        <Route path="/admin/inventory" element={<Inventory />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/product-gallery" element={<ProductGallery />} />
        <Route path="/admin/products" element={<ProductRegister />} />

        <Route
          path="/confirm-new-password/:token"
          element={<ConfirmNewPassword />}
        />
      </Routes>
      </FilterProvider> 
    </AuthProviderWrapper>
  );
}

export default App;
