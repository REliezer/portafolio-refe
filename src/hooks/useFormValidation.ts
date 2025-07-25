import { useState } from 'react';

interface ValidationRules {
  [key: string]: {
    required?: boolean;
    email?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: string) => string | null;
  };
}

interface ValidationErrors {
  [key: string]: string;
}

const nameLabel: Record<string, string> = {
  'firstName': 'Nombre',
  'lastName': 'Apellido',
  'email': 'Correo electronico',
  'phone': 'Teléfono',
  'message': 'Mensaje'
}

export const useFormValidation = (initialValues: any, rules: ValidationRules) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const validateField = (name: string, value: string): string => {
    const rule = rules[name];
    if (!rule) return '';

    // Required validation
    if (rule.required && !value.trim()) {
      return `El campo ${nameLabel[name] ?? name} es requerido`;
    }

    // Email validation
    if (rule.email && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Email no válido';
      }
    }

    // Min length validation
    if (rule.minLength && value.length < rule.minLength) {
      return `Mínimo ${rule.minLength} caracteres`;
    }

    // Max length validation
    if (rule.maxLength && value.length > rule.maxLength) {
      return `Máximo ${rule.maxLength} caracteres`;
    }

    // Pattern validation
    if (rule.pattern && value && !rule.pattern.test(value)) {
      return 'Formato no válido';
    }

    // Custom validation
    if (rule.custom && value) {
      const customError = rule.custom(value);
      if (customError) return customError;
    }

    return '';
  };

  const handleChange = (name: string, value: string) => {
    setValues((prev: any) => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, values[name]);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateAll = (): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    Object.keys(rules).forEach((name) => {
      const error = validateField(name, values[name] || '');
      if (error) {
        newErrors[name] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched(
      Object.keys(rules).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );

    return isValid;
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    reset,
    isValid: Object.keys(errors).length === 0 && Object.keys(touched).length > 0,
  };
};
