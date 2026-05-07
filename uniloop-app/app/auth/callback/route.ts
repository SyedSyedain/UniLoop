import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Handles the email-confirmation and OAuth redirect from Supabase.
 * Supabase sends the user here with a one-time `code` in the query string.
 * We exchange that code for a session, then redirect to the destination.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  // Determine the safe base URL — prefer the explicit env variable so that
  // production deployments never accidentally redirect to localhost.
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    `${request.nextUrl.protocol}//${request.nextUrl.host}`;

  // Reject open-redirect attempts: `next` must be a relative path.
  const safePath = next.startsWith("/") ? next : "/dashboard";

  if (code) {
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

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(`${siteUrl}${safePath}`);
    }
  }

  return NextResponse.redirect(`${siteUrl}/auth?error=callback_error`);
}
