import { SliceComponentProps } from "@prismicio/react";
import { Content } from "@prismicio/client";
import BlogItem from "../../app/components/blog";
import styles from "../../app/common-style/components/Recentblog.module.scss";
import { PrismicNextLink } from "@prismicio/next";

export type PopularBlogProps = SliceComponentProps<Content.PopularBlogSlice>;

const PopularBlog = ({ slice }: PopularBlogProps) => {
  const items = slice.primary.item ?? [];

  if (!items.length) return null;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>{slice.primary.section_title}</h2>

          <PrismicNextLink
            field={slice.primary.view_all_link}
            className={styles.viewAllBtn}
          >
            {slice.primary.view_all_label}
          </PrismicNextLink>
        </div>

        <div className={styles.grid}>
          {items.map((item, index) => (
            <BlogItem
              key={index}
              image={item.image}
              category={item.category}
              date={item.date}
              title={item.title}
              description={item.description}
              button_label={item.button_label}
              button_link={item.button_link}
              variant="card"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularBlog;
