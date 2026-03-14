import { useState, useCallback } from "react";

export interface FieldError {
  [key: string]: string;
}

type ValidationRules = {
  [field: string]: {
    required?: boolean;
    label?: string;
    min?: number;
    max?: number;
    minLength?: number;
    pattern?: RegExp;
    patternMessage?: string;
    custom?: (value: any) => string | null;
  };
};

export function useFieldValidation(rules: ValidationRules) {
  const [errors, setErrors] = useState<FieldError>({});

  const validateField = useCallback(
    (field: string, value: any): string | null => {
      const rule = rules[field];
      if (!rule) return null;
      const label = rule.label || field;

      if (rule.required) {
        if (value === undefined || value === null || value === "" || (Array.isArray(value) && value.length === 0)) {
          return `${label} is required`;
        }
      }
      if (rule.min !== undefined && Number(value) < rule.min) {
        return `${label} must be at least ${rule.min}`;
      }
      if (rule.max !== undefined && Number(value) > rule.max) {
        return `${label} must be at most ${rule.max}`;
      }
      if (rule.minLength !== undefined && typeof value === "string" && value.length < rule.minLength) {
        return `${label} must be at least ${rule.minLength} characters`;
      }
      if (rule.pattern && typeof value === "string" && !rule.pattern.test(value)) {
        return rule.patternMessage || `${label} is invalid`;
      }
      if (rule.custom) {
        return rule.custom(value);
      }
      return null;
    },
    [rules]
  );

  const validateAll = useCallback(
    (data: Record<string, any>): boolean => {
      const newErrors: FieldError = {};
      let valid = true;
      for (const field of Object.keys(rules)) {
        const err = validateField(field, data[field]);
        if (err) {
          newErrors[field] = err;
          valid = false;
        }
      }
      setErrors(newErrors);
      return valid;
    },
    [rules, validateField]
  );

  const clearError = useCallback((field: string) => {
    setErrors(prev => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  const clearAll = useCallback(() => setErrors({}), []);

  return { errors, validateAll, validateField, clearError, clearAll, setErrors };
}
