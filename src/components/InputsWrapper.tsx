import { FormControl, FormHelperText } from "@mui/material";
import { InputWrapperProps } from "../types/input-types";

export default function InputWrapper(props: InputWrapperProps) {

    const { children, error, infoLabel, infoLabelId, textAlign = 'left' } = props;

    return(
        <FormControl fullWidth error={!!error}>
            { children }
            {error && (
                <FormHelperText>
                    { error }
                </FormHelperText>
            )}
            {infoLabel && (
                <FormHelperText sx={{marginTop: '8px', textAlign: textAlign}} component="span" id={infoLabelId} error={false}>
                    {infoLabel}
                </FormHelperText>
            )}
        </FormControl>
    )
}