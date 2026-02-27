import { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";
import styles from "../../app/common-style/components/ContactInfo.module.scss";

const ContactInfoSlice = ({ slice }: SliceComponentProps<any>) => {
  const { section_title, section_description, items } = slice?.primary;

  return (
    <section className={styles.contactSection}>
      <div className={styles.contactContainer}>
        <div className={styles.contactHeader}>
          <div className={styles.contactTitle}>
            <PrismicRichText field={section_title} />
          </div>

          <div className={styles.contactSubtitle}>
            <PrismicRichText field={section_description} />
          </div>
        </div>

        <div className={styles.contactGrid}>
          {items?.map((item: any, index: number) => (
            <div key={index} className={styles.contactCard}>
              <div className={styles.contactIcon}>
                {item.icons?.url && (
                  <img
                    src={item?.icons?.url}
                    alt={item?.icons?.alt || "icon"}
                    className={styles.iconImg}
                  />
                )}
              </div>

              <div className={styles.cardHeading}>{item?.title}</div>

              <div className={styles.cardDescription}>{item?.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactInfoSlice;
