export default function Logo({ className = "w-10 h-10" }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background gradient */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>

      {/* Main geometric shape - stylized 'A' */}
      <g>
        {/* Left diagonal */}
        <path
          d="M 12 48 L 32 8 L 52 48"
          stroke="url(#logoGradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Horizontal bar */}
        <line
          x1="22"
          y1="32"
          x2="42"
          y2="32"
          stroke="url(#logoGradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Accent spark - top right */}
        <circle cx="48" cy="12" r="2.5" fill="url(#logoGradient)" opacity="0.8" />
        <circle cx="52" cy="16" r="1.5" fill="url(#logoGradient)" opacity="0.6" />

        {/* Bottom accent line */}
        <path
          d="M 16 52 Q 32 56 48 52"
          stroke="url(#logoGradient)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
