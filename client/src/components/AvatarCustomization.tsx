import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AvatarOption {
  id: string;
  name: string;
  imageUrl: string;
}

interface AvatarCustomizationProps {
  avatars: AvatarOption[];
  selectedAvatar: string;
  onSelectAvatar: (avatarId: string) => void;
}

export default function AvatarCustomization({ 
  avatars, 
  selectedAvatar, 
  onSelectAvatar 
}: AvatarCustomizationProps) {
  return (
    <Card className="bg-white">
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold mb-4">Choose Your Avatar</h2>
        <p className="text-sm text-neutral-600 mb-4">
          Choose your coding companion! Your avatar will evolve as you reach your goals.
        </p>
        
        <div className="grid grid-cols-3 gap-4">
          {avatars.map((avatar) => (
            <div
              key={avatar.id}
              onClick={() => onSelectAvatar(avatar.id)}
              className={cn(
                "relative rounded-lg overflow-hidden cursor-pointer transition-all duration-200 transform hover:scale-105",
                selectedAvatar === avatar.id && "ring-2 ring-primary scale-105"
              )}
            >
              <img 
                src={avatar.imageUrl} 
                alt={`${avatar.name} avatar`} 
                className="w-full h-auto rounded-lg"
              />
              <div className="absolute bottom-0 w-full bg-neutral-800 bg-opacity-70 text-white text-xs py-1 text-center">
                {avatar.name}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
