import InfoPage from "../components/InfoPage";
import successIcon from "../assets/icons/success.svg";

export default function ConfirmedPage() {

    const handleBtnAction = () => {
        console.log('handleBtnAction')
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