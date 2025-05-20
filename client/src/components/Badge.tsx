import { cn } from "@/lib/utils";

export interface BadgeInfo {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  unlocked: boolean;
}

interface BadgeProps {
  badge: BadgeInfo;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export default function Badge({ 
  badge, 
  size = "md", 
  showLabel = true 
}: BadgeProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16"
  };
  
  const iconSizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl"
  };
  
  return (
    <div className="flex flex-col items-center">
      <div 
        className={cn(
          "rounded-full flex items-center justify-center mb-1 badge-image",
          sizeClasses[size],
          badge.unlocked ? `bg-${badge.color}` : "bg-neutral-400 opacity-50"
        )}
      >
        <div className={cn("text-white", iconSizeClasses[size])}>
          {badge.icon}
        </div>
      </div>
      {showLabel && (
        <span className="text-xs text-center">
          {badge.unlocked ? badge.title : "Locked"}
        </span>
      )}
    </div>
  );
}
