import React, { createContext, useState, useContext, useEffect} from 'react';
import { Loader } from '@mantine/core';
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

  useEffect(() =>{
    const data = localStorage.getItem('User');
    if(data!=null) {
      axios.post('https://localhost:3003/api/v1/auth/whoami', data).then((d)=>{
        if(d.isvalid){
          setUser(data);
        }else{
          setUser(null);
        }
      });
    }
  },[]);

  const navigate = useNavigate();

  const signout = function (){
     setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        signout
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
