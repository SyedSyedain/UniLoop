"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { validateLogin } from "@/lib/validation";
import { mapLoginError } from "@/lib/auth-errors";
import { createClient } from "@/lib/supabase/client";
import { INITIAL_LOGIN_DATA } from "@/lib/auth/constants";
import { useFormState } from "@/hooks/useFormState";

export function useLoginForm() {
  const { data, errors, loading, setErrors, setLoading, updateField } =
    useFormState(INITIAL_LOGIN_DATA);
  const router = useRouter();

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
    [data, router, setErrors, setLoading]
  );

  return { data, errors, loading, updateField, handleSubmit };
}
