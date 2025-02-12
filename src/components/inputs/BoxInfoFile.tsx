import { Box, IconButton, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import AttachFileIcon from "@mui/icons-material/AttachFile";

type IProps = {
    removeAction: (index: number) => void;
    index: number;
    file: File
}

export default function BoxInfoFile({removeAction, index, file}: IProps) {

    return (
        <Box
            sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
                justifyContent: "space-between",
                border: "1px solid #0073E6",
                borderRadius: 2,
                py: "21px",
                px: "24px",
                mt: 2,
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <AttachFileIcon sx={{ color: "#0073E6" }} />
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <Typography variant="body2" sx={{ color: "#0073E6" }}>
                        {file.name}
                    </Typography>
                    <Typography variant="caption-semibold">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                    </Typography>
                </Box>
            </Box>
            <IconButton onClick={() => removeAction(index)} aria-label={`Elimina ${file.name}`}>
                <CloseIcon />
            </IconButton>
        </Box>
    )
}