import { DataForm, FormtoDTO } from "../types/idpay-types";
import { formatCustomDate } from "./date.utils";
import { fileToBase64 } from "./fileBase64.utils";

export async function mapFormToDTO(
    form: DataForm,
    name: string,
    surname: string,
    initiativeId: string
): Promise<FormtoDTO> {
    const base64Data = await fileToBase64(form.file);
    const formattedDate = formatCustomDate(form.expenseDate);

    return {
        name,
        surname,
        amount: form.amount,
        expenseDate: formattedDate,
        companyName: form.companyName,
        entityId: form.entityId,
        fiscalCode: form.fiscalCode,
        initiativeId,
        file: {
            "content-type": form.file.type,
            data: base64Data,
            filename: form.file.name,
        },
    };
}