import { createClient } from "@/prismicio";
import * as prismic from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { notFound } from "next/navigation";
import Button from "../../components/common/Button";
import BlogCard from "@/app/components/BlogCard";
import styles from "../../common-style/components/singleblog.module.scss";

export default async function BlogDetail(props) {
  const { uid } = await props.params;
  const client = createClient();

  const blog = await client.getByUID("blog", uid).catch(() => null);
  if (!blog) notFound();

  const popularBlogs = await client.getAllByType("blog", {
    filters: [
      prismic.filter.at("my.blog.is_popular", true),
      prismic.filter.not("document.id", blog.id),
    ],
    pageSize: 3,
  });

  const formattedDate = blog.data.publish_date
    ? new Date(blog.data.publish_date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <section className={styles.blogDetail}>
      <div className={styles.blogDetail__container}>

        <div className={styles.blogDetail__meta}>
          <span className={styles.blogDetail__category}>
            {blog.data.category}
          </span>
          <span className={styles.blogDetail__date}>
            {formattedDate}
          </span>
        </div>

        <h1 className={styles.blogDetail__title}>
          {blog.data.title}
        </h1>

        {blog.data.featured_image?.url && (
          <img
            src={blog.data.featured_image.url}
            alt={blog.data.featured_image.alt || ""}
            className={styles.blogDetail__mainImage}
          />
        )}

        <div className={styles.blogDetail__content}>
          <PrismicRichText field={blog.data.content} />
        </div>

        {blog.data.quote_text && (
          <div className={styles.blogDetail__quote}>
            <p>{blog.data.quote_text}</p>
            <span>- {blog.data.quote_author}</span>
          </div>
        )}

        {blog.data.second_image?.url && (
          <img
            src={blog.data.second_image.url}
            alt=""
            className={styles.blogDetail__secondImage}
          />
        )}

        {blog.data.description && (
          <div className={styles.blogDetail__description}>
            <PrismicRichText field={blog.data.description} />
          </div>
        )}

      </div>

      {popularBlogs.length > 0 && (
        <div className={styles.blogDetail__popularWrapper}>
          <div className={styles.blogDetail__popularContainer}>

            <div className={styles.blogDetail__popularHeader}>
              <h2>Popular Post</h2>
              <Button label="View All" href="/blog" variant="primary" />
            </div>

            <div className={styles.blogDetail__popularGrid}>
              {popularBlogs.map((item) => (
                <BlogCard key={item.id} blog={item} />
              ))}
            </div>

          </div>
        </div>
      )}
    </section>
  );
}