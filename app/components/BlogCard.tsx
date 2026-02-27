import Link from "next/link";
import styles from "../common-style/components/BlogCard.module.scss";
import { PrismicRichText } from "@prismicio/react";

export default function BlogCard({ blog }: any) {
  if (!blog?.data) return null;

  const formattedDate = blog.data.publish_date
    ? new Date(blog.data.publish_date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <section className={styles.cardSection}>
      <div className={styles.cardWrapper}>
        <div className={styles.card}>
          
          <div className={styles.image}>
            <img
              src={blog.data.featured_image?.url ?? ""}
              alt={blog.data.title}
            />
          </div>

          <div className={styles.cardBody}>
            <div className={styles.meta}>
              <span className="category">{blog.data.category}</span>
              <span>{formattedDate}</span>
            </div>

            <h3 className={styles.title}>
              {blog.data.title}
            </h3>

            {blog.data.description && (
              <div className={styles.description}>
                <PrismicRichText field={blog.data.description} />
              </div>
            )}

            <Link
              href={`/blog/${blog.uid}`}
              className={styles.readMore}
            >
              Read More...
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}