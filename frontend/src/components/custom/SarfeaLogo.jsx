import React from 'react'

const SarfeaLogo = ({ className = 'h-8', color = 'white' }) => {
  return (
    <svg 
      viewBox="0 0 900 200" 
      preserveAspectRatio="xMidYMid meet"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* S - Bold */}
      <path 
        d="M 85 160 Q 50 160 30 140 Q 10 120 10 90 L 35 90 Q 35 110 45 120 Q 55 130 70 130 Q 85 130 95 120 Q 105 110 105 95 Q 105 80 95 72 Q 85 64 60 55 Q 30 45 20 30 Q 10 15 10 0 Q 10 -20 25 -35 Q 40 -50 70 -50 Q 95 -50 110 -37 Q 125 -24 125 0 L 100 0 Q 100 -15 90 -22 Q 80 -30 70 -30 Q 55 -30 45 -22 Q 35 -14 35 0 Q 35 12 45 20 Q 55 28 75 35 Q 105 45 115 60 Q 125 75 125 95 Q 125 120 110 140 Q 95 160 70 160 Z" 
        fill={color} 
        transform="translate(0, 50)"
      />

      {/* A - Stylized Triangle with Diamonds (Gray outline) */}
      <g transform="translate(160, 20)">
        {/* Outer Triangle */}
        <path 
          d="M 60 10 L 115 150 L 5 150 Z" 
          fill="none" 
          stroke={color === 'white' ? '#cccccc' : '#888888'} 
          strokeWidth="8" 
          strokeLinejoin="miter"
        />
        {/* Outer Diamond */}
        <path 
          d="M 60 50 L 85 90 L 60 130 L 35 90 Z" 
          fill="none" 
          stroke={color === 'white' ? '#cccccc' : '#888888'} 
          strokeWidth="6"
        />
        {/* Inner Diamond */}
        <path 
          d="M 60 75 L 75 100 L 60 125 L 45 100 Z" 
          fill="none" 
          stroke={color === 'white' ? '#cccccc' : '#888888'} 
          strokeWidth="5"
        />
      </g>

      {/* R - Bold */}
      <path 
        d="M 280 20 L 280 170 L 310 170 L 310 110 L 350 110 Q 380 110 395 95 Q 410 80 410 55 Q 410 30 395 25 Q 380 20 350 20 Z M 310 45 L 345 45 Q 360 45 370 52 Q 380 59 380 70 Q 380 81 370 88 Q 360 95 345 95 L 310 95 Z" 
        fill={color}
      />
      <polygon points="350,110 390,170 420,170 370,110" fill={color} />

      {/* F - Bold */}
      <path 
        d="M 450 20 L 450 170 L 480 170 L 480 110 L 530 110 L 530 85 L 480 85 L 480 45 L 540 45 L 540 20 Z" 
        fill={color}
      />

      {/* E - Bold */}
      <path 
        d="M 570 20 L 570 170 L 600 170 L 600 110 L 650 110 L 650 85 L 600 85 L 600 45 L 660 45 L 660 20 Z M 600 145 L 660 145 L 660 170 L 600 170 Z" 
        fill={color}
      />

      {/* A - Bold */}
      <g transform="translate(690, 20)">
        <polygon points="60,0 115,150 85,150 75,120 45,120 35,150 5,150" fill={color} />
        <polygon points="60,40 70,90 50,90" fill="none" stroke={color === 'white' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'} strokeWidth="0" />
        <path d="M 60 35 L 52 75 L 68 75 Z" fill={color === 'white' ? '#0a6865' : 'white'} />
      </g>
    </svg>
  )
}

export default SarfeaLogo
