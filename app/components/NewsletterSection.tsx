import { createClient } from "@/prismicio";
import { PrismicRichText } from "@prismicio/react";
import styles from "../common-style/components/Newsletter.module.scss";

export default async function Newsletter() {
  const client = createClient();

  const newsletter = await client
    .getSingle("newsletter_settings")
    .catch(() => null);

  if (!newsletter) return null;

  const {
    title,
    placeholder,
    button_label,
    description,
    top_wave_image,
    bottom_wave_imag,
  } = newsletter.data as any;

  return (
    <section className={styles.newsletter}>
      {top_wave_image?.url && (
        <img
          src={top_wave_image.url}
          alt="top wave"
          className={styles.waveTop}
        />
      )}

      <div className={styles.content}>
        <div className={styles.heading}>
          <PrismicRichText field={title} />
        </div>

        <div className={styles.form}>
          <input
            type="email"
            placeholder={placeholder || "Your Email"}
            className={styles.input}
          />
          <button className={styles.button}>
            {button_label || "Get started"}
          </button>
        </div>

        <div className={styles.description}>
          <PrismicRichText field={description} />
        </div>
      </div>

      {bottom_wave_imag?.url && (
        <img
          src={bottom_wave_imag.url}
          alt="bottom wave"
          className={styles.waveBottom}
        />
      )}
    </section>
  );
}
