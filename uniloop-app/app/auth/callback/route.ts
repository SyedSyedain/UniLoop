import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";

const ALLOWED_OTP_TYPES: EmailOtpType[] = [
  "signup",
  "magiclink",
  "recovery",
  "invite",
  "email_change",
  "email",
];

function isEmailOtpType(value: string): value is EmailOtpType {
  return ALLOWED_OTP_TYPES.includes(value as EmailOtpType);
}

function buildAuthErrorPath(reason?: string) {
  if (!reason) return "/auth?error=callback_error";
  return `/auth?error=callback_error&reason=${encodeURIComponent(reason)}`;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type");
  const next = searchParams.get("next") ?? "/dashboard";
  const upstreamError = searchParams.get("error");
  const upstreamDescription = searchParams.get("error_description");

  const siteUrl = request.nextUrl.origin;
  const safePath = next.startsWith("/") ? next : "/dashboard";

  if (upstreamError) {
    return NextResponse.redirect(
      `${siteUrl}${buildAuthErrorPath(upstreamDescription ?? undefined)}`
    );
  }

  if (code || (tokenHash && type)) {
    const cookieStore = await cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          },
        },
      }
    );

    let error: { message?: string } | null = null;

    if (code) {
      const result = await supabase.auth.exchangeCodeForSession(code);
      error = result.error;
    } else if (tokenHash && type) {
      if (!isEmailOtpType(type)) {
        error = { message: "Unsupported verification type" };
      } else {
        const result = await supabase.auth.verifyOtp({
          token_hash: tokenHash,
          type,
        });
        error = result.error;
      }
    }

    if (!error) {
      return NextResponse.redirect(`${siteUrl}${safePath}`);
    }

    return NextResponse.redirect(`${siteUrl}${buildAuthErrorPath(error.message)}`);
  }

  return NextResponse.redirect(
    `${siteUrl}${buildAuthErrorPath(upstreamDescription ?? undefined)}`
  );
}
