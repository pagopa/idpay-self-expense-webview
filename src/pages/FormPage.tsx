import FormComponent from "../components/FormComponent";
import { Container, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InfoPage from "../components/InfoPage";
import checkIcon from "../assets/icons/check.svg";
import * as Button from "../components/buttons/index";

export default function FormPage() {

    const navigate = useNavigate();
    const [hasMoreExpenses, setHasMoreExpenses] = useState(true);

    return (
        <>
            {hasMoreExpenses ?
                <Container maxWidth="sm" sx={{ padding: '24px' }}>
                    <Typography variant="h5" sx={{ lineHeight: '37px', mb: 2, color: '#555C70' }}>
                        Aggiungi una spesa
                    </Typography>
                    <Typography variant="body2" sx={{ lineHeight: '24px', mb: 2, color: '#555C70' }}>
                        Indica i dati della spesa per cui vuoi chiedere il rimborso, poi carica la ricevuta di pagamento.
                    </Typography>
                    <Button.Naked sx={{mb: 4}} buttonText="Link utile?" color="primary" href="https://www.google.it/" />
                    <FormComponent setView={setHasMoreExpenses} />
                </Container>
                : <InfoPage
                    icon={checkIcon}
                    sizeIcon={60}
                    title="Hai altre spese da caricare?"
                    buttonAction={() => setHasMoreExpenses(true)}
                    buttonText="Aggiungi un’altra spesa"
                    secondaryButtonText="No, ho finito"
                    secondaryButtonAction={() => navigate('/confirmed')}
                />
            }
        </>
    )
}