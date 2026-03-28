import { forwardRef, type ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "outline" | "soft";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  href?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-wine text-white hover:bg-wine/90",
  outline: "border-2 border-wine text-wine hover:bg-wine hover:text-white",
  soft: "bg-rose text-wine hover:bg-dusty-rose",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className = "", href, children, ...props }, ref) => {
    const base = "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-body font-semibold text-sm transition-all duration-200";
    const styles = `${base} ${variantStyles[variant]} ${className}`;

    if (href) {
      return (
        <a href={href} className={styles}>
          {children}
        </a>
      );
    }

    return (
      <button ref={ref} className={styles} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
export { Button };
