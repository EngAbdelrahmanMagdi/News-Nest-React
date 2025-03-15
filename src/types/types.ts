export interface AuthResponse {
    token: string;
}

export interface FormState {
  [key: string]: string;
}

export interface UseFormProps {
  initialState: FormState;
  onSubmit: (formData: FormState) => Promise<void>;
  validate?: (formData: FormState) => string | null;
}