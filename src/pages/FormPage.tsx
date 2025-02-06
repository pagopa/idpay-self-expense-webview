import { ButtonNaked } from "@pagopa/mui-italia";
import FormComponent from "../components/FormCOmponent";
import { Container, Typography } from "@mui/material";


export default function FormPage() {

    return (
        <Container maxWidth="sm" sx={{ padding: '24px' }}>
            <Typography variant="h5" sx={{ lineHeight: '37px', mb: 2, color: '#555C70' }}>
                Aggiungi una spesa
            </Typography>

            <Typography variant="body2" sx={{ lineHeight: '24px', mb: 2, color: '#555C70' }}>
                Indica i dati della spesa per cui vuoi chiedere il rimborso, poi carica la ricevuta di pagamento.
            </Typography>

            <ButtonNaked
                color="primary"
                onFocusVisible={function noRefCheck() { }}
                size="small"
                LinkComponent={'a'}
                sx={{ mb: 3 }}
                component="a"
                href="https://www.google.it/"
                target="_blank"
            >
                Link utile?
            </ButtonNaked>

            <FormComponent />
        </Container>
    )
}