import { createClient } from "@/prismicio";
import BlogCard from "../components/BlogCard";
import styles from "./page.module.scss";
import { PrismicRichText } from "@prismicio/react";

export default async function BlogPage() {
  const client = createClient();

  const blogPage = await client.getSingle("blog_pages");
  const blogs = await client.getAllByType("blog");

  return (
    <section className={styles.blogPage}>
      <div className={styles.blogPage__container}>
        {blogPage?.data?.subheading && (
          <p className={styles.blogPage__subHeading}>
            {blogPage.data.subheading}
          </p>
        )}

        {blogPage?.data?.heading && (
          <h1 className={styles.blogPage__heading}>{blogPage.data.heading}</h1>
        )}

        {blogPage?.data?.description?.length > 0 && (
          <div className={styles.blogPage__description}>
            <PrismicRichText field={blogPage.data.description} />
          </div>
        )}

        <div className={styles.blogPage__grid}>
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
}
