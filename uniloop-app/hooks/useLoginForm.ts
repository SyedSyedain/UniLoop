"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { LoginFormData, FormErrors } from "@/types/auth";
import { validateLogin } from "@/lib/validation";
import { mapLoginError } from "@/lib/auth-errors";
import { createClient } from "@/lib/supabase/client";

const INITIAL_DATA: LoginFormData = {
  emailOrPhone: "",
  password:     "",
  remember:     false,
};

export function useLoginForm() {
  const [data, setData]       = useState<LoginFormData>(INITIAL_DATA);
  const [errors, setErrors]   = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const router                = useRouter();

  const updateField = useCallback(
    <K extends keyof LoginFormData>(field: K, value: LoginFormData[K]) => {
      setData((prev) => ({ ...prev, [field]: value }));
      // Clear this field's error as soon as the user starts correcting it
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
        const supabase = createClient();
        const { error } = await supabase.auth.signInWithPassword({
          email:    data.emailOrPhone.trim(),
          password: data.password,
        });

        if (error) {
          setErrors(mapLoginError(error.message));
          return;
        }

        router.push("/dashboard");
        router.refresh();
      } catch {
        setErrors({ emailOrPhone: "Something went wrong. Please try again." });
      } finally {
        setLoading(false);
      }
    },
    [data, router]
  );

  return { data, errors, loading, updateField, handleSubmit };
}
