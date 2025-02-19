import api from '../config/axiosInstance';

export const authenticateUser = async (sessionId: string | null) => {
  const { data } = await api.get(`/session/${sessionId}`);
  return data;
};
