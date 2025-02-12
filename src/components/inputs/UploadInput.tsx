import { Controller, useFormContext } from "react-hook-form";
import AlertComponent from "../shared/AlertComponent";
import InputWrapper from "../InputsWrapper";
import { getValidationRules } from "../../utils/form-utils";
import { IInputProps } from "../../types/input-types";
import { Box, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import BoxInfoFile from "./BoxInfoFile";
import { useRef, useState } from "react";
import { handleRemove, handleSelect } from "../../utils/fileUpload-utils";

export default function FilesInput(props: IInputProps) {

  const { name, rules, errorMessages, acceptFileUpload = ["application/pdf"] } = props;
  const { formState, trigger, setValue } = useFormContext();
  const error = formState.errors[name]?.message;
  const isRequired = formState.errors[name]?.type === 'required'
  const [files, setFile] = useState<File[]>([]);
  const [customError, setCustomError] = useState<{ name: string, message: string }[] | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      {(error || customError) && <AlertComponent
        title={isRequired && !customError ? "Nessuna ricevuta caricata" : "Caricamento fallito"}
        severity="error"
        message={`${customError ? `${customError?.map(err => `${err.name}: ${err.message}`).join(" , ")}` : error}`}
      />
      }
      <InputWrapper error={''}>
        <Controller
          defaultValue={[]}
          name={name}
          rules={getValidationRules(rules, errorMessages)}
          render={({ field }) => (
            <>
              <Box
                sx={{
                  display: "flex",
                  minHeight: "161px",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 2,
                  border: "1px dashed #0073E6",
                  borderRadius: 2,
                  backgroundColor: "#f4f8ff",
                  textAlign: "center",
                  cursor: "pointer"
                }}
                role="button"
                tabIndex={0}
                aria-label="Clicca per caricare il file"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  hidden
                  type="file"
                  multiple
                  onChange={(event) => {
                    if (event.target.files) {
                      const filesArray = Array.from(event.target.files);
                      field.onChange(filesArray);
                      handleSelect({
                        filesUploaded: filesArray,
                        existingFiles: files,
                        setFile,
                        setValue,
                        setCustomError,
                        trigger,
                        name
                      });
                    }
                  }}
                  accept={acceptFileUpload.join(",")}
                  id={name}
                />
                <label htmlFor={name} style={{ textAlign: "center" }}>
                  <CloudUploadIcon sx={{ fontSize: 24, color: "#1976d2" }} />
                  <Typography variant="body2" sx={{ color: "#1976d2" }}>
                    Carica documenti
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#5C6F82" }}>
                    Carica un file in formato {"<PDF>"} fino a 5 MB.
                  </Typography>
                </label>
              </Box>
              {files.length > 0 && files.map((file: File, index: number) => (
                <BoxInfoFile key={index} index={index} file={file} removeAction={() => handleRemove({ 
                  existingFiles: files, 
                  setFile, 
                  setValue, 
                  setCustomError, 
                  trigger, 
                  name, 
                  index, 
                  filesUploaded: files })} 
                />
              ))}
            </>
          )}
        />
      </InputWrapper>
    </>
  )
}