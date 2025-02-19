import { ControllerProps, RegisterOptions } from "react-hook-form";
type ValidationRules = ControllerProps['rules'];

export const getValidationRules = (ruleValue: ValidationRules, errorMessages?: Record<string, string>): RegisterOptions => {
  const validationRules: RegisterOptions = {};

  if (!ruleValue) return validationRules;

  Object.keys(ruleValue).forEach((ruleKey) => {
    switch (ruleKey) {
      case 'required':
        if (ruleValue) {
          validationRules.required = errorMessages?.required || "Campo obbligatorio";
        }
        break;

      case 'pattern':
        if (ruleValue.pattern) {
          validationRules.pattern = {
            value: ruleValue.pattern as RegExp,
            message: "Formato non valido",
          };
        }
        break;

        case 'validate':
        if (typeof ruleValue.validate === "function") {
          validationRules.validate = ruleValue.validate;
        } else if (
          typeof ruleValue.validate === "object" &&
          ruleValue.validate !== null
        ) {
          // Supports multiple validation functions
          validationRules.validate = { ...ruleValue.validate };
        }
        break;

      default:
        break;
    }
  });

  return validationRules;
};