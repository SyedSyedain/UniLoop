"use client";

import { useCallback, useState } from "react";
import type { FormErrors } from "@/types/auth";

export function useFormState<T extends object>(initialData: T) {
  const [data, setData] = useState<T>(initialData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const updateField = useCallback(<K extends keyof T>(field: K, value: T[K]) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!(field in prev)) return prev;

      const next = { ...prev };
      delete next[field as string];
      return next;
    });
  }, []);

  return {
    data,
    errors,
    loading,
    setErrors,
    setLoading,
    updateField,
  };
}
