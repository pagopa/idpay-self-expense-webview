import { Navigate } from 'react-router-dom';
import { ReactNode, useEffect, useState } from "react";
import { clearAuthToken, isTokenExpired, useAuthToken } from '../../hooks/useJwt';

interface PrivateRouteProps {
    children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const token = useAuthToken();
  const [isTokenValid, setIsTokenValid] = useState(true);

  useEffect(() => {
    if (!token || (token && isTokenExpired(parseInt(token.expires_in, 10)))) {
      clearAuthToken();
      setIsTokenValid(false);
    }
  }, [token]);

  if (!isTokenValid) {
    return <Navigate to="/error" replace state={{ message: 'Sessione non valida o scaduta' }} />;
  }

  return children;
}