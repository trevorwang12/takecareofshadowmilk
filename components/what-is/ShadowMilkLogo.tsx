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
  // Use unique IDs to avoid conflicts when multiple instances exist
  const gradientId = `warmBg-${Math.random().toString(36).substr(2, 9)}`;
  const charGradientId = `charBg-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 512 512" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Take Care of Shadow Milk Logo"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF8DC" stopOpacity={1} />
          <stop offset="25%" stopColor="#FFFAF0" stopOpacity={1} />
          <stop offset="50%" stopColor="#F5DEB3" stopOpacity={1} />
          <stop offset="75%" stopColor="#DEB887" stopOpacity={1} />
          <stop offset="100%" stopColor="#D2691E" stopOpacity={1} />
        </linearGradient>
        <linearGradient id={charGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFAF0" stopOpacity={1} />
          <stop offset="100%" stopColor="#F5DEB3" stopOpacity={1} />
        </linearGradient>
      </defs>
      
      {/* Background circle with warm gradient */}
      <circle cx="256" cy="256" r="256" fill={`url(#${gradientId})`} stroke="#FFD700" strokeWidth="6"/>
      
      {/* Shadow Milk Cookie character body */}
      <ellipse cx="256" cy="280" rx="90" ry="110" fill={`url(#${charGradientId})`}/>
      <ellipse cx="256" cy="270" rx="80" ry="100" fill="#FFFAF0"/>
      
      {/* Spiky hair */}
      <path d="M175 170 L195 120 L215 170 L235 110 L255 170 L275 120 L295 170 L315 140 L335 180" 
            fill="#8B4513" stroke="#5D2F17" strokeWidth="2"/>
      <path d="M180 175 L200 135 L220 175 L240 125 L260 175 L280 135 L300 175 L320 155 L330 185" 
            fill="#CD853F"/>
      
      {/* Hair highlights */}
      <circle cx="200" cy="150" r="6" fill="#FFFFFF" opacity="0.9"/>
      <circle cx="245" cy="140" r="5" fill="#FFFFFF" opacity="0.9"/>
      <circle cx="290" cy="155" r="6" fill="#FFFFFF" opacity="0.9"/>
      
      {/* Face highlight */}
      <ellipse cx="256" cy="210" rx="50" ry="25" fill="#FFFFFF" opacity="0.8"/>
      
      {/* Eyes */}
      <circle cx="230" cy="230" r="18" fill="#2F4F4F"/>
      <circle cx="282" cy="230" r="18" fill="#2F4F4F"/>
      <circle cx="235" cy="225" r="6" fill="#FFFFFF"/>
      <circle cx="287" cy="225" r="6" fill="#FFFFFF"/>
      <circle cx="238" cy="222" r="2" fill="#FF6B6B"/>
      <circle cx="290" cy="222" r="2" fill="#FF6B6B"/>
      
      {/* Nose */}
      <ellipse cx="256" cy="250" rx="8" ry="6" fill="#DEB887"/>
      
      {/* Mouth */}
      <path d="M230 275 Q256 300 282 275" stroke="#2F4F4F" strokeWidth="6" fill="none"/>
      <path d="M240 282 Q256 290 272 282" stroke="#8B4513" strokeWidth="3" fill="none"/>
      
      {/* Cookie decorations */}
      <circle cx="180" cy="320" r="25" fill="#D2691E"/>
      <circle cx="180" cy="320" r="20" fill="#F4A460"/>
      <circle cx="175" cy="315" r="3" fill="#8B4513"/>
      <circle cx="185" cy="325" r="3" fill="#8B4513"/>
      <circle cx="180" cy="330" r="2" fill="#654321"/>
      
      {/* Milk glass */}
      <rect x="320" y="280" width="40" height="60" rx="5" fill="#E6E6FA" stroke="#B0C4DE" strokeWidth="3"/>
      <rect x="325" y="285" width="30" height="45" fill="#FFFFFF"/>
      <ellipse cx="340" cy="287" rx="12" ry="3" fill="#F0F8FF"/>
      
      {/* Status bars */}
      <rect x="60" y="60" width="120" height="20" rx="10" fill="#8B4513"/>
      <rect x="65" y="65" width="100" height="10" rx="5" fill="#32CD32"/>
      <text x="120" y="55" textAnchor="middle" fill="#2F4F4F" fontSize="14" fontWeight="bold" fontFamily="Arial, sans-serif">HEALTH</text>
      
      <rect x="60" y="100" width="120" height="20" rx="10" fill="#8B4513"/>
      <rect x="65" y="105" width="85" height="10" rx="5" fill="#FFD700"/>
      <text x="120" y="95" textAnchor="middle" fill="#2F4F4F" fontSize="14" fontWeight="bold" fontFamily="Arial, sans-serif">MOOD</text>
      
      <rect x="60" y="140" width="120" height="20" rx="10" fill="#8B4513"/>
      <rect x="65" y="145" width="70" height="10" rx="5" fill="#FF6B6B"/>
      <text x="120" y="135" textAnchor="middle" fill="#2F4F4F" fontSize="14" fontWeight="bold" fontFamily="Arial, sans-serif">HUNGER</text>
      
      {/* Title banner */}
      <ellipse cx="256" cy="450" rx="120" ry="35" fill="#8B4513"/>
      <ellipse cx="256" cy="447" rx="115" ry="32" fill="#DEB887"/>
      <text x="256" y="435" textAnchor="middle" fill="#2F4F4F" fontSize="16" fontWeight="bold" fontFamily="Arial, sans-serif">TAKE CARE OF</text>
      <text x="256" y="455" textAnchor="middle" fill="#8B4513" fontSize="20" fontWeight="bold" fontFamily="Arial, sans-serif">SHADOW MILK</text>
      <text x="256" y="470" textAnchor="middle" fill="#654321" fontSize="12" fontFamily="Arial, sans-serif">VIRTUAL PET GAME</text>
      
      {/* Decorative sparkles */}
      <circle cx="150" cy="200" r="8" fill="#FFFFFF" opacity="0.8"/>
      <circle cx="370" cy="180" r="6" fill="#FFFFFF" opacity="0.7"/>
      <circle cx="120" cy="350" r="7" fill="#FFFFFF" opacity="0.8"/>
      <circle cx="380" cy="320" r="5" fill="#FFFFFF" opacity="0.6"/>
      
      {/* Stars */}
      <path d="M350 120 L352 128 L360 128 L354 132 L356 140 L350 136 L344 140 L346 132 L340 128 L348 128 Z" fill="#FFD700"/>
      <path d="M400 400 L402 408 L410 408 L404 412 L406 420 L400 416 L394 420 L396 412 L390 408 L398 408 Z" fill="#FFB347"/>
      
      {/* Border rings */}
      <circle cx="256" cy="256" r="250" stroke="#DEB887" strokeWidth="4" fill="none"/>
      <circle cx="256" cy="256" r="240" stroke="rgba(222,184,135,0.5)" strokeWidth="2" fill="none"/>
    </svg>
  );
}