import { SliceComponentProps } from "@prismicio/react";
import { Content } from "@prismicio/client";
import { createClient } from "@/prismicio";
import { PrismicImage, PrismicRichText } from "@prismicio/react";
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
      <section className={clsx(styles.blog, styles.hero)}>
        <div className={styles.container}>
          <div className={styles.imageWrapper}>
            <PrismicImage field={hero?.data?.featured_image} />
          </div>

          <div className={styles.content}>
            <div className={styles.meta}>
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

            <h2 className="hero-title">{hero?.data?.title}</h2>

            <p>{hero?.data?.short_description}</p>

            <Button
              label="Read More"
              href={`/blog/${hero?.uid}`}
              className="Read-mORE"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogSection;
