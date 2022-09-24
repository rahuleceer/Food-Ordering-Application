import React from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/auth/SignInUser";
import SignUp from "./pages/auth/SignUpUser";
import SignInRest from "./pages/auth/SignInRest";
import SignUpRest from "./pages/auth/SignUpRest";
import useAuth from "./context/Auth.context";

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
        user.isRest ? <h1>Restaurant Home</h1> : <h1>User Home</h1>
      )}
    </>
  );
}
