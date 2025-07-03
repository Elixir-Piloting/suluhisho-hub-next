"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowUp,
  ArrowDown,
  MessageSquare,
  User,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { createClient } from "../../supabase/client";

interface Challenge {
  id: string;
  title: string;
  description: string;
  tags: string[];
  user_id: string;
  created_at: string;
  solutions_count: number;
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

interface ChallengeCardProps {
  challenge: Challenge;
  currentUserId?: string;
}

export default function ChallengeCard({
  challenge,
  currentUserId,
}: ChallengeCardProps) {
  const [votes, setVotes] = useState(challenge.votes_count);
  const [userVote, setUserVote] = useState(challenge.user_vote?.vote_type || 0);
  const [isVoting, setIsVoting] = useState(false);
  const supabase = createClient();

  const handleVote = async (voteType: number) => {
    if (!currentUserId || isVoting) return;

    setIsVoting(true);

    try {
      if (userVote === voteType) {
        // Remove vote
        await supabase
          .from("challenge_votes")
          .delete()
          .eq("challenge_id", challenge.id)
          .eq("user_id", currentUserId);

        setVotes(votes - voteType);
        setUserVote(0);
      } else {
        // Add or update vote
        await supabase.from("challenge_votes").upsert({
          challenge_id: challenge.id,
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
    <Card className="w-full bg-white hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold mb-2">
              <Link
                href={`/challenges/${challenge.id}`}
                className="hover:text-blue-600 transition-colors"
              >
                {challenge.title}
              </Link>
            </CardTitle>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {challenge.description}
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
        <div className="flex flex-wrap gap-2 mb-4">
          {challenge.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>
                {challenge.users?.show_name === false
                  ? "Anonymous"
                  : challenge.users?.display_name ||
                    challenge.users?.full_name ||
                    challenge.users?.email ||
                    "Anonymous"}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{new Date(challenge.created_at).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            <span>{challenge.solutions_count} solutions</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
