import {
  ImageField,
  KeyTextField,
  DateField,
  RichTextField,
  LinkField,
  isFilled,
} from "@prismicio/client";
import { PrismicImage, PrismicRichText } from "@prismicio/react";
import Button from "@/app/components/common/Button";
import styles from "../common-style/components/blog.module.scss";
import clsx from "clsx";

export type BlogItemProps = {
  image?: ImageField;
  category?: KeyTextField;
  date?: DateField;
  title?: KeyTextField;
  description?: RichTextField;
  button_label?: KeyTextField;
  button_link?: LinkField;
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
      {isFilled.image(image) && (
        <div className={styles.image}>
          <PrismicImage field={image} />
        </div>
      )}

      <div className={styles.content}>
        <div className={styles.meta}>
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
            <h3 className={styles.cardTitle}>{title}</h3>
          ) : (
            <h2 className={styles.heroTitle}>{title}</h2>
          ))}

        {description && (
          <div className={styles.description}>
            <PrismicRichText field={description} />
          </div>
        )}
        {button_label && (
          <div className={styles.readMoreWrapper}>
            <a href="#" className={styles.readMore}>
              {button_label}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogItem;
