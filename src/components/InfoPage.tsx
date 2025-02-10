
import { Box, Container, Typography } from "@mui/material";
import NakedBtn from "../components/buttons/NakedBtn";
import DefaultBtn from "./buttons/DefaultBtn";
import * as Button from "./buttons/index";

export type IProps = {
    icon: string;
    sizeIcon: number;
    title: string;
    description?: string;
    buttonText?: string;
    buttonAction: () => void;
    secondaryButtonText?: string,
    secondaryButtonAction?: () => void;
}

export default function InfoPage({ icon, title, description, buttonText, buttonAction, secondaryButtonText, secondaryButtonAction, sizeIcon }: IProps) {

    return (
        <Container
            maxWidth="sm"
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                textAlign: "center",
                maxWidth: "312px",
                gap: "32px"
            }}
        >
            <img
                src={icon}
                alt="icon"
                style={{ width: sizeIcon, height: sizeIcon, marginBottom: 20 }}
            />

            <Box>
                <Typography variant="h4" gutterBottom sx={{ lineHeight: '37px' }}>
                    {title}
                </Typography>

                {description &&
                    <Typography variant="body2" sx={{ lineHeight: '21px', color: '#636B82' }}>
                        {description}
                    </Typography>
                }
            </Box>

            <Button.Default buttonText={buttonText} buttonAction={buttonAction} variant="contained" color="primary" type="button" />

            {
                secondaryButtonText && secondaryButtonAction && <Button.Naked buttonAction={secondaryButtonAction} buttonText={secondaryButtonText} color="primary" />
            }
        </Container>
    )
}