interface ShadowMilkLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export function ShadowMilkLogo({ 
  className = "w-48 h-48", 
  width = 192, 
  height = 192 
}: ShadowMilkLogoProps) {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 512 512" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="warmBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF8DC" stopOpacity={1} />
          <stop offset="25%" stopColor="#FFFAF0" stopOpacity={1} />
          <stop offset="50%" stopColor="#F5DEB3" stopOpacity={1} />
          <stop offset="75%" stopColor="#DEB887" stopOpacity={1} />
          <stop offset="100%" stopColor="#D2691E" stopOpacity={1} />
        </linearGradient>
      </defs>
      
      {/* Background circle */}
      <circle cx="256" cy="256" r="256" fill="url(#warmBg)" stroke="#FFD700" strokeWidth="6"/>
      
      {/* Character body */}
      <ellipse cx="256" cy="280" rx="90" ry="110" fill="#F5DEB3"/>
      <ellipse cx="256" cy="270" rx="80" ry="100" fill="#FFFAF0"/>
      
      {/* Hair */}
      <path d="M175 170 L195 120 L215 170 L235 110 L255 170 L275 120 L295 170 L315 140 L335 180" 
            fill="#8B4513" stroke="#5D2F17" strokeWidth="2"/>
      <path d="M180 175 L200 135 L220 175 L240 125 L260 175 L280 135 L300 175 L320 155 L330 185" 
            fill="#CD853F"/>
      
      {/* Eyes */}
      <circle cx="230" cy="230" r="18" fill="#2F4F4F"/>
      <circle cx="282" cy="230" r="18" fill="#2F4F4F"/>
      <circle cx="235" cy="225" r="6" fill="#FFFFFF"/>
      <circle cx="287" cy="225" r="6" fill="#FFFFFF"/>
      
      {/* Mouth */}
      <path d="M230 275 Q256 300 282 275" stroke="#2F4F4F" strokeWidth="6" fill="none"/>
      
      {/* Title */}
      <text x="256" y="455" textAnchor="middle" fill="#8B4513" fontSize="20" fontWeight="bold" fontFamily="Arial, sans-serif">
        SHADOW MILK
      </text>
      <text x="256" y="470" textAnchor="middle" fill="#654321" fontSize="12" fontFamily="Arial, sans-serif">
        VIRTUAL PET GAME
      </text>
    </svg>
  );
}