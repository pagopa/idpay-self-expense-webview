
import GenericError from "../assets/icons/generic-error.svg";
import InfoPage from "../components/InfoPage";

export default function ErrorPage() {

    const appMobileUrl = "myapp://specific-page";

    const handleClick = () => {
        window.location.href = appMobileUrl;
    }

    return (
        <InfoPage
            icon={GenericError}
            sizeIcon={124}
            title="Si è verificato un errore imprevisto"
            description="Questo è un esempio di testo descrittivo per la tua pagina.Puoi modificarlo come preferisci."
            buttonText="Chiudi"
            buttonAction={handleClick}
        />
    )
}