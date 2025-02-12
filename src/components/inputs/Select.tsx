import { InputLabel, MenuItem, Select } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { getValidationRules } from "../../utils/form-utils";
import InputWrapper from "../InputsWrapper";
import { IInputProps } from "../../types/input-types";

export default function SelectInput(props: IInputProps) {

    const { formState } = useFormContext();
    const { name, label, size = 'medium', rules, options, defaultValue = "", disabled} = props;
    const error = formState.errors[name]?.message as string | undefined;

    return (
        <InputWrapper error={error}>
            <InputLabel id={name}>{ label }</InputLabel>
            <Controller
                defaultValue={defaultValue}
                name={name}
                rules={getValidationRules(rules)}
                render={({ field }) => (
                    <Select
                        disabled={disabled}
                        error={Boolean(error)}
                        id={ label }
                        label={ label }
                        labelId={ label }
                        onChange={(e) => field.onChange(e.target.value)}
                        value={ field.value }
                        size={ size }
                        renderValue={(selected) => (
                            <span style={{ 
                                overflow: "hidden", 
                                textOverflow: "ellipsis", 
                                whiteSpace: "nowrap", 
                                display: "block",
                                maxWidth: "95%",
                            }}>
                                {selected}
                            </span>
                        )}
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