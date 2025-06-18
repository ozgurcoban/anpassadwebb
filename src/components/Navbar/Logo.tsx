import Link from 'next/link';

const Logo = () => {
  return (
    <Link
      href="/"
      className="group relative flex size-24 items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-foreground/5 to-foreground/10 transition-all duration-300 hover:scale-105 hover:from-foreground/10 hover:to-foreground/15"
    >
      <svg
        viewBox="0 0 70 60"
        className="h-16 w-16 fill-foreground transition-all duration-300 group-hover:fill-primary"
      >
        {/* A letter */}
        <path
          d="
            M 5 50
            L 20 10
            L 35 50
            M 11 35
            L 29 35
          "
          stroke="currentColor"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* W letter (85% size) - connected to A */}
        <path
          d="
            M 24 20
            L 35 50
            L 45 20
            L 55 50
            L 66 20
          "
          stroke="currentColor"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      
      {/* Subtle accent line at bottom */}
      <div className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </Link>
  );
};
export default Logo;
