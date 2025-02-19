
import GenericError from "../assets/icons/generic-error.svg";
import InfoPage from "../components/InfoPage";
import { REDIRECT_APP_URL } from "../config/redirect-url";

export default function ErrorPage() {

    const handleClick = () => {
        window.location.href = REDIRECT_APP_URL;
    }

    return (
        <InfoPage
            icon={GenericError}
            sizeIcon={124}
            title="Si è verificato un errore imprevisto"
            description=""
            buttonText="Chiudi"
            buttonAction={handleClick}
        />
    )
}