import { startTransition, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useSessionAuth from "../hooks/useSessionAuthorization";
import { clearAuthToken, saveAuthToken } from "../hooks/useJwt";
import Loader from "../components/shared/Loader";


export default function AuthPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const sessionId = searchParams.get('code');
    const { isLoading, isAuth, isError, data } = useSessionAuth(sessionId);

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');

        if(storedToken) {
            startTransition(() => {
                navigate('/form');
            })
        } else if (isAuth) {
            startTransition(() => {
                saveAuthToken(data);
                navigate('/form');
            })
        } else if (isError) {
            startTransition(() => {
                clearAuthToken();
                navigate('/error', { state: { message: 'Sessione non valida o assente' } });
            })
        }
    }, [isAuth, isError, data, navigate, isLoading]);

    return isLoading && <Loader />;
}