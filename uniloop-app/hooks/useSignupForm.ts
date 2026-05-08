"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { validateSignup } from "@/lib/validation";
import { mapSignupError } from "@/lib/auth-errors";
import { createClient } from "@/lib/supabase/client";
import { INITIAL_SIGNUP_DATA } from "@/lib/auth/constants";
import { useFormState } from "@/hooks/useFormState";

export function useSignupForm() {
  const { data, errors, loading, setErrors, setLoading, updateField } =
    useFormState(INITIAL_SIGNUP_DATA);
  const router = useRouter();

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
        const supabase = createClient();

        // window.location.origin is the reliable client-side fallback;
        // NEXT_PUBLIC_SITE_URL overrides it in production.
        const siteUrl =
          process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;

        const { error } = await supabase.auth.signUp({
          email:    data.email.trim(),
          password: data.password,
          options: {
            // Persisted in auth.users.raw_user_meta_data; the DB trigger reads
            // these values to create the matching row in public.profiles.
            data: {
              first_name: data.firstName.trim(),
              last_name:  data.lastName.trim(),
              phone:      data.phone.trim(),
              address:    data.address.trim(),
              school_id:  data.schoolId,
            },
            emailRedirectTo: `${siteUrl}/auth/callback`,
          },
        });

        if (error) {
          setErrors(mapSignupError(error.message));
          return;
        }

        router.push("/auth/verify-email");
      } catch {
        setErrors({ email: "Something went wrong. Please try again." });
      } finally {
        setLoading(false);
      }
    },
    [data, router, setErrors, setLoading]
  );

  return { data, errors, loading, updateField, handleSubmit };
}
