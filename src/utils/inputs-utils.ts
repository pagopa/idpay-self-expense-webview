import { OptionSelect } from "../types/input-types";

// Render option select
export const renderOptionLabel = (option: OptionSelect): string => {
    if (typeof option === 'string' || typeof option === 'number') {
        return `${option}`;
    } else if (typeof option === 'object' && option !== null) {
        return `${option.label}`;
    }
    return '';
};
  