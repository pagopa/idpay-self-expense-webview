
import { Button, Container, Typography } from "@mui/material";
import GenericError from "../assets/icons/generic-error.svg";

export default function ErrorPage() {

    const appMobileUrl = "myapp://specific-page";

    const handleClick = () => {
        window.location.href = appMobileUrl;
    }

    return(
        <Container
            maxWidth="sm"
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                textAlign: "center",
                maxWidth: "312px"
            }}
        >
            <img
                src={GenericError}
                alt="Logo"
                style={{ width: 124, height: 124, marginBottom: 20 }}
            />
            <Typography variant="h6" gutterBottom sx={{lineHeight: '33px', mb: 2 }}>
                Si è verificato un errore imprevisto
            </Typography>
            <Typography variant="caption" sx={{lineHeight: '21px', mb: 2, color: '#636B82'}}>
                Questo è un esempio di testo descrittivo per la tua pagina. Puoi
                modificarlo come preferisci.
            </Typography>
            <Button onClick={handleClick} variant="contained" color="primary">
                Chiudi
            </Button>
        </Container>
    )
}