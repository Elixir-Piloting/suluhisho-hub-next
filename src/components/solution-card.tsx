"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, User, Calendar } from "lucide-react";
import { useState } from "react";
import { createClient } from "../../supabase/client";

interface Solution {
  id: string;
  content: string;
  user_id: string;
  created_at: string;
  votes_count: number;
  users?: {
    full_name: string | null;
    email: string | null;
    display_name: string | null;
    show_name: boolean | null;
  };
  user_vote?: {
    vote_type: number;
  } | null;
}

interface SolutionCardProps {
  solution: Solution;
  currentUserId?: string;
}

export default function SolutionCard({
  solution,
  currentUserId,
}: SolutionCardProps) {
  const [votes, setVotes] = useState(solution.votes_count);
  const [userVote, setUserVote] = useState(solution.user_vote?.vote_type || 0);
  const [isVoting, setIsVoting] = useState(false);
  const supabase = createClient();

  const handleVote = async (voteType: number) => {
    if (!currentUserId || isVoting) return;

    setIsVoting(true);

    try {
      if (userVote === voteType) {
        // Remove vote
        await supabase
          .from("solution_votes")
          .delete()
          .eq("solution_id", solution.id)
          .eq("user_id", currentUserId);

        setVotes(votes - voteType);
        setUserVote(0);
      } else {
        // Add or update vote
        await supabase.from("solution_votes").upsert({
          solution_id: solution.id,
          user_id: currentUserId,
          vote_type: voteType,
        });

        const voteDiff = voteType - userVote;
        setVotes(votes + voteDiff);
        setUserVote(voteType);
      }
    } catch (error) {
      console.error("Error voting:", error);
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <p className="text-sm text-gray-700 whitespace-pre-wrap">
              {solution.content}
            </p>
          </div>

          {currentUserId && (
            <div className="flex flex-col items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleVote(1)}
                disabled={isVoting}
                className={`p-1 h-8 w-8 ${userVote === 1 ? "text-green-600" : "text-gray-400"}`}
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium">{votes}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleVote(-1)}
                disabled={isVoting}
                className={`p-1 h-8 w-8 ${userVote === -1 ? "text-red-600" : "text-gray-400"}`}
              >
                <ArrowDown className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>
              {solution.users?.show_name === false
                ? "Anonymous"
                : solution.users?.display_name ||
                  solution.users?.full_name ||
                  solution.users?.email ||
                  "Anonymous"}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{new Date(solution.created_at).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
