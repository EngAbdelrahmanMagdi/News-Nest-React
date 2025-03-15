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

export interface User {
  name: string;
  email: string;
}

export type UserIconProps = {
  onClick?: () => void;
};