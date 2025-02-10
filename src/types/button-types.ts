import { ButtonOwnProps } from "@mui/material";

export type IPropsBtn = {
    buttonText?: string;
    buttonAction?: () => void;
    type?: "button" | "submit" | "reset" | undefined;
    loading?: boolean;
    color: ButtonOwnProps["color"];
    size?: ButtonOwnProps["size"];
    variant?: ButtonOwnProps["variant"];
    disabled?: boolean;
    href?: ButtonOwnProps["href"];
    sx?: ButtonOwnProps["sx"];
}