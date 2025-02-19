import { TextField, TextFieldProps } from "@mui/material";
import { useFormContext, Controller, ControllerProps } from "react-hook-form";
import InputWrapper from "../InputsWrapper";
import { getValidationRules } from "../../utils/form-utils";

interface InputProps {
  name: string;
  label?: string | undefined;
  size?: "small" | "medium";
  placeholder?: string | undefined;
  rules?: ControllerProps["rules"];
  slotProps?: TextFieldProps["slotProps"];
}

export default function NumericInput(props: InputProps) {
  const { name, size = "medium", label, placeholder, rules, slotProps } = props;
  const { formState, setValue } = useFormContext();
  const error = formState.errors[name]?.message as string | undefined;

  // Format amount
  const formatAmount = (value: string) => {
    const numericValue = parseFloat(value.replace(",", "."));
    if (isNaN(numericValue)) return "";
    return numericValue.toFixed(2).replace(".", ",");
  };

  return (
    <InputWrapper error={error}>
      <Controller
        defaultValue=""
        name={name}
        rules={getValidationRules(rules)}
        render={({ field }) => (
          <TextField
            {...field}
            error={Boolean(error)}
            slotProps={{
              input: {
                ...slotProps?.input,
                autoComplete: "off",
                style: {
                    appearance: "textfield",
                    WebkitAppearance: "none",
                    MozAppearance: "textfield",
                },
              },
            }}
            label={label}
            placeholder={placeholder}
            size={size}
            fullWidth
            onChange={(e) => {
              let value = e.target.value;
              value = value.replace(/[^0-9,.]/g, "");
              const parts = value.split(",");
              if (parts.length > 2) {
                value = parts[0] + "," + parts.slice(1).join("");
              }
              // Block entry of more than two decimal places
              if (parts.length === 2 && parts[1].length > 2) {
                value = parts[0] + "," + parts[1].slice(0, 2);
              }
              field.onChange(value);
            }}
            onBlur={() => {
              if (field.value) {
                setValue(name, formatAmount(field.value));
              }
            }}
          />
        )}
      />
    </InputWrapper>
  );
}