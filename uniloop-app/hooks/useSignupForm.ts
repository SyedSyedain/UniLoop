"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { SignupFormData, FormErrors } from "@/types/auth";
import { validateSignup } from "@/lib/validation";
import { mapSignupError } from "@/lib/auth-errors";
import { createClient } from "@/lib/supabase/client";

const INITIAL_DATA: SignupFormData = {
  firstName:       "",
  lastName:        "",
  email:           "",
  phone:           "",
  address:         "",
  schoolId:        "",
  password:        "",
  confirmPassword: "",
  terms:           false,
};

export function useSignupForm() {
  const [data, setData]       = useState<SignupFormData>(INITIAL_DATA);
  const [errors, setErrors]   = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const router                = useRouter();

  const updateField = useCallback(
    <K extends keyof SignupFormData>(field: K, value: SignupFormData[K]) => {
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
    [data, router]
  );

  return { data, errors, loading, updateField, handleSubmit };
}
