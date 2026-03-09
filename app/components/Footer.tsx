import { createClient } from "@/prismicio";
import { PrismicImage, PrismicRichText } from "@prismicio/react";
import Link from "next/link";
import styles from "../common-style/components/Footer.module.scss";

export default async function Footer() {
  const client = createClient();
  const footer = await client.getSingle("footer_settings");

  const { logo, footer_links, social_links, copyright_text } = footer?.data;

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        {logo && (
          <div className={styles.footer__logo}>
            <PrismicImage field={logo} />
          </div>
        )}

        <ul className={styles.footer__links}>
          {footer_links?.map((item, index) => (
            <li key={index}>
              <Link href="/#">{item?.label}</Link>
            </li>
          ))}
        </ul>

        <div className={styles.footer__social}>
          {social_links?.map((item, index) => (
            <Link key={index} href="/#">
              <PrismicImage field={item?.icon} />
            </Link>
          ))}
        </div>

        <div className={styles.footer__divider}></div>

        {copyright_text && (
          <div className={styles.footer__copy}>
            <PrismicRichText field={copyright_text} />
          </div>
        )}
      </div>
    </footer>
  );
}
