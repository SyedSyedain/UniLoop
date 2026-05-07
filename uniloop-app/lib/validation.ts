import type { LoginFormData, SignupFormData, FormErrors } from "@/types/auth";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[\d\s\-()\\.]{7,20}$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}

function countDigits(value: string): number {
  return (value.match(/\d/g) ?? []).length;
}

export function isValidPhone(value: string): boolean {
  return PHONE_RE.test(value.trim()) && countDigits(value) >= 10;
}

export function validateLogin(data: LoginFormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.emailOrPhone.trim()) {
    errors.emailOrPhone = "Email or phone number is required";
  }

  if (!data.password) {
    errors.password = "Password is required";
  }

  return errors;
}

export function validateSignup(data: SignupFormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.firstName.trim()) errors.firstName = "First name is required";
  if (!data.lastName.trim())  errors.lastName  = "Last name is required";

  if (!data.email.trim()) {
    errors.email = "Email address is required";
  } else if (!isValidEmail(data.email)) {
    errors.email = "Enter a valid email address";
  }

  if (!data.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!isValidPhone(data.phone)) {
    errors.phone = "Enter a valid 10-digit phone number";
  }

  if (!data.schoolId) {
    errors.schoolId = "Please select your institution";
  }

  if (!data.password) {
    errors.password = "Password is required";
  } else if (data.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  if (!data.confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  if (!data.terms) {
    errors.terms = "You must accept the Terms of Service to continue";
  }

  return errors;
}
