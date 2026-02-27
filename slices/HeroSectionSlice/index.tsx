import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText, PrismicImage } from "@prismicio/react";
import styles from "../../app/common-style/components/HeroSectionSlice.module.scss";
export type HeroSectionSliceProps =
  SliceComponentProps<Content.HeroSectionSliceSlice>;

const HeroSectionSlice = ({ slice }: HeroSectionSliceProps) => {
  const { small_heading, main_title, description, hero_image } = slice?.primary;

  return (
    <section className={styles.hero}>
      <div className={styles.hero__container}>
        <div className={styles.hero__content}>
          {small_heading && (
            <span className={styles.hero__label}>{small_heading}</span>
          )}

          {main_title && (
            <div className={styles.hero__title}>
              <PrismicRichText field={main_title} />
            </div>
          )}

          {description && (
            <div className={styles.hero__desc}>
              <PrismicRichText field={description} />
            </div>
          )}
        </div>

        {hero_image && (
          <div className={styles.hero__image}>
            <PrismicImage field={hero_image} />
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSectionSlice;
