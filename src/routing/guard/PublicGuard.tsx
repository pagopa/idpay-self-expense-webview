import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { clearAuthToken, isTokenExpired, useAuthToken } from '../../hooks/useJwt';

interface PubblicGuardProps {
    children: ReactNode;
}

export default function PublicGuard({ children }: PubblicGuardProps) {
  
  const token = useAuthToken();

  if (token && !isTokenExpired(parseInt(token?.expires_in, 10))) {
    return <Navigate to="/form" />;
  }

  clearAuthToken();
  return children;
}