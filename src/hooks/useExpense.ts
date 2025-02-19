import { useMutation, useQuery } from "@tanstack/react-query";
import { getChild, saveExpenseData } from "../services/expenseService";

export type ResponseChild = {
    userId: string
    childList: ChildList[]
}

export type ChildList = {
    userId: string
    nome: string
    cognome: string
}

export const useGetChild = () => {
    return useQuery({
        queryKey: ['child'],
        queryFn: getChild,
        select: (data: ResponseChild) => {
            return {
                userId: data.userId,
                childList: data.childList.map((child: ChildList) => ({
                    ...child,
                    value: child.userId,
                    label: `${child.nome} ${child.cognome}`
                }))
            }
        }
    });
};

export const useSaveExpense = () => {
    return useMutation({
        mutationFn: saveExpenseData,
    });
};