import React from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Products from "./components/products";
import Home from "./components/home";
import NavBar from "./components/Navbar";
import LogInForm from "./components/Login";
import RegisterForm from "./components/Register";
import Cart from "./components/Cart";

function App() {
  return (
    <div className="vh-100 vw-100">
      <NavBar />
      <Routes>
        {/*using the routes and giving all the components a path */}
        <Route exact path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<LogInForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
