import { SliceComponentProps } from "@prismicio/react";
import { Content } from "@prismicio/client";
import BlogItem from "@/app/components/Blog";
import styles from "../../app/common-style/components/Recentblog.module.scss";

export type RecentBlogProps =
  SliceComponentProps<Content.RecentblogSlice>;

const RecentBlog = ({ slice }: RecentBlogProps) => {
  const items = slice.primary.item ?? [];

  if (!items.length) return null;

  const [hero, ...cards] = items;

  return (
   <section className={styles.section}>
  <div className={styles.container}>
    <div className={styles.header}>
      <h2 className={styles.sectionTitle}>
        {slice.primary.section_title}
      </h2>

    
        <a
          className={styles.viewAllBtn}
          href="#"
        >
          {slice.primary.view_all_label}
        </a>

    </div>

    {hero && (
      <BlogItem
        image={hero.image}
        category={hero.category}
        date={hero.date}
        title={hero.title}
        description={hero.description}
        button_label={hero.button_label}
        button_link={hero.button_link}
        variant="recentHero"
      />
    )}

    <div className={styles.grid}>
      {cards.map((item, index) => (
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

export default RecentBlog;