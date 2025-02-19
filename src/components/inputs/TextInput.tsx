import { TextField } from "@mui/material";
import { useFormContext, Controller } from 'react-hook-form';
import InputWrapper from "../InputsWrapper";
import { getValidationRules } from "../../utils/form-utils";
import { IInputProps } from "../../types/input-types";

export default function TextInput(props: IInputProps) {

    const { name, size = 'medium', label, placeholder, rules, slotProps, isUppercase = false } = props;
    const { formState } = useFormContext();
    const error = formState.errors[name]?.message as string | undefined;

    return (
        <InputWrapper error={error}>
            <Controller
                defaultValue=""
                name={name}
                rules={getValidationRules(rules)}
                render={({ field }) => (
                    <TextField
                        error={Boolean(error)}
                        slotProps={{
                            input: {
                              ...slotProps?.input,
                            },
                        }}
                        {...field}
                        onChange={(e) => field.onChange(isUppercase ? e.target.value.toUpperCase() : e.target.value)}
                        label={label}
                        placeholder={placeholder}
                        size={size}
                        fullWidth
                    />
                )}
            />
        </InputWrapper>
    )
} 