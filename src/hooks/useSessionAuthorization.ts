import { useQuery } from '@tanstack/react-query';
import { authenticateUser } from '../services/authService';

export default function useSessionAuth(sessionToken: string | null) {

    const { data, isLoading, isError, isSuccess } = useQuery({
        queryKey: ['auth', sessionToken],
        queryFn: () => authenticateUser(sessionToken),
        enabled: !!sessionToken,
    });

    if (!sessionToken) {
        return { isLoading: true, isAuth: false, isError: true };
    }

    return { isLoading, isAuth: isSuccess, isError, data };
};