interface EasyX10IconProps {
  className?: string;
}

export default function EasyX10Icon({ className = "h-5 w-5" }: EasyX10IconProps) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Shield background */}
      <path 
        d="M12 2L3 6V12C3 16.5 6.5 20.6 12 22C17.5 20.6 21 16.5 21 12V6L12 2Z" 
        fill="currentColor"
        opacity="0.3"
      />
      
      {/* Checkmark circle */}
      <circle 
        cx="12" 
        cy="10" 
        r="6" 
        fill="currentColor"
        opacity="0.8"
      />
      
      {/* Checkmark */}
      <path 
        d="M9 10L11 12L15 8" 
        stroke="white" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      {/* "x10" text background */}
      <rect 
        x="8" 
        y="16" 
        width="8" 
        height="4" 
        rx="2" 
        fill="currentColor"
        opacity="0.9"
      />
      
      {/* "x10" text */}
      <text 
        x="12" 
        y="18.8" 
        textAnchor="middle" 
        fontSize="3" 
        fontWeight="bold" 
        fill="white"
      >
        x10
      </text>
      
      {/* Stars decoration */}
      <path 
        d="M6 4L6.5 5.5L8 6L6.5 6.5L6 8L5.5 6.5L4 6L5.5 5.5L6 4Z" 
        fill="currentColor"
        opacity="0.6"
      />
      
      <path 
        d="M18 4L18.5 5.5L20 6L18.5 6.5L18 8L17.5 6.5L16 6L17.5 5.5L18 4Z" 
        fill="currentColor"
        opacity="0.6"
      />
    </svg>
  );
}