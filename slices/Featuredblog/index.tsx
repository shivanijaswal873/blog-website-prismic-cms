import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicImage, PrismicRichText } from "@prismicio/react";
import Button from "@/app/components/common/Button";
import styles from "./FeatureBlog.module.scss";
import clsx from "clsx";

export type BlogSectionProps =
  SliceComponentProps<Content.FeaturedblogSlice>;

const BlogSection = ({ slice }: BlogSectionProps) => {
  const { primary } = slice;
  const isHero = primary.layout_type === "hero";

  return (
    <section
      className={clsx(styles.blog, {
        [styles.hero]: isHero,
        [styles.card]: !isHero,
      })}
    >
      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          <PrismicImage field={primary.image} />
        </div>

        <div className={styles.content}>
          <div className={styles.meta}>
            <span>{primary.category}</span>
            <span>
              {primary.date &&
                new Date(primary.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
            </span>
          </div>

          <h2>{primary.title}</h2>

          <PrismicRichText field={primary.description} />

          <Button
            label={primary.button_label}
            href={primary.button_link?.url || ""}
          />
        </div>
      </div>
    </section>
  );
};

export default BlogSection;