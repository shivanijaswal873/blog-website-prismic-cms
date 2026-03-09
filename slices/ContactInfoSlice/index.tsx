import { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";
import styles from "./ContactInfo.module.scss";

const ContactInfoSlice = ({ slice }: SliceComponentProps<any>) => {
  const { section_title, section_description, items } = slice?.primary;

  return (
    <section className={styles.contact__section}>
      <div className={styles.contact__container}>
        <div className={styles.contact__header}>
          <div className={styles.contact__title}>
            <PrismicRichText field={section_title} />
          </div>

          <div className={styles.contact__subtitle}>
            <PrismicRichText field={section_description} />
          </div>
        </div>

        <div className={styles.contact__grid}>
          {items?.map((item: any, index: number) => (
            <div key={index} className={styles.contact__card}>
              <div className={styles.contact__icon}>
                {item.icons?.url && (
                  <img
                    src={item?.icons?.url}
                    alt={item?.icons?.alt || "icon"}
                    className={styles.contact__iconImg}
                  />
                )}
              </div>

              <div className={styles.contact__heading}>{item?.title}</div>

              <div className={styles.contact__description}>
                {item?.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactInfoSlice;
