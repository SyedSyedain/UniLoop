import { redirect } from "next/navigation";
import { MarketplaceBrowse } from "@/components/marketplace/MarketplaceBrowse";
import { listingsForSchool } from "@/lib/marketplace-demo";
import { createClient } from "@/lib/supabase/server";

const DEFAULT_SCHOOL = "Delhi Public School";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth");

  const meta = user.user_metadata as Record<string, string> | undefined;
  const { data: profile } = await supabase
    .from("profiles")
    .select("first_name, school_id")
    .eq("id", user.id)
    .single();

  let schoolName = meta?.school_name ?? "";
  if (profile?.school_id) {
    const { data: school } = await supabase
      .from("schools")
      .select("name")
      .eq("id", profile.school_id)
      .single();
    schoolName = school?.name ?? schoolName;
  }

  schoolName = schoolName || DEFAULT_SCHOOL;

  const firstName = profile?.first_name ?? meta?.first_name ?? "";
  const displayName = firstName || user.email?.split("@")[0] || "there";
  const listings = listingsForSchool(schoolName);

  return <MarketplaceBrowse displayName={displayName} schoolName={schoolName} listings={listings} />;
}
