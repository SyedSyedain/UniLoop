"use client";

import { useState } from "react";
import { Eye, EyeOff, Mail, Phone, Lock, User, MapPin } from "lucide-react";
import { AnimatedInput } from "@/components/ui/AnimatedInput";
import { GoldButton }    from "@/components/ui/GoldButton";
import { Checkbox }      from "@/components/ui/Checkbox";
import { SchoolSelect }  from "@/components/ui/SchoolSelect";
import { useSignupForm } from "@/hooks/useSignupForm";

interface SignupFormProps {
  onSwitchToLogin: () => void;
}

export function SignupForm({ onSwitchToLogin }: SignupFormProps) {
  const { data, errors, loading, updateField, handleSubmit } = useSignupForm();
  const [showPassword, setShowPassword]        = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
      {/* Name row */}
      <div className="grid grid-cols-2 gap-3">
        <AnimatedInput
          icon={<User size={16} aria-hidden="true" />}
          label="First Name"
          value={data.firstName}
          onChange={(v) => updateField("firstName", v)}
          error={errors.firstName}
          autoComplete="given-name"
        />
        <AnimatedInput
          icon={<User size={16} aria-hidden="true" />}
          label="Last Name"
          value={data.lastName}
          onChange={(v) => updateField("lastName", v)}
          error={errors.lastName}
          autoComplete="family-name"
        />
      </div>

      <AnimatedInput
        icon={<Mail size={16} aria-hidden="true" />}
        label="Email Address"
        type="email"
        value={data.email}
        onChange={(v) => updateField("email", v)}
        error={errors.email}
        autoComplete="email"
      />

      <AnimatedInput
        icon={<Phone size={16} aria-hidden="true" />}
        label="Phone Number"
        type="tel"
        value={data.phone}
        onChange={(v) => updateField("phone", v)}
        error={errors.phone}
        autoComplete="tel"
      />

      <AnimatedInput
        icon={<MapPin size={16} aria-hidden="true" />}
        label="Address (City, Area)"
        value={data.address}
        onChange={(v) => updateField("address", v)}
        autoComplete="street-address"
      />

      <SchoolSelect
        value={data.schoolId}
        onChange={(v) => updateField("schoolId", v)}
        error={errors.schoolId}
      />

      <AnimatedInput
        icon={<Lock size={16} aria-hidden="true" />}
        label="Password (min. 8 characters)"
        type={showPassword ? "text" : "password"}
        value={data.password}
        onChange={(v) => updateField("password", v)}
        error={errors.password}
        autoComplete="new-password"
        rightSlot={
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="text-white/30 hover:text-white/60 transition-colors"
          >
            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        }
      />

      <AnimatedInput
        icon={<Lock size={16} aria-hidden="true" />}
        label="Confirm Password"
        type={showConfirmPassword ? "text" : "password"}
        value={data.confirmPassword}
        onChange={(v) => updateField("confirmPassword", v)}
        error={errors.confirmPassword}
        autoComplete="new-password"
        rightSlot={
          <button
            type="button"
            onClick={() => setShowConfirmPassword((v) => !v)}
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            className="text-white/30 hover:text-white/60 transition-colors"
          >
            {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        }
      />

      {/* Terms */}
      <div>
        <label className="flex items-start gap-2.5 cursor-pointer group select-none">
          <div className="mt-0.5">
            <Checkbox
              checked={data.terms}
              onChange={() => updateField("terms", !data.terms)}
              aria-label="Accept terms and conditions"
            />
          </div>
          <span className="text-xs text-white/38 leading-relaxed group-hover:text-white/55 transition-colors">
            I agree to Uniloop&apos;s{" "}
            <button type="button" className="text-gold-500 hover:underline font-semibold">
              Terms of Service
            </button>{" "}
            and{" "}
            <button type="button" className="text-gold-500 hover:underline font-semibold">
              Privacy Policy
            </button>
          </span>
        </label>

        {errors.terms && (
          <p className="input-error-msg mt-1">{errors.terms}</p>
        )}
      </div>

      <GoldButton label="Create Account" loading={loading} />

      <p className="text-center text-sm text-white/38 pt-1">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-gold-500 hover:text-gold-400 font-bold transition-colors"
        >
          Sign in
        </button>
      </p>
    </form>
  );
}
