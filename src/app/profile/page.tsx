import DashboardNavbar from "@/components/dashboard-navbar";
import ChallengeCard from "@/components/challenge-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserCircle, Calendar, Trophy, MessageSquare } from "lucide-react";
import { redirect } from "next/navigation";
import { createClient } from "../../../supabase/server";

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Fetch user's challenges
  const { data: userChallenges, error: challengesError } = await supabase
    .from("challenges")
    .select(
      `
      *,
      users!challenges_user_id_fkey(full_name, email),
      challenge_votes!left(vote_type)
    `,
    )
    .eq("user_id", user.id)
    .eq("challenge_votes.user_id", user.id)
    .order("created_at", { ascending: false });

  // Fetch user's solutions with challenge info
  const { data: userSolutions, error: solutionsError } = await supabase
    .from("solutions")
    .select(
      `
      *,
      challenges!solutions_challenge_id_fkey(id, title, user_id)
    `,
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  // Get user profile from users table
  const { data: userProfile } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  if (challengesError || solutionsError) {
    console.error("Error fetching user data:", {
      challengesError,
      solutionsError,
    });
  }

  // Transform challenges to include user vote
  const challengesWithVotes =
    userChallenges?.map((challenge) => ({
      ...challenge,
      user_vote: challenge.challenge_votes?.[0] || null,
    })) || [];

  // Calculate stats
  const totalSolutions = userSolutions?.length || 0;
  const totalChallenges = challengesWithVotes.length;
  const totalVotesReceived =
    challengesWithVotes.reduce((sum, c) => sum + c.votes_count, 0) +
    (userSolutions?.reduce((sum, s) => sum + s.votes_count, 0) || 0);

  return (
    <>
      <DashboardNavbar />
      <main className="w-full bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {/* Profile Header */}
          <Card className="bg-white mb-8">
            <CardHeader>
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                  <UserCircle className="w-12 h-12 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold">
                    {userProfile?.full_name || user.email}
                  </h1>
                  <p className="text-gray-600">{user.email}</p>
                  <div className="flex items-center gap-1 text-sm text-gray-500 mt-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Joined {new Date(user.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                    <span className="text-2xl font-bold">
                      {totalChallenges}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">Challenges Posted</p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Trophy className="w-5 h-5 text-green-600" />
                    <span className="text-2xl font-bold">{totalSolutions}</span>
                  </div>
                  <p className="text-sm text-gray-600">Solutions Contributed</p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-2xl font-bold text-purple-600">
                      {totalVotesReceived}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">Total Votes Received</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content Tabs */}
          <Tabs defaultValue="challenges" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="challenges">
                My Challenges ({totalChallenges})
              </TabsTrigger>
              <TabsTrigger value="solutions">
                My Solutions ({totalSolutions})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="challenges" className="space-y-6">
              {challengesWithVotes.length === 0 ? (
                <Card className="bg-white">
                  <CardContent className="py-12 text-center">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No challenges yet
                    </h3>
                    <p className="text-gray-600">
                      You haven't posted any challenges yet.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                challengesWithVotes.map((challenge) => (
                  <ChallengeCard
                    key={challenge.id}
                    challenge={challenge}
                    currentUserId={user.id}
                  />
                ))
              )}
            </TabsContent>

            <TabsContent value="solutions" className="space-y-6">
              {userSolutions?.length === 0 ? (
                <Card className="bg-white">
                  <CardContent className="py-12 text-center">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No solutions yet
                    </h3>
                    <p className="text-gray-600">
                      You haven't contributed any solutions yet.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                userSolutions?.map((solution) => (
                  <Card key={solution.id} className="bg-white">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2">
                            Solution for: {solution.challenges?.title}
                          </CardTitle>
                          <p className="text-gray-700 whitespace-pre-wrap">
                            {solution.content}
                          </p>
                        </div>
                        <div className="text-center ml-4">
                          <div className="text-lg font-bold">
                            {solution.votes_count}
                          </div>
                          <div className="text-xs text-gray-500">votes</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>
                          {new Date(solution.created_at).toLocaleDateString()}
                        </span>
                        <a
                          href={`/challenges/${solution.challenges?.id}`}
                          className="text-blue-600 hover:underline"
                        >
                          View Challenge
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  );
}
