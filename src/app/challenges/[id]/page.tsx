import DashboardNavbar from "@/components/dashboard-navbar";
import SolutionCard from "@/components/solution-card";
import SolutionForm from "@/components/solution-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown, User, Calendar, ArrowLeft } from "lucide-react";
import { redirect, notFound } from "next/navigation";
import { createClient } from "../../../../supabase/server";
import Link from "next/link";

export default async function ChallengePage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Fetch challenge with user vote
  const { data: challenge, error: challengeError } = await supabase
    .from("challenges")
    .select(
      `
      *,
      users!challenges_user_id_fkey(full_name, email),
      challenge_votes!left(vote_type)
    `,
    )
    .eq("id", params.id)
    .eq("challenge_votes.user_id", user.id)
    .single();

  if (challengeError || !challenge) {
    notFound();
  }

  // Fetch solutions with user votes
  const { data: solutions, error: solutionsError } = await supabase
    .from("solutions")
    .select(
      `
      *,
      users!solutions_user_id_fkey(full_name, email),
      solution_votes!left(vote_type)
    `,
    )
    .eq("challenge_id", params.id)
    .eq("solution_votes.user_id", user.id)
    .order("votes_count", { ascending: false })
    .order("created_at", { ascending: false });

  if (solutionsError) {
    console.error("Error fetching solutions:", solutionsError);
  }

  // Transform data to include user votes
  const challengeWithVote = {
    ...challenge,
    user_vote: challenge.challenge_votes?.[0] || null,
  };

  const solutionsWithVotes =
    solutions?.map((solution) => ({
      ...solution,
      user_vote: solution.solution_votes?.[0] || null,
    })) || [];

  return (
    <>
      <DashboardNavbar />
      <main className="w-full bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <div className="mb-6">
            <Link href="/dashboard">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Challenges
              </Button>
            </Link>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Challenge Details */}
              <Card className="bg-white">
                <CardHeader>
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-2xl font-bold mb-4">
                        {challenge.title}
                      </CardTitle>
                      <p className="text-gray-700 whitespace-pre-wrap mb-4">
                        {challenge.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {challenge.tags.map((tag: string, index: number) => (
                          <Badge key={index} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-1 h-8 w-8 text-gray-400"
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <span className="text-sm font-medium">
                        {challenge.votes_count}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-1 h-8 w-8 text-gray-400"
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>
                        {challenge.users?.full_name ||
                          challenge.users?.email ||
                          "Anonymous"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(challenge.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Solution Form */}
              <SolutionForm
                challengeId={params.id}
                userId={user.id}
                onSuccess={() => window.location.reload()}
              />

              {/* Solutions */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">
                  Solutions ({challenge.solutions_count})
                </h2>

                {solutionsWithVotes.length === 0 ? (
                  <Card className="bg-white">
                    <CardContent className="py-12 text-center">
                      <p className="text-gray-600 mb-4">
                        No solutions yet. Be the first to help solve this
                        challenge!
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  solutionsWithVotes.map((solution) => (
                    <SolutionCard
                      key={solution.id}
                      solution={solution}
                      currentUserId={user.id}
                    />
                  ))
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="text-lg">Challenge Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Solutions</span>
                    <span className="font-medium">
                      {challenge.solutions_count}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Votes</span>
                    <span className="font-medium">{challenge.votes_count}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Created</span>
                    <span className="font-medium">
                      {new Date(challenge.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="text-lg">Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {challenge.tags.map((tag: string, index: number) => (
                      <Link
                        key={index}
                        href={`/dashboard?tag=${encodeURIComponent(tag)}`}
                      >
                        <Badge
                          variant="outline"
                          className="cursor-pointer hover:bg-gray-100"
                        >
                          {tag}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
