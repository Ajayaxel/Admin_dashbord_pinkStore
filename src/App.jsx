import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import Sidebar from "./components/common/Sidebar";
import OverviewPage from "./pages/OverviewPage";
import ProductsPage from "./pages/ProductsPage";
import UsersPage from "./pages/UsersPage";
import SalesPage from "./pages/SalesPage";
import OrdersPage from "./pages/OrdersPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";
import AddproductPage from "./pages/AddproductPage";
import Login from "./components/login/Login";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  // Add global styles to hide scrollbar
  useEffect(() => {
    // Add a style tag to the document head
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      /* Hide scrollbar for Chrome, Safari and Opera */
      .hide-scrollbar::-webkit-scrollbar {
        display: none;
      }
      
      /* Hide scrollbar for IE, Edge and Firefox */
      .hide-scrollbar {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
      }
    `;
    document.head.appendChild(styleElement);

    // Clean up function
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <div className={`flex h-screen bg-gray-900 text-gray-100 ${isLoginPage ? '' : 'overflow-hidden'}`}>
      {!isLoginPage && <Sidebar />}
      <div className={`${isLoginPage ? 'w-full' : 'flex-1 overflow-auto hide-scrollbar'}`}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<OverviewPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/sales" element={<SalesPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/add-product" element={<AddproductPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;









