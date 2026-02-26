import { createClient } from "@/prismicio";
import { PrismicRichText, PrismicLink, PrismicImage } from "@prismicio/react";
import styles from "./common-style/components/NotFound.module.scss";

export default async function NotFound() {
  const client = createClient();

  let page;

  try {
    page = await client.getSingle("error_page");
  } catch (error) {
    return <div>404 Page Not Configured</div>;
  }

  return (
<div className={styles.container}>
  <div className={styles.card}>

    {page.data.background_image && (
      <div className={styles.waveWrapper}>
        <PrismicImage
          field={page.data.background_image}
          className={styles.waveImage}
        />
      </div>
    )}

    <h1 className="error">404</h1>

    <h2>{page.data.title}</h2>

    <div className={styles.description}>
      <PrismicRichText field={page.data.description} />
    </div>

    {page.data.button_link && (
      <PrismicLink
        field={page.data.button_link}
        className={styles.button}
      >
        {page.data.button_label}
      </PrismicLink>
    )}

  </div>
</div>
  );
}