import React from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/auth/SignInUser";
import SignUp from "./pages/auth/SignUpUser";
import SignInRest from "./pages/auth/SignInRest";
import SignUpRest from "./pages/auth/SignUpRest";
import useAuth from "./context/Auth.context";
import Home from "./pages/app/home"
import Homerest from "./pages/app/homerest"
import Restaurant from "./pages/app/restaurant";
import Fooditems from "./pages/app/fooditems";
import Cart from "./pages/app/cart"

export default function App() {
  const { user } = useAuth();

  return (
    <>
      {!user ? (
        <Routes>
          <Route path="/" element={<SignIn />}></Route>
          <Route path="/join" element={<SignUp />}></Route>
          <Route path="/rest" element={<SignInRest />}></Route>
          <Route path="/restjoin" element={<SignUpRest />}></Route>
        </Routes>
      ) : (
        user.isRest ? <Routes>
              <Route path="/homerest" element={<Homerest />}></Route>
          </Routes> 
          : <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/restaurant" element={<Restaurant />}></Route>
            <Route path="/dishes" element={<Fooditems />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
          </Routes>
      )}
    </>
  );
}
