import React, { createContext, useState, useContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { showNotification } from "@mantine/notifications";
import axios from 'axios';

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
  const [orderlist, setOrderlist] = useState([]);

  useEffect(() =>{
    const data = JSON.parse(localStorage.getItem('User'));
    const time= JSON.parse(localStorage.getItem('Time'));
    const cart = JSON.parse(localStorage.getItem('Cart'));
    if(data!=null) {
      let dt=+new Date();
      if(time > dt-24*60*60*1000) {
        setUser(data);
      }
    }
  },[]);

  const navigate = useNavigate();

  const signout = function (){
     setUser(null);
     localStorage.removeItem('User');
     navigate('/');
  }

  const userset = function (data) {
       setUser(data);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        userset,
        signout,
        orderlist,
        setOrderlist,
      }}
    >
      {(
        children
      )}
    </AuthContext.Provider>
  );
}

export default useAuth;
