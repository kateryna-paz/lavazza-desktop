import { Routes, Route, useNavigate } from "react-router-dom";

import Menu from "../pages/menu/Menu";
import CategoryPage from "../pages/categoryPage/CategoryPage";
import Register from "../pages/register/Register";
import MainLayout from "../layouts/MainLayout";
import RegisterLayout from "../layouts/RegisterLayout";
import LogIn from "../pages/login/LogIn";
import OrderHistory from "../pages/orderHistory/OrderHistory";
import { useEffect } from "react";

function AppRoutes() {
  const nav = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");

    if (!userToken) {
      nav("/");
    }
  }, [nav]);
  return (
    <Routes>
      <Route path="/" element={<RegisterLayout />}>
        <Route path="/" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route path="/home" element={<MainLayout />}>
        <Route index element={<Menu />} />
        <Route path="/home/menu/:category" element={<CategoryPage />} />
        <Route path="/home/orders" element={<OrderHistory />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
