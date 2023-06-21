import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../components/login/login";
import Home from "../components/home/home";
import About from "../Pages/About/About";
import NotFound from "../Pages/Not found/NotFound";
import Features from "../Pages/Features/Features";
import Pricing from "../Pages/Pricing/Pricing";
import Details from "../components/Detail/details";
import Validating from "../components/validating/validating";
import Shopping from "../components/Shopping/shopping";
import Contact from "../components/Contact/contact";
import Review from "../components/Review/Review";
import PayApro from "../components/Payments/payApro/payApro";
// import Nav from "../admin/Components/Nav/Nav";
import Users from "../admin/pages/Users/Users";
import Foods from "../admin/pages/Foods/Foods";
import Sales from "../admin/pages/Sales/Sales";
import Dashboard from "../admin/pages/Dashboard/Dashboard";
import Terms from "../Pages/Footer/Terms";
import Data from "../Pages/Footer/DataProtection";

import Register from "../components/login/Register/Register";

import User from "../userPanel/pages/Panel/Panel.jsx";
import Profile from "../userPanel/pages/Profile/Profile.jsx";
import Favorites from "../userPanel/pages/Favorites/Favorites.jsx";
import Orders from "../userPanel/pages/Orders/Orders.jsx";

import PayRejected from "../components/Payments/payRejected/payRejected";
import PayPending from "../components/Payments/payPending/payPending";

import { WelcomeAdmin } from "../admin/pages/WelcomeAdmin/WelcomeAdmin";
import PrivateRoute from "./PrivateRoute";


function RouteApp() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/features" element={<Features />} />
        <Route exact path="/pricing" element={<Pricing />} />
        <Route exact path="/detail/:id" element={<Details />} />
        <Route exact path="/validating" element={<Validating />} />
        <Route exact path="/shopping" element={<Shopping />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/review" element={<Review />} />
        <Route exact path="register" element={<Register />} />
        <Route path="/payApro" element={<PayApro />} />
        <Route path="/payFail" element={<PayRejected />} />
        <Route path="/payPend" element={<PayPending />} />
        {/* review */}
        <Route exact path="/termsandconditions" element={<Terms />} />
        <Route exact path="/dataprotection" element={<Data />} />
        <Route element={<PrivateRoute redirectTo="/" />}>
          <Route exact path="/dashboard" element={<Dashboard />}>
            <Route index element={<WelcomeAdmin />} />
            <Route path="users" element={<Users />} />
            <Route path="foods" element={<Foods />} />
            <Route path="sales" element={<Sales />} />
          </Route>
        </Route>
        <Route exact path="/user" element={<User />}>
          <Route path="profile" element={<Profile />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="orders" element={<Orders />} />
        </Route>
        <Route exact path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default RouteApp;
