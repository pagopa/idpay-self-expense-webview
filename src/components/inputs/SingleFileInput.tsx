import { SingleFileInput } from "@pagopa/mui-italia";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import AlertComponent from "../shared/AlertComponent";
import InputWrapper from "../InputsWrapper";
import { getValidationRules } from "../../utils/form-utils";
import { IInputProps } from "../../types/input-types";

export default function SingleFileInputs(props: IInputProps) {
  
  const { name, rules, errorMessages} = props;
  const { formState, setError, clearErrors, setValue } = useFormContext();
  const error = formState.errors[name]?.message;
  const isRequired = formState.errors[name]?.type === 'required'
  const [file, setFile] = React.useState<File | null>(null);
  const acceptFile = ["image/png"];

  const handleSelect = (file: File) => {
    if (!acceptFile.includes(file.type)) {
      setError(name, {type: "custom", message: "Carica una ricevuta in formato .pfd"});
      setValue(name, null);
      return;
    }

    setFile(file);
    clearErrors();
  };

  const handleRemove = () => {
    setFile(null);
  };

  return (
    <>
      { error && <AlertComponent 
          title={isRequired ? "Nessuna ricevuta caricata" : "Formato non valido"}
          severity="error"
          message={`${error}`} 
        />
      }
      <InputWrapper error={''} infoLabel={'Carica un file in formato <PDF> fino a 5 MB.'} textAlign="center">
        <Controller
          defaultValue=""
          name={name}
          rules={getValidationRules(rules, errorMessages)}
          render={({ field }) => (
            <div className="custom-wrapp">
            <SingleFileInput
              error={Boolean(error)}
              vertical
              label=""
              value={file}
              accept={acceptFile}
              onFileSelected={(selectedFile) => {
                field.onChange(selectedFile);
                handleSelect(selectedFile);
              }}
              onFileRemoved={() => {
                handleRemove();
                field.onChange(null);
              }}
              dropzoneLabel="Carica qui la ricevuta"
              dropzoneButton="Carica"
              rejectedLabel="Formato file non supportato"
            />
            </div>
          )}
        />
      </InputWrapper>
    </>
  )
}