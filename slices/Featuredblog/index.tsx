import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicImage, PrismicRichText } from "@prismicio/react";
import Button from "@/app/components/common/Button";
import styles from "./FeatureBlog.module.scss";
import clsx from "clsx";

export type BlogSectionProps = SliceComponentProps<Content.FeaturedblogSlice>;

const BlogSection = ({ slice }: BlogSectionProps) => {
  const items = slice.primary.item || [];

  if (!items.length) return null;

  return (
    <>
      {items.map((item: any, index: number) => {
        const isHero = index === 0;

        return (
          <div key={index}>
            <section
              className={clsx(styles.blog, {
                [styles.hero]: isHero,
                [styles.card]: !isHero,
              })}
            >
              <div className={styles.container}>
                <div className={styles.imageWrapper}>
                  <PrismicImage field={item.image} />
                </div>

                <div className={styles.content}>
                  <div className={styles.meta}>
                    <span className="category">{item.category}</span>
                    <span>
                      {item.date &&
                        new Date(item.date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                    </span>
                  </div>

                  {isHero ? (
                    <h2 className="hero-title">{item.title}</h2>
                  ) : (
                    <h3 className="hero-section-title">{item.title}</h3>
                  )}

                  <PrismicRichText field={item.description} />

                  <Button
                    label={item.button_label}
                    href={item.button_link?.url || ""}
                  />
                </div>
              </div>
            </section>
            {isHero && items.length > 1 && (
              <div className={styles.sectionHeader}>
                <div className={styles.container}>
                  <h3 className={styles.sectionTitle}>
                    {slice.primary.section_heading}
                  </h3>

                  {slice.primary.view_all_label && (
                    <Button label={slice.primary.view_all_label} href="#" />
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};

export default BlogSection;
