import { useForm, FormProvider, SubmitHandler } from "react-hook-form"
import { Button, Grid2, InputAdornment } from "@mui/material";
import { getRegex } from "../utils/form-regex";
import EuroIcon from '@mui/icons-material/Euro';
import * as Input from "../components/inputs/index";
import { DataForm } from "../types/idpay-types";
import { mapFormToDTO } from "../utils/form-mapper";

export default function FormComponent() {

    const methods = useForm<DataForm>();

    const onSubmit: SubmitHandler<DataForm> = async (formData: DataForm) => {
        const dto = await mapFormToDTO(formData, "Mario", "Rossi", "INIT");
        console.log(dto)
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <Grid2 container rowSpacing={3} columnSpacing={3}>
                    <Grid2 size={12}>
                        <Input.Select rules={{required: true}} name="entityId" label="Indica il figlio" placeholder="Indica il figlio" />
                    </Grid2>
                    <Grid2 size={6}>
                        <Input.NumericInput
                            name="amount"
                            rules={{ required: true,
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
                        <Input.DatePicker rules={{required: true}} name={'expenseDate'} label='Data della spesa' placeholder='Data della spesa' />
                    </Grid2>
                    <Grid2 size={12}>
                        <Input.TextField rules={{required: true}} name="companyName" label="Ragione sociale dell’esercente" placeholder="Ragione sociale dell’esercente" />
                    </Grid2>
                    <Grid2 size={12}>
                        <Input.TextField rules={{required: true, pattern: getRegex('fiscalCodePiva')}} name="fiscalCode" label="Codice fiscale o P.IVA" placeholder="Codice fiscale o P.IVA" />
                    </Grid2>
                    <Grid2 size={12}>
                        <Input.SingleFileInput 
                            rules={{
                                required: true,
                                validate: {
                                    formatFormtter: (file) => file && file.name.endsWith(".pdf") || "Il formato non è supportato.",
                                    sizeFormtter: (file) => file && file.size <= 5 * 1024 * 1024 || "Il file supera i 5 MB",
                                }
                            }} 
                            errorMessages={{required: "Carica un documento per procedere"}} 
                            name="file"
                            acceptFileUpload={["application/pdf"]}
                        />
                    </Grid2>
                    <Grid2 size={12}>
                        <Button
                            fullWidth
                            size="medium"
                            variant="contained"
                            type="submit"
                        >
                            Continua
                        </Button>
                    </Grid2>
                </Grid2>
            </form>
        </FormProvider>
    )
}