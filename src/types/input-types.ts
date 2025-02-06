import { TextFieldProps } from "@mui/material"
import { ControllerProps } from "react-hook-form"

export interface InputWrapperProps {
    error?: string
    infoLabel?: React.ReactNode
    children: React.ReactNode
    infoLabelId?: string
    errorId?: string
    component?: React.ElementType,
    textAlign?: 'center' | 'left' | 'right'
}

export interface IInputProps {
    name: string;
    label?: string | undefined;
    size?: 'small' | 'medium';
    placeholder?: string | undefined;
    rules?: ControllerProps['rules'];
    slotProps?: TextFieldProps["slotProps"];
    errorMessages?: Record<string, string>;
}
