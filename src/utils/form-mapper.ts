import { DataForm, FormtoDTO } from "../types/idpay-types";
import { formatCustomDate } from "./date.utils";
import { fileToBase64 } from "./fileBase64.utils";

export async function mapFormToDTO(
    form: DataForm,
    name: string,
    surname: string,
    initiativeId: string
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
        name,
        surname,
        amount: form.amount,
        expenseDate: formattedDate,
        companyName: form.companyName,
        entityId: form.entityId,
        fiscalCode: form.fiscalCode,
        initiativeId,
        fileList: resolvedFileList,
        description: form.description
    };
}