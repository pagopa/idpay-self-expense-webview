import { InputLabel, MenuItem, Select } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { getValidationRules } from "../../utils/form-utils";
import InputWrapper from "../InputsWrapper";
import { IInputProps, OptionSelect } from "../../types/input-types";
import { renderOptionLabel } from "../../utils/inputs-utils";

export default function SelectInput(props: IInputProps) {

    const { formState } = useFormContext();
    const { name, label, size = 'medium', rules, options = [], defaultValue = "", disabled} = props;
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
                        onChange={(e) => {
                            const selectedValue = JSON.parse(e.target.value);
                            field.onChange(selectedValue);
                        }}
                        value={field.value ? JSON.stringify(field.value) : ''}
                        size={ size }
                        renderValue={(selected) => {
                            return <span style={{ 
                                overflow: "hidden", 
                                textOverflow: "ellipsis", 
                                whiteSpace: "nowrap", 
                                display: "block",
                                maxWidth: "95%",
                            }}>
                                {renderOptionLabel(JSON.parse(selected))}
                            </span>
                        }}
                    >
                        {options.map((op: OptionSelect, index: number) => (
                            <MenuItem value={JSON.stringify(op)} key={typeof op === 'object' ? op.value : index}>
                                {renderOptionLabel(op)}
                            </MenuItem>
                        ))}
                    </Select>
                )}
            />
        </InputWrapper>
    )
}