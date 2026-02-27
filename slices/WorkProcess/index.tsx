import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";
import styles from "../../app/common-style/components/WorkProcess.module.scss";

export type WorkProcessProps = SliceComponentProps<Content.WorkProcessSlice>;

const WorkProcess = ({ slice }: WorkProcessProps) => {
  const { section_label, section_title, section_description, items } =
    slice?.primary;

  return (
    <section className={styles.work}>
      <div className={styles.work__container}>
        {section_label && (
          <span className={styles.work__label}>{section_label}</span>
        )}

        {section_title && (
          <div className={styles.work__title}>
            <PrismicRichText field={section_title} />
          </div>
        )}

        {section_description && (
          <div className={styles.work__desc}>
            <PrismicRichText field={section_description} />
          </div>
        )}

        <div className={styles.work__grid}>
          {items.map((item, index) => (
            <div
              key={index}
              className={`${styles.work__card} ${
                item.highlight_card ? styles.highlight : ""
              }`}
            >
              <span className={styles.work__number}>{item?.step_number}</span>

              <h3 className={styles.work__cardTitle}>{item?.step_title}</h3>

              <div className={styles.work__cardDesc}>
                <PrismicRichText field={item?.step_description} />
              </div>

              {item?.highlight_card && item?.button && (
                <a href="#" className={styles.work__btn}>
                  Learn More
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkProcess;
