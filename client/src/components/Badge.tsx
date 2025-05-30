import { cn } from "@/lib/utils";

interface BadgeData {
  id: string;
  name: string;
  title?: string;
  color: string;
  unlocked: boolean;
  icon: React.ReactNode;
}

interface BadgeProps {
  badge: BadgeData;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export default function Badge({ 
  badge, 
  size = "md", 
  showLabel = true 
}: BadgeProps) {
  if (!badge) {
    return null;
  }

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16"
  };

  const colorClasses = {
    "yellow-500": "bg-yellow-500",
    "green-500": "bg-green-500", 
    "blue-500": "bg-blue-500",
    "purple-500": "bg-purple-500",
    "red-500": "bg-red-500",
    "indigo-500": "bg-indigo-500",
    "neutral-400": "bg-neutral-400"
  };

  const backgroundClass = badge.unlocked 
    ? colorClasses[badge.color as keyof typeof colorClasses] || "bg-primary-500"
    : "bg-neutral-400 opacity-50";
  
  return (
    <div className="flex flex-col items-center">
      <div 
        className={cn(
          "rounded-full flex items-center justify-center mb-1",
          sizeClasses[size],
          backgroundClass
        )}
      >
        <div className={cn(
          "text-white",
          size === "sm" ? "text-sm" : size === "md" ? "text-base" : "text-lg"
        )}>
          {badge.icon}
        </div>
      </div>
      {showLabel && (
        <span className={cn(
          "text-center font-medium",
          size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-base",
          badge.unlocked ? "text-neutral-900" : "text-neutral-500"
        )}>
          {badge.title || badge.name}
        </span>
      )}
    </div>
  );
}
