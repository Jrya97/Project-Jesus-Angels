interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  className?: string;
}

const classDefaultStyles = `inline-block text-center
        bg-linear-to-r from-green-500 to-[#24a9e7]
        text-white font-bold
        text-sm sm:text-lg md:text-xl
        rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.4)]
        px-4 py-2 cursor-pointer select-none
        transition-transform duration-300 ease-in-out
        hover:scale-105 active:scale-95`;

export function PrimaryButton({children, className = "", ...props}: ButtonProps) {
  return (
    <button
      {...props}
      className={`${classDefaultStyles}
        ${className}`}
    >
      {children}
    </button>
  );
}

export function PrimaryLink({ children, className = "", ...props }: LinkProps) {
  return (
    <a {...props} className={`${classDefaultStyles} ${className}`}>
      {children}
    </a>
  );
}
