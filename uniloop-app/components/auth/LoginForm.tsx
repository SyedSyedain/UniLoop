"use client";

import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, Phone } from "lucide-react";
import { AnimatedInput } from "@/components/ui/AnimatedInput";
import { GoldButton }    from "@/components/ui/GoldButton";
import { Checkbox }      from "@/components/ui/Checkbox";
import { SocialButton }  from "@/components/ui/SocialButton";
import { useLoginForm }  from "@/hooks/useLoginForm";

const GoogleIcon = (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

interface LoginFormProps {
  onSwitchToSignup: () => void;
}

export function LoginForm({ onSwitchToSignup }: LoginFormProps) {
  const { data, errors, loading, updateField, handleSubmit } = useLoginForm();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <AnimatedInput
        icon={<Mail size={16} aria-hidden="true" />}
        label="Email or Phone Number"
        value={data.emailOrPhone}
        onChange={(v) => updateField("emailOrPhone", v)}
        error={errors.emailOrPhone}
        autoComplete="username"
      />

      <AnimatedInput
        icon={<Lock size={16} aria-hidden="true" />}
        label="Password"
        type={showPassword ? "text" : "password"}
        value={data.password}
        onChange={(v) => updateField("password", v)}
        error={errors.password}
        autoComplete="current-password"
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

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer group select-none">
          <Checkbox
            checked={data.remember}
            onChange={() => updateField("remember", !data.remember)}
            aria-label="Remember me"
          />
          <span className="text-xs text-white/38 group-hover:text-white/58 transition-colors">
            Remember me
          </span>
        </label>

        <button
          type="button"
          className="text-xs text-gold-500 hover:text-gold-400 font-semibold transition-colors"
        >
          Forgot password?
        </button>
      </div>

      <GoldButton label="Sign In" loading={loading} />

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-white/[0.07]" />
        <span className="text-[10px] text-white/22 font-semibold tracking-widest uppercase">
          Or continue with
        </span>
        <div className="flex-1 h-px bg-white/[0.07]" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <SocialButton label="Google" icon={GoogleIcon} />
        <SocialButton
          label="OTP Login"
          icon={<Phone size={15} aria-hidden="true" />}
        />
      </div>

      <p className="text-center text-sm text-white/38 pt-1">
        Don&apos;t have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToSignup}
          className="text-gold-500 hover:text-gold-400 font-bold transition-colors"
        >
          Create one
        </button>
      </p>
    </form>
  );
}
