import { SingleFileInput } from "@pagopa/mui-italia";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import AlertComponent from "../shared/AlertComponent";
import InputWrapper from "../InputsWrapper";
import { getValidationRules } from "../../utils/form-utils";
import { IInputProps } from "../../types/input-types";

export default function SingleFileInputs(props: IInputProps) {
  
  const { name, rules, errorMessages, acceptFileUpload = ["application/pdf"]} = props;
  const { formState, trigger } = useFormContext();
  const error = formState.errors[name]?.message;
  const isRequired = formState.errors[name]?.type === 'required'
  const [file, setFile] = React.useState<File | null>(null);

  const handleSelect = (file: File) => {
    trigger(name);
    setFile(file);
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
              accept={acceptFileUpload}
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