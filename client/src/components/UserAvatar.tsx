import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Crown, 
  GraduationCap, 
  Glasses, 
  Rocket, 
  Lock as LockIcon,
  Settings,
  ArrowRight
} from "lucide-react";
import fox2Avatar from "/src/avatars/fox2.png";
import wolf2Avatar from "/src/avatars/wolf2.png";
import giraffe2Avatar from "/src/avatars/giraffe2.png";

interface AvatarAccessory {
  id: string;
  name: string;
  icon: React.ReactNode;
  unlocked: boolean;
}

interface UserAvatarProps {
  name: string;
  level: number;
  xp: number;
  xpRequired: number;
  streak: number;
  avatarUrl: string;
}

export default function UserAvatar({
  name,
  level,
  xp,
  xpRequired,
  streak,
  avatarUrl
}: UserAvatarProps) {
  const accessories: AvatarAccessory[] = [
    {
      id: "graduation-cap",
      name: "Graduation Cap",
      icon: <GraduationCap className="h-5 w-5" />,
      unlocked: true
    },
    {
      id: "glasses",
      name: "Glasses",
      icon: <Glasses className="h-5 w-5" />,
      unlocked: true
    },
    {
      id: "rocket",
      name: "Rocket",
      icon: <Rocket className="h-5 w-5" />,
      unlocked: true
    },
    {
      id: "crown",
      name: "Crown",
      icon: <Crown className="h-5 w-5" />,
      unlocked: false
    }
  ];

  const progressPercentage = (xp / xpRequired) * 100;

  // Function to get next level avatar
  const getNextLevelAvatar = (currentAvatar: string) => {
    if (currentAvatar.includes('fox') && !currentAvatar.includes('fox2')) {
      return fox2Avatar;
    }
    if (currentAvatar.includes('wolf') && !currentAvatar.includes('wolf2')) {
      return wolf2Avatar;
    }
    if (currentAvatar.includes('giraffe') && !currentAvatar.includes('giraffe2')) {
      return giraffe2Avatar;
    }
    // If already at level 2 or unknown type, return same avatar
    return currentAvatar;
  };

  const nextLevelAvatar = getNextLevelAvatar(avatarUrl);
  const showNextLevel = nextLevelAvatar !== avatarUrl;

  return (
    <Card className="bg-white rounded-xl shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-neutral-900">Your Avatar</h3>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center space-x-6 mb-4">
            {/* Current Avatar */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 mb-2">
                <img 
                  src={avatarUrl} 
                  alt={`${name}'s avatar`}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-sm font-medium text-neutral-900">Level {level}</span>
            </div>

            {/* Arrow and Next Level Avatar */}
            {showNextLevel && (
              <>
                <ArrowRight className="h-6 w-6 text-neutral-400" />
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 mb-2 opacity-60">
                    <img 
                      src={nextLevelAvatar} 
                      alt="Next level avatar"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-sm text-neutral-400">Level {level + 1}</span>
                </div>
              </>
            )}
          </div>
          
          <h4 className="font-semibold text-neutral-900 mb-2">{name}</h4>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-neutral-600">XP Progress</span>
                <span className="font-medium">{xp}/{xpRequired}</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
