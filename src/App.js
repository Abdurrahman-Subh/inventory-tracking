import "./App.css";
import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { db } from "./firebase";
import AnimatedRoutes from "./components/animatedRoutes/AnimatedRoutes";
import { AuthContextProvider } from "./context/AuthContext";

export default function App() {
  return (
    <AuthContextProvider>
      <Router>
        <AnimatedRoutes />
      </Router>
    </AuthContextProvider>
  );
}
