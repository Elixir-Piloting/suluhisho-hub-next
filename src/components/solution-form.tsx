"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "../../supabase/client";

interface SolutionFormProps {
  challengeId: string;
  userId: string;
  onSuccess?: () => void;
}

export default function SolutionForm({
  challengeId,
  userId,
  onSuccess,
}: SolutionFormProps) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      setError("Solution content is required");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const { error } = await supabase.from("solutions").insert({
        content: content.trim(),
        challenge_id: challengeId,
        user_id: userId,
      });

      if (error) throw error;

      setContent("");
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error creating solution:", error);
      setError("Failed to submit solution. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle className="text-lg">Share Your Solution</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="solution">Your Solution</Label>
            <Textarea
              id="solution"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your solution, advice, or approach to this challenge..."
              rows={6}
              maxLength={2000}
              required
            />
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <Button type="submit" disabled={isSubmitting || !content.trim()}>
            {isSubmitting ? "Submitting..." : "Submit Solution"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
