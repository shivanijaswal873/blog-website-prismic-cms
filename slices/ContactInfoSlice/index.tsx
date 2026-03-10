import { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";
import styles from "./ContactInfo.module.scss";

const ContactInfoSlice = ({ slice }: SliceComponentProps<any>) => {
  const { section_title, section_description, items } = slice?.primary;

  return (
    <section className={styles.contact__section}>
      <div className={styles.contact__container}>
        <div className={styles.contact__header}>
          {section_title?.length > 0 && (
            <div className={styles.contact__title}>
              <PrismicRichText field={section_title} />
            </div>
          )}

          {section_description?.length > 0 && (
            <div className={styles.contact__subtitle}>
              <PrismicRichText field={section_description} />
            </div>
          )}
        </div>

        {items?.length > 0 && (
          <div className={styles.contact__grid}>
            {items.map((item: any, index: number) => {
              const value = item?.description || "";

              const isEmail = value.includes("@");

              return (
                <div key={index} className={styles.contact__card}>
                  {item?.icons?.url && (
                    <div className={styles.contact__icon}>
                      <img
                        src={item.icons.url}
                        alt={item.icons.alt || "icon"}
                        className={styles.contact__iconImg}
                      />
                    </div>
                  )}

                  {item?.title && (
                    <div className={styles.contact__heading}>
                      {item.title}
                    </div>
                  )}

                  {value && (
                    <div className={styles.contact__description}>
                      {isEmail ? (
                        <a href={`mailto:${value}`}>{value}</a>
                      ) : (
                        <a href={`tel:${value}`}>{value}</a>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactInfoSlice;