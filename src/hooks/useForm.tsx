import { useState } from "react";
import { FormState, UseFormProps } from "../types/types";


export const useForm = ({ initialState, onSubmit, validate }: UseFormProps) => {
  const [formData, setFormData] = useState<FormState>(initialState);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate) {
      const validationError = validate(formData);
      if (validationError) {
        setError(validationError);
        return;
      }
    }
    setIsLoading(true);
    try {
      await onSubmit(formData);
    } catch (error: any) {
        if (error.response?.data?.errors) {
            setError(Object.values(error.response.data.errors).flat().join("\n"));
        } else {
            setError(error.response?.data?.message || "An Error occurred");
        }  
    } finally {
      setIsLoading(false);
    }
  };

  return { formData, handleChange, handleSubmit, error, isLoading };
};
