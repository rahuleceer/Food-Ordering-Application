import React, { createContext, useState, useContext, useEffect } from 'react';
import { Loader } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';


const AuthContext = createContext();

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged(async (userObj) => {
      if (userObj) {
        setUser(user.data());
      } else {
        setUser(null);
      }
      setLoading(false);
    });
  }, []);

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      showNotification({
        title: 'Login Error',
        message: e.message,
      });
    }
  };

  const signup = async (params) => {
    try {
      if (!params.firstName || !params.lastName) {
        const error = new Error('First name and last name are required');
        throw error;
      }

      if (new Date().getTime() - params.DOB.getTime() < 18 * 365 * 24 * 60 * 60 * 1000) {
        const error = new Error('You must be at least 18 years old');
        throw error;
      }

      if (params.password !== params.confirmPassword) {
        const error = new Error("Passwords don't match");
        throw error;
      }

      if (!params.terms) {
        const error = new Error('You must accept the terms and conditions');
        throw error;
      }

      if (!params.email) {
        const error = new Error('Email is required');
        throw error;
      }

      const { user } = await createUserWithEmailAndPassword(
        auth,
        params.email,
        params.password
      );

      const userRef = doc(db, 'users', user.uid);

      await setDoc(userRef, {
        firstName: params.firstName,
        lastName: params.lastName,
        email: params.email,
        DOB: params.DOB,
        gender: params.gender,
        id: user.uid,
        DP: params.url,
      });

      navigate('/');
    } catch (e) {
      showNotification({
        title: 'Sign Up Error',
        message: e.message,
      });
    }
  };

  const logout = () => {
    signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        signup,
      }}
    >
      {loading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',
          }}
        >
          <Loader size='xl' variant='dots' />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export default useAuth;
