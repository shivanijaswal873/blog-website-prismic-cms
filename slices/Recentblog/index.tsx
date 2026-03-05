import { SliceComponentProps } from "@prismicio/react";
import { asLink, Content } from "@prismicio/client";
import { createClient } from "@/prismicio";
import BlogItem from "@/app/components/blog";
import styles from "../../app/common-style/components/Recentblog.module.scss";
import Button from "@/app/components/common/Button";

export type RecentBlogProps = SliceComponentProps<Content.RecentblogSlice>;

const RecentBlog = async ({ slice }: RecentBlogProps) => {
  const client = createClient();
  const { view_all_label, view_all_link } = slice?.primary;
  const blogs = await client.getAllByType("blog", {
    orderings: {
      field: "document.first_publication_date",
      direction: "desc",
    },
  });

  if (!blogs || blogs.length === 0) return null;

  const hero = blogs[0];

  const cards = blogs?.slice(1);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>{slice.primary.section_title}</h2>
          {view_all_label && view_all_link && (
            <Button
              label={view_all_label}
              href={asLink(view_all_link) || "/"}
              variant={view_all_link?.variant}
              className={styles.viewAllBtn}
            />
          )}
        </div>
        {hero && (
          <BlogItem
            image={hero?.data?.featured_image}
            category={hero?.data?.category}
            date={hero?.data?.publish_date}
            title={hero?.data?.title}
            description={hero?.data?.short_description}
            button_label="Read More"
            button_link={`/blog/${hero?.uid}`}
            variant="recentHero"
          />
        )}
        <div className={styles.grid}>
          {cards.map((item) => (
            <BlogItem
              key={item?.id}
              image={item?.data?.featured_image}
              category={item?.data?.category}
              date={item?.data?.publish_date}
              title={item?.data?.title}
              description={item?.data?.short_description}
              button_label="Read More"
              button_link={`/blog/${item?.uid}`}
              variant="card"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentBlog;
