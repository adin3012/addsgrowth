import { useId } from 'react'

interface LogoProps {
  className?: string
}

export default function Logo({ className = '' }: LogoProps) {
  const id = useId().replace(/:/g, '')
  const barFill = `bf-${id}`
  const accentLine = `al-${id}`
  const iconBorder = `ib-${id}`
  const glow = `g-${id}`
  const textShadow = `ts-${id}`
  const vignette = `v-${id}`

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 680 200"
      className={className}
      aria-label="AddsGrowth"
      role="img"
    >
      <defs>
        <linearGradient id={barFill} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3d9970" />
          <stop offset="100%" stopColor="#2a7a58" />
        </linearGradient>

        <linearGradient id={accentLine} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3d9970" />
          <stop offset="100%" stopColor="#3d9970" stopOpacity="0" />
        </linearGradient>

        <linearGradient id={iconBorder} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3d9970" stopOpacity="0.55" />
          <stop offset="55%" stopColor="#3d9970" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#3d9970" stopOpacity="0.02" />
        </linearGradient>

        <filter id={glow} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>

        <filter id={textShadow}>
          <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#000" floodOpacity="0.4" />
        </filter>

        <radialGradient id={vignette} cx="50%" cy="50%" r="80%">
          <stop offset="0%" stopColor="#0a0a0a" stopOpacity="0" />
          <stop offset="100%" stopColor="#050505" stopOpacity="0.6" />
        </radialGradient>
      </defs>

      <rect width="680" height="200" fill="#0a0a0a" />
      <rect width="680" height="200" fill={`url(#${vignette})`} />

      <rect x="24" y="22" width="156" height="156" rx="30" fill="#3d9970" fillOpacity="0.06" />
      <rect x="26" y="24" width="152" height="152" rx="28" fill="#111111" />
      <rect x="26" y="24" width="152" height="152" rx="28" fill="none" stroke={`url(#${iconBorder})`} strokeWidth="1.5" />
      <rect x="26" y="24" width="90" height="2.5" rx="1.25" fill={`url(#${accentLine})`} />

      <rect x="52" y="125" width="20" height="33" rx="3" fill="#3d9970" fillOpacity="0.22" />
      <rect x="80" y="101" width="20" height="57" rx="3" fill="#3d9970" fillOpacity="0.46" />
      <rect x="108" y="77" width="20" height="81" rx="3" fill="#3d9970" fillOpacity="0.7" />
      <rect x="136" y="54" width="20" height="104" rx="3" fill={`url(#${barFill})`} />

      <polyline
        points="62,119 90,95 118,71 146,48"
        fill="none"
        stroke="#3d9970"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle cx="146" cy="48" r="8" fill="#3d9970" fillOpacity="0.18" />
      <circle cx="146" cy="48" r="4.5" fill="#3d9970" />

      <line x1="46" y1="115" x2="162" y2="115" stroke="rgba(240,240,240,0.04)" strokeWidth="1" />
      <line x1="46" y1="90" x2="162" y2="90" stroke="rgba(240,240,240,0.04)" strokeWidth="1" />
      <line x1="46" y1="65" x2="162" y2="65" stroke="rgba(240,240,240,0.04)" strokeWidth="1" />

      <text
        x="202"
        y="118"
        fontFamily="'Sora', 'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif"
        fontSize="62"
        fontWeight="800"
        letterSpacing="-2"
        fill="#f0f0f0"
      >
        AddsGrowth
        <tspan fill="#3d9970" letterSpacing="0">.</tspan>
      </text>

      <rect x="202" y="132" width="40" height="1.5" rx="0.75" fill="#3d9970" fillOpacity="0.5" />

      <text
        x="202"
        y="156"
        fontFamily="'DM Mono', 'SF Mono', 'Fira Mono', 'Courier New', monospace"
        fontSize="13.5"
        fontWeight="400"
        letterSpacing="3.5"
        fill="rgba(240,240,240,0.38)"
      >
        WE BUILD. YOU GROW.
      </text>
    </svg>
  )
}
