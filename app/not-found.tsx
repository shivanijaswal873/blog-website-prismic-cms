import { createClient } from "@/prismicio";
import { PrismicRichText, PrismicImage } from "@prismicio/react";
import styles from "./common-style/components/NotFound.module.scss";
import Button from "./components/common/Button";
import { asLink } from "@prismicio/client";

export default async function NotFound() {
  const client = createClient();

  let page;

  try {
    page = await client.getSingle("error_page");
  } catch (error) {
    return <div>404 Page Not Configured</div>;
  }

  return (
    <div className={styles.notFound__container}>
      <div className={styles.notFound__card}>
        {page?.data?.background_image && (
          <div className={styles.notFound__waveWrapper}>
            <PrismicImage
              field={page?.data?.background_image}
              className={styles.notFound__waveImage}
            />
          </div>
        )}

        <h1 className={styles.notFound__code}>404</h1>

        <h2 className={styles.notFound__title}>{page?.data?.title}</h2>

        <div className={styles.notFound__description}>
          <PrismicRichText field={page?.data?.description} />
        </div>

        {page?.data?.button_label && page?.data?.button_link && (
          <Button
            label={page?.data?.button_label}
            href={asLink(page?.data?.button_link) || "/"}
            variant={page?.data?.button_link?.variant}
            className={styles.notFound__button}
          />
        )}
      </div>
    </div>
  );
}
