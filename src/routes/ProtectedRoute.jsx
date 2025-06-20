import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import Loading from '../components/Loading/Loading';


const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div>
        <Loading></Loading>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" state={{ from: location }} />;

  return children;
};

export default PrivateRoute;
