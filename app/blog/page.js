import { createClient } from "@/prismicio";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import { PrismicRichText } from "@prismicio/react";
import styles from "./page.module.scss";

export default async function BlogPage() {
  const client = createClient();
  const page = await client.getSingle("blog_page");

  return (
    <div>
    <section className={styles.blogHero}>
  <p className={styles.blogHeroBlog}>{page.data.blog}</p>

  <h1 className={styles.blogHeroTitle}>
    {page.data.title}
  </h1>

  <div className={styles.blogHeroDesc}>
    <PrismicRichText field={page.data.description} />
  </div>
</section>

      <SliceZone slices={page.data.slices} components={components} />
    </div>
  );
}
