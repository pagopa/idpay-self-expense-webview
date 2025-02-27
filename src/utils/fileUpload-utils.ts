import { FieldValues, UseFormSetValue, UseFormTrigger } from "react-hook-form";

type PropFunctions = {
    filesUploaded: File[],
    existingFiles: File[],
    setFile: (files: File[]) => void,
    setValue: UseFormSetValue<FieldValues>,
    setCustomError: (error: { name: string; message: string }[] | null) => void,
    trigger: UseFormTrigger<FieldValues>,
    name: string,
    index?: number,
    validExtensions: string[]
}

export function handleSelect({
    filesUploaded,
    existingFiles,
    setFile,
    setValue,
    setCustomError,
    trigger,
    name,
    validExtensions
}: PropFunctions) {

    const validFiles: File[] = [...existingFiles];
    const errors: { name: string; message: string }[] = [];

    filesUploaded.forEach((file) => {
        const fileExtension = file.name?.toLowerCase().slice(file.name.lastIndexOf("."));
        if(!validExtensions.includes(fileExtension)) {
            errors.push({ name: file.name, message: "Formato non supportato (solo PDF, PNG, JPEG, JPG)" });
        } else if (file.size > 5 * 1024 * 1024) {
            errors.push({ name: file.name, message: "Il file supera i 5MB" });
        } else {
            validFiles.push(file);
        }
    });

    if (validFiles.length > existingFiles.length) {
        setFile(validFiles);
        setValue(name, validFiles);
    }

    setCustomError(errors.length > 0 ? errors : null);

    if (validFiles.length === 0) {
        setValue(name, [], { shouldValidate: true });
    }

    trigger(name);
};

// Function for remove file uploaded
export function handleRemove({
    existingFiles,
    setFile,
    setValue,
    setCustomError,
    trigger,
    name,
    index
}: PropFunctions) {
    const updatedFiles = existingFiles.filter((_, i) => i !== index);
    setFile(updatedFiles);
    setValue(name, updatedFiles, { shouldValidate: true });
    setCustomError(null);
    trigger(name);
};
