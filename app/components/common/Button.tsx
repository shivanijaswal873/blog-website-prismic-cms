import Link from "next/link";
import clsx from "clsx";
import styles from "./Button.module.scss";

type ButtonProps = {
  label: string;
  href: string;
  variant?: "primary" | "outline" | "white";
};

const Button = ({ label, href, variant = "outline" }: ButtonProps) => {
  return (
    <Link href={href} className={clsx(styles.button, styles[variant])}>
      {label}
    </Link>
  );
};

export default Button;
