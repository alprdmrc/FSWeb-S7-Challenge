import React from "react";
import Layout from "./layouts/layout";
import OrderForm from "./pages/order";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Help from "./pages/help";

const App = () => {
  return (
    <div id="app">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/pizza" element={<OrderForm />} />
          <Route path="/help" element={<Help />} />
        </Route>
      </Routes>
    </div>
  );
};
export default App;
