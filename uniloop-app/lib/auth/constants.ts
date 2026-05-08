import type { AuthMode, LoginFormData, SignupFormData } from "@/types/auth";

export const INITIAL_LOGIN_DATA: LoginFormData = {
  emailOrPhone: "",
  password: "",
  remember: false,
};

export const INITIAL_SIGNUP_DATA: SignupFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  schoolId: "",
  password: "",
  confirmPassword: "",
  terms: false,
};

export const AUTH_TABS: { mode: AuthMode; label: string }[] = [
  { mode: "login", label: "Sign In" },
  { mode: "signup", label: "Create Account" },
];

export const AUTH_HEADINGS: Record<AuthMode, { title: string; subtitle: string }> = {
  login: {
    title: "Welcome back",
    subtitle: "Sign in to continue to your account",
  },
  signup: {
    title: "Create your account",
    subtitle: "Join Uniloop and start buying or selling today",
  },
};

export const CALLBACK_ERRORS: Record<string, string> = {
  callback_error:
    "Your confirmation link has expired or is invalid. Please sign up again or request a new link.",
};

export const BRAND_FEATURES = [
  "Every listing quality-checked before it goes live",
  "Sellers keep 80% - school earns on every sale",
  "7-day hassle-free return on every order",
] as const;
