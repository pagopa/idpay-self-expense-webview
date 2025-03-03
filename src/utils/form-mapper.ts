import { DataForm } from "../types/idpay-types";
import { formatCustomDate } from "./date.utils";

export async function mapFormToDTO(
    form: DataForm,
    userId: string
): Promise<FormData> {
    const formattedDate = formatCustomDate(form.expenseDate);
    const dto = new FormData(); 

    const mappedData = {
        name: form.entityId.nome,
        surname: form.entityId.cognome,
        amount: form.amount.replace(',', '.'),
        expenseDate: formattedDate,
        companyName: form.companyName,
        entityId: form.fiscalCode,
        fiscalCode: userId,
        description: form.description
    };

    dto.append("expenseData", new Blob([JSON.stringify(mappedData)], { type: "application/json" }));

    if (form.fileList && form.fileList.length > 0) {
        Array.from(form.fileList).forEach((file) => {
            dto.append("files", file);
        });
    }

    return dto;
}