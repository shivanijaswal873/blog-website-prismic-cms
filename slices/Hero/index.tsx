import Button from "@/app/components/common/Button";
import { createClient } from "@/prismicio";
import { asLink } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import Image from "next/image";
import styles from "./Hero.module.scss";

export default async function Hero() {
  const client = createClient();
  const page = await client.getSingle("homepage");

  const heroSlice = page.data.slices?.find(
    (slice: any) => slice?.slice_type === "hero",
  );

  if (!heroSlice) return null;

  const {
    featured_label,
    featured_title,
    featured_description,
    featured_button_text,
    featured_button_link,
    featured_image,
    top_wave_image,
    bottom_wave_image,
  } = heroSlice?.primary as any;

  return (
    <section className={styles.hero}>
      
      {top_wave_image?.url && (
        <Image
          src={top_wave_image.url}
          alt={top_wave_image.alt || "wave"}
          width={top_wave_image.dimensions.width}
          height={top_wave_image.dimensions.height}
          className={`${styles.hero__wave} ${styles["hero__wave--top"]}`}
        />
      )}

      {bottom_wave_image?.url && (
        <Image
          src={bottom_wave_image.url}
          alt={bottom_wave_image.alt || "wave"}
          width={bottom_wave_image.dimensions.width}
          height={bottom_wave_image.dimensions.height}
          className={`${styles.hero__wave} ${styles["hero__wave--bottom"]}`}
        />
      )}

      <div className={styles.hero__inner}>
        <div className={styles.hero__content}>

          {featured_label && (
            <span className={styles.hero__label}>{featured_label}</span>
          )}

          {featured_title && featured_title?.length > 0 && (
            <div className={styles.hero__title}>
              <PrismicRichText field={featured_title} />
            </div>
          )}

          {featured_description && featured_description?.length > 0 && (
            <div className={styles.hero__desc}>
              <PrismicRichText field={featured_description} />
            </div>
          )}

          {featured_button_text && featured_button_link && (
            <Button
              label={featured_button_text}
              href={asLink(featured_button_link) || "/"}
              variant={featured_button_link?.variant}
              className={styles.hero__btn}
            />
          )}
        </div>

        <div className={styles.hero__image}>
          {featured_image?.url && (
            <Image
              src={featured_image.url}
              alt={featured_image.alt || "Featured"}
              width={608}
              height={576}
              className={styles.hero__img}
              priority
            />
          )}
        </div>
      </div>

    </section>
  );
}