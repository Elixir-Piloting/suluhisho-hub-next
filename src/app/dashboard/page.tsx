import DashboardNavbar from "@/components/dashboard-navbar";
import ChallengeCard from "@/components/challenge-card";
import CreateChallengeForm from "@/components/create-challenge-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { redirect } from "next/navigation";
import { createClient } from "../../../supabase/server";
import Link from "next/link";

interface SearchParams {
  search?: string;
  tag?: string;
  show_form?: string;
}

export default async function Dashboard({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Build query for challenges
  let query = supabase
    .from("challenges")
    .select(
      `
      *,
      users!challenges_user_id_fkey(full_name, email),
      challenge_votes!left(vote_type)
    `,
    )
    .eq("challenge_votes.user_id", user.id)
    .order("created_at", { ascending: false });

  // Apply search filter
  if (searchParams.search) {
    query = query.or(
      `title.ilike.%${searchParams.search}%,description.ilike.%${searchParams.search}%`,
    );
  }

  // Apply tag filter
  if (searchParams.tag) {
    query = query.contains("tags", [searchParams.tag]);
  }

  const { data: challenges, error } = await query;

  if (error) {
    console.error("Error fetching challenges:", error);
  }

  // Transform challenges to include user vote
  const challengesWithVotes =
    challenges?.map((challenge) => ({
      ...challenge,
      user_vote: challenge.challenge_votes?.[0] || null,
    })) || [];

  return (
    <>
      <DashboardNavbar />
      <main className="w-full bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Community Challenges
              </h1>
              <p className="text-gray-600 mt-1">
                Share problems, discover solutions together
              </p>
            </div>

            <div className="flex gap-2">
              <Link href="/dashboard?show_form=true">
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Share Challenge
                </Button>
              </Link>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mb-6">
            <form method="GET" className="flex gap-2">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  name="search"
                  placeholder="Search challenges..."
                  defaultValue={searchParams.search}
                  className="pl-10"
                />
              </div>
              <Button type="submit" variant="outline">
                Search
              </Button>
              {(searchParams.search || searchParams.tag) && (
                <Link href="/dashboard">
                  <Button variant="outline">Clear</Button>
                </Link>
              )}
            </form>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {searchParams.show_form === "true" && (
                <CreateChallengeForm userId={user.id} />
              )}

              {challengesWithVotes.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No challenges found
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {searchParams.search || searchParams.tag
                      ? "Try adjusting your search or filters"
                      : "Be the first to share a challenge with the community!"}
                  </p>
                  {!searchParams.show_form && (
                    <Link href="/dashboard?show_form=true">
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Share Your Challenge
                      </Button>
                    </Link>
                  )}
                </div>
              ) : (
                challengesWithVotes.map((challenge) => (
                  <ChallengeCard
                    key={challenge.id}
                    challenge={challenge}
                    currentUserId={user.id}
                  />
                ))
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <h3 className="font-semibold mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Total Challenges
                    </span>
                    <span className="font-medium">
                      {challengesWithVotes.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Total Solutions
                    </span>
                    <span className="font-medium">
                      {challengesWithVotes.reduce(
                        (sum, c) => sum + c.solutions_count,
                        0,
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <h3 className="font-semibold mb-4">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {/* Extract and show popular tags */}
                  {Array.from(
                    new Set(
                      challengesWithVotes
                        .flatMap((c) => c.tags)
                        .filter(Boolean),
                    ),
                  )
                    .slice(0, 10)
                    .map((tag) => (
                      <Link
                        key={tag}
                        href={`/dashboard?tag=${encodeURIComponent(tag)}`}
                      >
                        <Button variant="outline" size="sm" className="text-xs">
                          {tag}
                        </Button>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
