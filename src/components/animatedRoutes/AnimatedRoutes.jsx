import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "../../Pages/home/Home";
import NewOrder from "../../Pages/newOrder/NewOrder";
import { BooksContextProvider } from "../../context/BooksContext";
import BookPage from "../../Pages/book/BookPage";
import Onay from "../../Pages/Onay/Onay";
import Ret from "../../Pages/Ret/Ret";
import { AuthContextProvider } from "../../context/AuthContext";
import SignIn from "../../Pages/SignIn/SignIn";
import SignUp from "../../Pages/SignUp/SignUp";
import ProtectedRoute from "../ProtectedRoutes/ProtectedRoutes";
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <BooksContextProvider>
        <Routes location={location} key={location.pathname}>
          <Route path="/login" index element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/yeni-kayit"
            element={
              <ProtectedRoute>
                <NewOrder />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/kitap/:id" element={<BookPage />}></Route>
          <Route path="/onay/:id" element={<Onay />}></Route>
          <Route path="/ret/:id" element={<Ret />}></Route>
        </Routes>
      </BooksContextProvider>
    </AnimatePresence>
  );
}
export default AnimatedRoutes;
