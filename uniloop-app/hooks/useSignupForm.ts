"use client";

import { useState, useCallback } from "react";
import type { SignupFormData, FormErrors } from "@/types/auth";
import { validateSignup } from "@/lib/validation";

const INITIAL_DATA: SignupFormData = {
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

export function useSignupForm() {
  const [data, setData] = useState<SignupFormData>(INITIAL_DATA);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const updateField = useCallback(
    <K extends keyof SignupFormData>(field: K, value: SignupFormData[K]) => {
      setData((prev) => ({ ...prev, [field]: value }));
      // Clear the error for this field as the user edits it
      setErrors((prev) => {
        if (!(field in prev)) return prev;
        const next = { ...prev };
        delete next[field as string];
        return next;
      });
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const validationErrors = validateSignup(data);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
      setLoading(true);
      try {
        // TODO: replace with Supabase auth call
        await new Promise((resolve) => setTimeout(resolve, 2200));
      } finally {
        setLoading(false);
      }
    },
    [data]
  );

  return { data, errors, loading, updateField, handleSubmit };
}
