"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { createClient } from "../../supabase/client";
import { useRouter } from "next/navigation";

interface CreateChallengeFormProps {
  userId: string;
}

export default function CreateChallengeForm({
  userId,
}: CreateChallengeFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const supabase = createClient();
  const router = useRouter();

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim()) && tags.length < 5) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      setError("Title and description are required");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const { data, error } = await supabase
        .from("challenges")
        .insert({
          title: title.trim(),
          description: description.trim(),
          tags,
          user_id: userId,
        })
        .select()
        .single();

      if (error) throw error;

      // Reset form
      setTitle("");
      setDescription("");
      setTags([]);
      setNewTag("");

      // Redirect to the new challenge page
      router.push(`/challenges/${data.id}`);
    } catch (error) {
      console.error("Error creating challenge:", error);
      setError("Failed to create challenge. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle>Share Your Challenge</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What challenge are you facing?"
              maxLength={200}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your challenge in detail. What have you tried? What specific help do you need?"
              rows={6}
              maxLength={2000}
              required
            />
          </div>

          <div>
            <Label>Tags (optional)</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag"
                maxLength={20}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addTag}
                disabled={!newTag.trim() || tags.length >= 5}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-1 hover:text-red-500"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Add up to 5 tags to help others find your challenge
            </p>
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Creating..." : "Share Challenge"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
