import {
  ImageField,
  KeyTextField,
  DateField,
  RichTextField,
  isFilled,
} from "@prismicio/client";
import { PrismicImage, PrismicRichText } from "@prismicio/react";
import styles from "../common-style/components/Blog.module.scss";
import clsx from "clsx";
import Link from "next/link";

export type BlogItemProps = {
  image?: ImageField;
  category?: KeyTextField;
  date?: DateField;
  title?: KeyTextField;
  description?: string | RichTextField | null;
  button_label?: KeyTextField;
  button_link?: string;
  variant?: "recentHero" | "card" | "featured";
};

const BlogItem = ({
  image,
  category,
  date,
  title,
  description,
  button_label,
  button_link,
  variant = "card",
}: BlogItemProps) => {
  return (
    <div className={clsx(styles.blogItem, variant && styles[variant])}>
      {image && isFilled.image(image) && (
        <div className={styles?.image}>
          <PrismicImage field={image} />
        </div>
      )}

      <div className={styles?.content}>
        <div className={styles?.meta}>
          {isFilled.keyText(category) && <span>{category}</span>}

          {date && (
            <span>
              {new Date(date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          )}
        </div>

        {isFilled.keyText(title) &&
          (variant === "card" ? (
            <h3 className={styles?.cardTitle}>{title}</h3>
          ) : (
            <h2 className={styles?.heroTitle}>{title}</h2>
          ))}

        {description && (
          <div className={styles?.description}>
            {typeof description === "string" ? (
              description
            ) : (
              <PrismicRichText field={description} />
            )}
          </div>
        )}

        {button_label && button_link && (
          <div className={styles?.readMoreWrapper}>
            <Link href={button_link} className={styles?.readMore}>
              {button_label}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogItem;
