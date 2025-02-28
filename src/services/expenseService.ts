import api from "../config/axiosInstance";

export const getChild = async () => {
  const { data } = await api.get('/get-child');
  return data;
};

export const saveExpenseData = async (dataExpense: FormData) => {
    const { data } = await api.post('/save-expense-data', dataExpense);
    return data;
};
