import { createClient } from "@/prismicio";
import BlogCard from "../components/BlogCard";
import styles from "./page.module.scss";
import { PrismicRichText } from "@prismicio/react";
import { components } from "@/slices";
import { SliceZone } from "@prismicio/react";

export default async function BlogPage() {
  const client = createClient();

  const blogPage = await client.getSingle("blog_pages");
  const blogs = await client.getAllByType("blog");

  return (
    <section className={styles.blogPage}>
      <div className={styles.container}>
        {blogPage?.data?.subheading && (
          <p className={styles.subHeading}>{blogPage.data.subheading}</p>
        )}

        {blogPage?.data?.heading && (
          <h1 className={styles.heading}>{blogPage.data.heading}</h1>
        )}

        {blogPage?.data?.description?.length > 0 && (
          <div className={styles.description}>
            <PrismicRichText field={blogPage.data.description} />
          </div>
        )}

        <div className={styles.grid}>
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
}
