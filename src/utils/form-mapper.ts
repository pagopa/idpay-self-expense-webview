import { DataForm, FormtoDTO } from "../types/idpay-types";
import { formatCustomDate } from "./date.utils";
import { fileToBase64 } from "./fileBase64.utils";

export async function mapFormToDTO(
    form: DataForm,
    userId: string
): Promise<FormtoDTO> {
    const formattedDate = formatCustomDate(form.expenseDate);

    const filePromises = form.fileList.map(async (file) => {
        const base64Data = await fileToBase64(file);
        return {
            "content-type": file.type,
            data: base64Data,
            filename: file.name,
        };
    });

    const resolvedFileList = await Promise.all(filePromises);

    return {
        name: form.entityId.nome,
        surname: form.entityId.cognome,
        amount: Number(form.amount.replace(',', '.')),
        expenseDate: formattedDate,
        companyName: form.companyName,
        entityId: form.fiscalCode,
        fiscalCode: userId,
        fileList: resolvedFileList,
        description: form.description
    };
}