"use client";

import { SliceComponentProps } from "@prismicio/react";
import { PrismicImage, PrismicRichText } from "@prismicio/react";
import styles from "../../app/common-style/components/ContentForm.module.scss";
import Input from "../../app/components/common/Input";

const ContactFormSlice = ({ slice }: SliceComponentProps<any>) => {
  const { map_image, form_title } = slice.primary;

  const fields = [
    {
      label: "Name",
      name: "name",
      type: "text",
      placeholder: "Enter your name",
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Enter your email",
    },
    {
      label: "Phone",
      name: "phone",
      type: "text",
      placeholder: "Enter phone number",
    },
    {
      label: "Subject",
      name: "subject",
      type: "text",
      placeholder: "Enter subject",
    },
    {
      label: "Message",
      name: "message",
      textarea: true,
      placeholder: "Write your message",
    },
  ];

  return (
    <section className={styles.contactFormWrapper}>
      <div className={styles.mapWrapper}>
        {map_image?.url && (
          <PrismicImage field={map_image} className={styles.mapImage} />
        )}
      </div>

      <div className={styles.formCard}>
        <div className={styles.formTitle}>
          <PrismicRichText field={form_title} />
        </div>

        <form className={styles.formGrid}>
          {fields.map((field, index) => (
            <div key={index} className={field.textarea ? styles.fullWidth : ""}>
              <Input {...field} />
            </div>
          ))}

          <div className={styles.buttonWrapper}>
            <button className={styles.submitButton} type="submit">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactFormSlice;
