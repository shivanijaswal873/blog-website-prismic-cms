import { SliceComponentProps } from "@prismicio/react";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import BlogItem from "../../app/components/blog";
import styles from "../../app/common-style/components/Recentblog.module.scss";

export type PopularBlogProps = SliceComponentProps<Content.PopularBlogSlice>;

const PopularBlog = ({ slice }: PopularBlogProps) => {
  if (!slice?.primary?.items?.length) return null;

  const blogs = slice?.primary?.items
    .map((item) => item?.blog)
    .filter((blog) => isFilled.contentRelationship(blog));

  if (!blogs.length) return null;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>{slice?.primary?.section_title}</h2>

          <PrismicNextLink
            field={slice?.primary?.view_all_link}
            className={styles.viewAllBtn}
          >
            {slice?.primary?.view_all_label}
          </PrismicNextLink>
        </div>

        <div className={styles.grid}>
          {blogs.map((blog, index) => (
            <BlogItem
              key={`${blog?.id}-${index}`}
              image={blog?.data?.featured_image}
              category={blog?.data?.category}
              date={blog?.data?.publish_date}
              title={blog?.data?.title}
              description={blog?.data?.short_description}
              button_label="Read More"
              button_link={`/blog/${blog?.uid}`}
              variant="card"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularBlog;
