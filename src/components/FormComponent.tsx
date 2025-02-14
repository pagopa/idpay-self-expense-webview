import { useForm, FormProvider, SubmitHandler } from "react-hook-form"
import { Grid2, InputAdornment } from "@mui/material";
import { getRegex } from "../utils/form-regex";
import EuroIcon from '@mui/icons-material/Euro';
import * as Input from "../components/inputs/index";
import { DataForm } from "../types/idpay-types";
import { mapFormToDTO } from "../utils/form-mapper";
import * as Button from "../components/buttons/index";
import { useGetChild, useSaveExpense } from "../hooks/useExpense";
import Loader from "./shared/Loader";

type IPropsForm = {
    setView: (value: boolean) => void
}

export default function FormComponent({ setView }: IPropsForm) {

    const methods = useForm<DataForm>();
    const mutation = useSaveExpense();
    const { data: dataChild, isLoading: loadingChild } = useGetChild();

    const onSubmit: SubmitHandler<DataForm> = async (formData: DataForm) => {
        if(dataChild) {
            const userId = dataChild?.userId; 
            const dto = await mapFormToDTO(formData, userId);
            console.log(dto);
    
            mutation.mutate(dto, {
                onSuccess: () => {
                    setView(false);
                }
            });
        }
    }

    return (
        <>
            {loadingChild ? <Loader /> : 
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <Grid2 container rowSpacing={3} columnSpacing={3}>
                        <Grid2 size={12}>
                            <Input.Select
                                defaultValue={dataChild?.childList.length === 1 ? dataChild?.childList[0] : ''}
                                options={dataChild?.childList}
                                rules={{ required: true }}
                                name="entityId"
                                label="Indica il figlio"
                                placeholder="Indica il figlio"
                                disabled={dataChild?.childList.length === 1}
                            />
                        </Grid2>
                        <Grid2 size={6}>
                            <Input.NumericInput
                                name="amount"
                                rules={{
                                    required: true,
                                    validate: (value) => parseFloat(value.replace(",", ".")) > 0 || "L'importo deve essere maggiore di 0",
                                }}
                                label="Importo"
                                placeholder="Importo"
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EuroIcon fontSize="small" />
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                            />
                        </Grid2>
                        <Grid2 size={6}>
                            <Input.DatePicker rules={{ required: true }} name={'expenseDate'} label='Data della spesa' placeholder='Data della spesa' />
                        </Grid2>
                        <Grid2 size={12}>
                            <Input.TextField rules={{ required: true }} name="description" label="Descrizione" placeholder="Descrizione" />
                        </Grid2>
                        <Grid2 size={12}>
                            <Input.TextField rules={{ required: true }} name="companyName" label="Ragione sociale dell’esercente" placeholder="Ragione sociale dell’esercente" />
                        </Grid2>
                        <Grid2 size={12}>
                            <Input.TextField rules={{ required: true, pattern: getRegex('fiscalCodePiva') }} name="fiscalCode" label="Codice fiscale o P.IVA" placeholder="Codice fiscale o P.IVA" />
                        </Grid2>
                        <Grid2 size={12}>
                            <Input.FilesInput
                                rules={{ required: true }}
                                errorMessages={{ required: "Carica un documento per procedere" }}
                                name="fileList"
                                acceptFileUpload={["application/pdf"]}
                            />
                        </Grid2>
                        <Grid2 size={12}>
                            <Button.Default loading={mutation.isPending} buttonText="Continua" type="submit" variant="contained" color="primary" />
                        </Grid2>
                    </Grid2>
                </form>
            </FormProvider>
}
        </>
    )
}