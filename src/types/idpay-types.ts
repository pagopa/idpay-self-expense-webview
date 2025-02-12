export type DataForm = {
    amount: number
    expenseDate: string
    companyName: string
    entityId: string
    fiscalCode: string
    fileList: File[]
    description: string
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
    fileList: FileData[]
    description: string
}

export type FileData = {
    'content-type': string
    data: string
    filename: string
}

