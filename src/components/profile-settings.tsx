"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "../../supabase/client";
import { useRouter } from "next/navigation";

interface ProfileSettingsProps {
  userId: string;
  currentDisplayName?: string;
  currentShowName?: boolean;
}

export default function ProfileSettings({
  userId,
  currentDisplayName = "",
  currentShowName = true,
}: ProfileSettingsProps) {
  const [displayName, setDisplayName] = useState(currentDisplayName);
  const [showName, setShowName] = useState(currentShowName);
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState("");
  const supabase = createClient();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setMessage("");

    try {
      const { error } = await supabase
        .from("users")
        .update({
          display_name: displayName.trim() || null,
          show_name: showName,
        })
        .eq("id", userId);

      if (error) throw error;

      setMessage("Profile updated successfully!");
      router.refresh();
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Failed to update profile. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="displayName">Display Name</Label>
            <Input
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Enter your display name (optional)"
              maxLength={100}
            />
            <p className="text-xs text-muted-foreground">
              This name will be shown on your posts and solutions. Leave empty
              to use your email.
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="showName">Show Name Publicly</Label>
              <p className="text-xs text-muted-foreground">
                When disabled, you'll appear as "Anonymous" to other users
              </p>
            </div>
            <Switch
              id="showName"
              checked={showName}
              onCheckedChange={setShowName}
            />
          </div>

          {message && (
            <div
              className={`text-sm ${
                message.includes("success") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </div>
          )}

          <Button type="submit" disabled={isUpdating}>
            {isUpdating ? "Updating..." : "Save Changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
