import Link from 'next/link';

const Logo = () => {
  return (
    <Link
      href="/"
      className="group relative flex size-24 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-white to-slate-50 shadow-sm border border-slate-200/50 dark:from-slate-900 dark:to-slate-800 dark:border-slate-700/50 transition-all duration-300 hover:scale-105 hover:shadow-md"
    >
      {/* Subtle gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      {/* Clean glass effect */}
      <div className="absolute inset-0 bg-white/5 dark:bg-white/10" />
      
      <svg
        viewBox="0 0 70 60"
        className="relative z-10 h-16 w-16 transition-transform duration-300"
      >
        <defs>
          {/* Professional gradient with subtle colors */}
          <linearGradient id="logoGradientPro" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          
          {/* Hover gradient - slightly brighter */}
          <linearGradient id="logoGradientHover" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="50%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#f472b6" />
          </linearGradient>
          
          {/* Subtle shadow */}
          <filter id="subtleShadow">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.1"/>
          </filter>
        </defs>
        
        {/* Combined A and W path for seamless gradient flow */}
        <path
          d="
            M 5 50
            L 20 10
            L 35 50
            M 11 35
            L 29 35
            M 20 10
            L 35 50
            L 45 20
            L 55 50
            L 66 20
          "
          stroke="url(#logoGradientPro)"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#subtleShadow)"
          className="transition-all duration-300 group-hover:stroke-[6]"
        />
      </svg>
      
    </Link>
  );
};
export default Logo;
