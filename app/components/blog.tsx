import {
  ImageField,
  KeyTextField,
  DateField,
  RichTextField,
  isFilled,
} from "@prismicio/client";
import { PrismicImage, PrismicRichText } from "@prismicio/react";
import styles from "../common-style/components/blog.module.scss";
import clsx from "clsx";
import Button from "./common/Button";

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
    <div className={clsx(styles.blogItem, styles[variant])}>
      {image && isFilled.image(image) && (
        <div className={styles.blogItem__image}>
          <PrismicImage field={image} />
        </div>
      )}

      <div className={styles.blogItem__content}>
        <div className={styles.blogItem__meta}>
          {isFilled.keyText(category) && (
            <span className={styles.blogItem__category}>{category}</span>
          )}

          {date && (
            <span className={styles.blogItem__date}>
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
            <h3 className={styles.blogItem__cardTitle}>{title}</h3>
          ) : (
            <h2 className={styles.blogItem__heroTitle}>{title}</h2>
          ))}

        {description && (
          <div className={styles.blogItem__description}>
            {typeof description === "string" ? (
              description
            ) : (
              <PrismicRichText field={description} />
            )}
          </div>
        )}

        {button_label && button_link && (
          <div className={styles.blogItem__readMoreWrapper}>
            <Button
              label={button_label}
              href={button_link}
              variant={variant === "recentHero" ? "outline" : "text"}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogItem;
