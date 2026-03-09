import { SliceComponentProps } from "@prismicio/react";
import { Content } from "@prismicio/client";
import { createClient } from "@/prismicio";
import { PrismicImage } from "@prismicio/react";
import Button from "@/app/components/common/Button";
import styles from "./FeatureBlog.module.scss";
import clsx from "clsx";

export type BlogSectionProps = SliceComponentProps<Content.FeaturedblogSlice>;

const BlogSection = async () => {
  const client = createClient();

  const blogs = await client.getAllByType("blog", {
    orderings: {
      field: "document.first_publication_date",
      direction: "desc",
    },
    pageSize: 4,
  });

  if (!blogs.length) return null;

  const hero = blogs[0];
  const cards = blogs.slice(1);

  return (
    <>
      <section className={clsx(styles.blog, styles["blog--hero"])}>
        <div className={styles.blog__container}>
          <div className={styles.blog__imageWrapper}>
            <PrismicImage field={hero?.data?.featured_image} />
          </div>

          <div className={styles.blog__content}>
            <div className={styles.blog__meta}>
              <span>{hero.data.category}</span>

              <span>
                {hero.data.publish_date &&
                  new Date(hero?.data?.publish_date).toLocaleDateString(
                    "en-GB",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    },
                  )}
              </span>
            </div>

            <h2 className={styles.blog__title}>{hero?.data?.title}</h2>

            <p className={styles.blog__description}>
              {hero?.data?.short_description}
            </p>

            <Button
              label="Read More"
              href={`/blog/${hero?.uid}`}
              className={styles.blog__read}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogSection;
