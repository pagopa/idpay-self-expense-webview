import { Button } from "@mui/material";
import { IPropsBtn } from "../../types/button-types";

export default function DefaultBtn({buttonText, buttonAction, type = "button", loading = false, size, variant, disabled, color ="primary", sx}: IPropsBtn) {

    return (
        <Button
            fullWidth
            size={size}
            variant={variant}
            type={type}
            onClick={buttonAction}
            loading={loading}
            color={color}
            disabled={disabled}
            sx={sx}
        >
            { buttonText }
        </Button>

    )
}