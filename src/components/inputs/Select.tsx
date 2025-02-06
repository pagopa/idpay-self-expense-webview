import { InputLabel, MenuItem, Select } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { getValidationRules } from "../../utils/form-utils";
import InputWrapper from "../InputsWrapper";
import { IInputProps } from "../../types/input-types";

export default function SelectInput(props: IInputProps) {

    const { formState } = useFormContext();
    const { name, label, size = 'medium', rules} = props;
    const error = formState.errors[name]?.message as string | undefined;
    const options = ['option1', 'option2', 'option3']

    return (
        <InputWrapper error={error}>
            <InputLabel id={name}>{ label }</InputLabel>
            <Controller
                defaultValue=""
                name={name}
                rules={getValidationRules(rules)}
                render={({ field }) => (
                    <Select
                        error={Boolean(error)}
                        id={ label }
                        label={ label }
                        labelId={ label }
                        onChange={(e) => field.onChange(e.target.value)}
                        value={ field.value }
                        size={ size }
                    >
                        {
                            options?.map((op: string) => (
                                <MenuItem value={op} key={op}>
                                    { op }
                                </MenuItem>
                            ))
                        }
                    </Select>
                )}
            />
        </InputWrapper>
    )
}