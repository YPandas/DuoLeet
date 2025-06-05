import { cn } from "@/lib/utils";

interface TextBadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "outline" | "solid";
}

export default function TextBadge({ children, className, variant = "solid" }: TextBadgeProps) {
  return (
    <div 
      className={cn(
        "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
        variant === "outline" && "border",
        className
      )}
    >
      {children}
    </div>
  );
} 