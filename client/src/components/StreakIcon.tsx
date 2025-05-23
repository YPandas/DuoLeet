interface StreakIconProps {
  className?: string;
}

export default function StreakIcon({ className = "h-5 w-5" }: StreakIconProps) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Flame shape */}
      <path 
        d="M12 2C12 2 8 6 8 10C8 12.5 9.5 14.5 12 14.5C14.5 14.5 16 12.5 16 10C16 6 12 2 12 2Z" 
        fill="currentColor"
        opacity="0.8"
      />
      
      {/* Inner flame */}
      <path 
        d="M12 4C12 4 10 7 10 9.5C10 11 11 12 12 12C13 12 14 11 14 9.5C14 7 12 4 12 4Z" 
        fill="currentColor"
        opacity="0.6"
      />
      
      {/* Core flame */}
      <path 
        d="M12 6C12 6 11 8 11 9C11 9.5 11.5 10 12 10C12.5 10 13 9.5 13 9C13 8 12 6 12 6Z" 
        fill="currentColor"
      />
      
      {/* Calendar base */}
      <rect 
        x="6" 
        y="14" 
        width="12" 
        height="8" 
        rx="2" 
        fill="currentColor"
        opacity="0.3"
      />
      
      {/* Calendar grid */}
      <line x1="8" y1="16" x2="8" y2="20" stroke="currentColor" strokeWidth="0.5" opacity="0.6"/>
      <line x1="10" y1="16" x2="10" y2="20" stroke="currentColor" strokeWidth="0.5" opacity="0.6"/>
      <line x1="12" y1="16" x2="12" y2="20" stroke="currentColor" strokeWidth="0.5" opacity="0.6"/>
      <line x1="14" y1="16" x2="14" y2="20" stroke="currentColor" strokeWidth="0.5" opacity="0.6"/>
      <line x1="16" y1="16" x2="16" y2="20" stroke="currentColor" strokeWidth="0.5" opacity="0.6"/>
      
      <line x1="7" y1="17" x2="17" y2="17" stroke="currentColor" strokeWidth="0.5" opacity="0.6"/>
      <line x1="7" y1="19" x2="17" y2="19" stroke="currentColor" strokeWidth="0.5" opacity="0.6"/>
      
      {/* Days marked */}
      <circle cx="8.5" cy="18" r="0.8" fill="#f97316" opacity="0.8"/>
      <circle cx="10.5" cy="18" r="0.8" fill="#f97316" opacity="0.8"/>
      <circle cx="12.5" cy="18" r="0.8" fill="#f97316" opacity="0.8"/>
      <circle cx="14.5" cy="18" r="0.8" fill="#f97316" opacity="0.8"/>
      <circle cx="16.5" cy="18" r="0.8" fill="#f97316" opacity="0.8"/>
    </svg>
  );
}