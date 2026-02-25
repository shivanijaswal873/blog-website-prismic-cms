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
    <section className={styles.singleBlog}>
      <div className={styles.container}>
        <div className={styles.meta}>
          <span className={styles.category}>{blog.data.category}</span>
          <span className={styles.date}>{formattedDate}</span>
        </div>

        <h1 className={styles.title}>{blog.data.title}</h1>

        {blog.data.featured_image?.url && (
          <img
            src={blog.data.featured_image.url}
            alt={blog.data.featured_image.alt || ""}
            className={styles.mainImage}
          />
        )}

        <div className={styles.content}>
          <PrismicRichText field={blog.data.content} />
        </div>

        {blog.data.quote_text && (
          <div className={styles.quoteBox}>
            <p>"{blog.data.quote_text}"</p>
            <span>- {blog.data.quote_author}</span>
          </div>
        )}

        {blog.data.second_image?.url && (
          <img
            src={blog.data.second_image.url}
            alt=""
            className={styles.secondImage}
          />
        )}
        <div className={styles.content}>
          <PrismicRichText field={blog.data.content} />
        </div>

        {popularBlogs.length > 0 && (
          <div className={styles.popularSection}>
            <div className={styles.popularHeader}>
              <h2>Popular Post</h2>
              <Button label="View All" href="/blog" variant="primary" />
            </div>

            <div className={styles.popularGrid}>
              {popularBlogs.map((item) => (
                <BlogCard key={item.id} blog={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
