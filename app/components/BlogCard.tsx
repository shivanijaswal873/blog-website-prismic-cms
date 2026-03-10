import styles from "../common-style/components/BlogCard.module.scss";
import { PrismicRichText } from "@prismicio/react";
import Button from "./common/Button";

export default function BlogCard({ blog }: any) {
  if (!blog?.data) return null;

  const formattedDate = blog?.data?.publish_date
    ? new Date(blog.data.publish_date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <section className={styles.cardSection}>
      <div className={styles.blogCard}>

        {blog?.data?.featured_image?.url && (
          <div className={styles.blogCard__image}>
            <img
              src={blog?.data?.featured_image?.url}
              alt={blog?.data?.title ?? ""}
            />
          </div>
        )}

        <div className={styles.blogCard__body}>

          <div className={styles.blogCard__meta}>

            {blog?.data?.category && (
              <span>{blog?.data?.category}</span>
            )}

            {formattedDate && (
              <span>{formattedDate}</span>
            )}

          </div>

          {blog?.data?.title && (
            <h3 className={styles.blogCard__title}>
              {blog?.data?.title}
            </h3>
          )}

          {blog?.data?.description && (
            <div className={styles.blogCard__description}>
              <PrismicRichText field={blog?.data?.description} />
            </div>
          )}

          {blog?.uid && (
            <div className={styles.blogCard__readMore}>
              <Button
                label="Read More"
                href={`/blog/${blog.uid}`}
                variant="text"
              />
            </div>
          )}

        </div>
      </div>
    </section>
  );
}