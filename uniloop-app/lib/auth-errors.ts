import type { FormErrors } from "@/types/auth";

/**
 * Translates raw Supabase auth error strings into form-field error objects
 * so the UI can highlight the correct input rather than showing a toast.
 */

export function mapLoginError(message: string): FormErrors {
  const m = message.toLowerCase();

  if (m.includes("invalid login") || m.includes("invalid credentials")) {
    return { emailOrPhone: "Incorrect email or password" };
  }
  if (m.includes("email not confirmed")) {
    return { emailOrPhone: "Please confirm your email before signing in" };
  }
  if (m.includes("too many requests") || m.includes("rate limit") || m.includes("over_request_rate_limit")) {
    return { emailOrPhone: "Too many attempts — please wait a moment and try again" };
  }
  if (m.includes("user is banned") || m.includes("banned") || m.includes("user_banned")) {
    return { emailOrPhone: "Your account has been suspended. Contact support for help." };
  }
  if (m.includes("network") || m.includes("fetch failed") || m.includes("failed to fetch")) {
    return { emailOrPhone: "Network error — check your connection and try again" };
  }

  return { emailOrPhone: "Login failed. Please check your credentials and try again." };
}

export function mapSignupError(message: string): FormErrors {
  const m = message.toLowerCase();

  if (m.includes("user already registered") || m.includes("already been registered") || m.includes("already registered")) {
    return { email: "An account with this email already exists" };
  }
  if (m.includes("password should be") || m.includes("password must be") || m.includes("weak password")) {
    return { password: "Password is too weak — use at least 8 characters with a mix of letters and numbers" };
  }
  if (m.includes("unable to validate email") || m.includes("invalid email") || m.includes("invalid format")) {
    return { email: "Please enter a valid email address" };
  }
  if (m.includes("signup is disabled") || m.includes("sign_ups_not_allowed") || m.includes("signups not allowed")) {
    return { email: "New registrations are temporarily unavailable. Please try again later." };
  }
  if (m.includes("too many requests") || m.includes("rate limit") || m.includes("over_request_rate_limit")) {
    return { email: "Too many attempts — please wait a moment and try again" };
  }
  if (m.includes("network") || m.includes("fetch failed") || m.includes("failed to fetch")) {
    return { email: "Network error — check your connection and try again" };
  }

  return { email: "Sign up failed. Please try again." };
}
