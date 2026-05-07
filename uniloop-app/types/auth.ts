export type AuthMode = "login" | "signup";

export interface LoginFormData {
  emailOrPhone: string;
  password: string;
  remember: boolean;
}

export interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  schoolId: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

export type FormErrors = Record<string, string>;
