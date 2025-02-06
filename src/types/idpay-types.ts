export type DataForm = {
    amount: number
    expenseDate: string
    companyName: string
    entityId: string
    fiscalCode: string
    file: File
}

export type FormtoDTO = {
    name: string
    surname: string
    amount: number
    expenseDate: string
    companyName: string
    entityId: string
    fiscalCode: string
    initiativeId: string
    file: FileData
}

export type FileData = {
    'content-type': string
    data: string
    filename: string
}

