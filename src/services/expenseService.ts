import api from "../config/axiosInstance";
import { FormtoDTO } from "../types/idpay-types";

export const getChild = async () => {
  const { data } = await api.get('/get-child');
  return data;
};

export const saveExpenseData = async (dataExpense: FormtoDTO) => {
    const { data } = await api.post('/save-expense-data', dataExpense);
    return data;
};
