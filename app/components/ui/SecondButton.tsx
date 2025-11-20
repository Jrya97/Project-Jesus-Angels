import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export function SecondButton({ children, className, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      {...props}
      className={`w-full bg-black/90  hover:bg-white/50 hover:border
       hover:text-black hover:border-black text-white font-semibold 
       py-2.5 sm:py-3 px-4 rounded-lg transition-all duration-200 shadow-md 
       hover:shadow-lg mt-4 sm:mt-6 text-sm sm:text-base active:scale-90 ${className}`}
    >
      {children}
    </button>
  );
}

export function SecondLink({ className, href, children }: { className?: string, href: string, children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`w-full bg-black/90  hover:bg-white/50 hover:border
       hover:text-black hover:border-black text-white font-semibold 
       py-2.5 sm:py-3 px-4 rounded-lg transition-all duration-200 shadow-md 
       hover:shadow-lg mt-4 sm:mt-6 text-sm sm:text-base active:scale-90 text-center ${className}`}
    >
      {children}
    </Link>
  );
}