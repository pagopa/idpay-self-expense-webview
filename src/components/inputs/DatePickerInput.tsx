import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { Controller, useFormContext } from "react-hook-form";
import DateRangeIcon from '@mui/icons-material/DateRange';
import InputWrapper from '../InputsWrapper';
import { getValidationRules } from '../../utils/form-utils';
import { IInputProps } from '../../types/input-types';

export default function DataPickerInput(props: IInputProps) {
    const { formState } = useFormContext();
    const { name, label, size = 'medium', rules } = props
    const error = formState.errors[name]?.message as string | undefined;

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <InputWrapper error={error}>
                <Controller
                    defaultValue=""
                    name={name}
                    rules={getValidationRules(rules)}
                    render={({ field }) => (
                        <DesktopDatePicker
                            {...field}
                            label={label}
                            format="dd/MM/yyyy"
                            value={field.value || null}
                            onChange={field.onChange}
                            slots={{
                                openPickerIcon: DateRangeIcon,
                            }}
                            slotProps={{
                                inputAdornment: {
                                    position: 'start',
                                },
                                textField: {
                                    error: Boolean(error),
                                    size: size,
                                    fullWidth: true,
                                    inputProps: {
                                        placeholder: "dd/mm/aaaa"
                                    },
                                }
                            }}
                        />
                    )}
                />
            </InputWrapper>
        </LocalizationProvider>
    )
}