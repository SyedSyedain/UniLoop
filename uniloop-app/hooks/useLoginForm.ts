"use client";

import { useState, useCallback } from "react";
import type { LoginFormData, FormErrors } from "@/types/auth";
import { validateLogin } from "@/lib/validation";

const INITIAL_DATA: LoginFormData = {
  emailOrPhone: "",
  password: "",
  remember: false,
};

export function useLoginForm() {
  const [data, setData] = useState<LoginFormData>(INITIAL_DATA);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const updateField = useCallback(
    <K extends keyof LoginFormData>(field: K, value: LoginFormData[K]) => {
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
      const validationErrors = validateLogin(data);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
      setLoading(true);
      try {
        // TODO: replace with Supabase auth call
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } finally {
        setLoading(false);
      }
    },
    [data]
  );

  return { data, errors, loading, updateField, handleSubmit };
}
