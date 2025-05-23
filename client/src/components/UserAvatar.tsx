import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Crown, 
  GraduationCap, 
  Glasses, 
  Rocket, 
  LockIcon 
} from "lucide-react";

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
  onCustomize?: () => void;
}

export default function UserAvatar({
  name,
  level,
  xp,
  xpRequired,
  streak,
  avatarUrl,
  onCustomize
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

  const xpPercentage = (xp / xpRequired) * 100;

  return (
    <Card className="bg-white">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg">Your Avatar</h2>
          {onCustomize && (
            <Button 
              variant="link" 
              onClick={onCustomize} 
              className="text-primary text-sm"
            >
              Customize
            </Button>
          )}
        </div>
        
        <div className="flex flex-col items-center">
          <div className="relative">
            <img 
              src={avatarUrl} 
              alt="User avatar" 
              className="w-40 h-40 object-cover object-center rounded-full border-4 border-primary mb-3" 
            />
            <Badge 
              className="absolute bottom-3 right-0 bg-success" 
              variant="outline"
            >
              Lvl {level}
            </Badge>
          </div>
          
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-sm text-neutral-600 mb-3">
            Level {level} • {streak} day streak 🔥
          </p>
          
          <div className="w-full mb-4">
            <div className="flex justify-between text-xs mb-1">
              <span>XP</span>
              <span>{xp}/{xpRequired}</span>
            </div>
            <Progress value={xpPercentage} className="h-2" />
          </div>
          
          <div className="flex space-x-2">
            {accessories.map((accessory) => (
              <div 
                key={accessory.id}
                className={`p-2 rounded-full cursor-pointer flex items-center justify-center ${
                  accessory.unlocked 
                    ? "bg-neutral-100 hover:bg-neutral-200" 
                    : "bg-neutral-300 cursor-not-allowed"
                }`}
                title={`${accessory.name}${!accessory.unlocked ? " (Locked)" : ""}`}
              >
                {accessory.unlocked ? (
                  accessory.icon
                ) : (
                  <LockIcon className="h-5 w-5 text-neutral-500" />
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
