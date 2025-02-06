import { Alert, AlertTitle } from "@mui/material";
import React from "react";

export interface AlertProps {
    severity: "error" | "warning" | "info" | "success";
    variant?: "standard" | "outlined";
    message: string;
    title?: string;
}

export default function AlertComponent(props: AlertProps) {

    const { severity, message, variant = "standard", title } = props;

    return (
        <Alert
            sx={{margin: '10px auto'}}
            severity={severity}
            variant={variant}
        >
            <React.Fragment key=".0">
                {title && <AlertTitle>
                    {title}
                </AlertTitle>
                }
            </React.Fragment>
            { message }
        </Alert>
    )
}