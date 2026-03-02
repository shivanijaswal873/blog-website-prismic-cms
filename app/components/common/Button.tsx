import Link from "next/link";
import clsx from "clsx";
import styles from "./Button.module.scss";

type ButtonVariant = "primary" | "outline" | "text";

type ButtonProps = {
  label: string;
  href?: string;
  variant?: ButtonVariant | string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
};

const Button = ({
  label,
  href,
  variant = "primary",
  onClick,
  type = "button",
  className,
}: ButtonProps) => {
  const normalizedVariant = variant?.toLowerCase();

  const variantMap: Record<string, ButtonVariant> = {
    primary: "primary",
    secondary: "outline",
    text: "text",
  };

  const finalVariant = variantMap[normalizedVariant] || "primary";

  const classes = clsx(styles.button, styles[finalVariant], className);

  const finalLabel = finalVariant === "text" ? `${label}…` : label;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {finalLabel}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={classes}>
      {finalLabel}
    </button>
  );
};

export default Button;
