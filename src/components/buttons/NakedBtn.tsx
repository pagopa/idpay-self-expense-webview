import { ButtonNaked } from "@pagopa/mui-italia";
import { IPropsBtn } from "../../types/button-types";

export default function NakedBtn({color, size = 'small', href, buttonAction, buttonText, sx}: IPropsBtn) {

    return (
        <ButtonNaked
            color={color}
            onFocusVisible={function noRefCheck() { }}
            size={size}
            sx={sx}
            LinkComponent={href ? "a" : undefined}
            href={href}
            target={href ? "_blank" : undefined}
            onClick={buttonAction}
        >
            { buttonText }
        </ButtonNaked>
    )
}