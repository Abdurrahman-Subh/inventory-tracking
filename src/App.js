import "./App.css";
import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { db } from "./firebase";
import Home from "./Pages/home/Home";
import NewOrder from "./Pages/newOrder/NewOrder";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/yeni-kayit" element={<NewOrder />}></Route>
      </Routes>
    </Router>
  );
}
