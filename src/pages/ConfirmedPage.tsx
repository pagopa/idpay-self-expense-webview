import InfoPage from "../components/InfoPage";
import successIcon from "../assets/icons/success.svg";
import { clearAuthToken } from "../hooks/useJwt";
import { REDIRECT_APP_URL } from "../config/redirect-url";

export default function ConfirmedPage() {

    const handleBtnAction = () => {
        clearAuthToken();
        window.location.href = REDIRECT_APP_URL;
    }

    return(
        <InfoPage
            icon={successIcon}
            sizeIcon={60}
            title="Tutto pronto!"
            description="Ora effettueremo i controlli necessari. Riceverai aggiornamenti tramite messaggio direttamente in app."
            buttonAction={handleBtnAction}
            buttonText="Chiudi"
        />
    )
}