import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SingIn from './pages/auth/SingIn';
import SingUp from './pages/auth/SingUp';
import Layout from './pages/app/Layout';
import useAuth from './context/Auth.context';

export default function App() {
  const { user } = useAuth();

  return (
    <>
      {!user ? (
        <Routes>
          <Route path='/' element={<SingIn />}></Route>
          <Route path='/join' element={<SingUp />}></Route>
        </Routes>
      ) : (
        <Layout />
      )}
    </>
  );
}
