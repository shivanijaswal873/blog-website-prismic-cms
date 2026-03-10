"use client";

import { useState } from "react";
import {
  SliceComponentProps,
  PrismicImage,
  PrismicRichText,
} from "@prismicio/react";
import styles from "./ContentForm.module.scss";
import Input from "../../app/components/common/Input";

type FormDataType = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const ContactFormSlice = ({ slice }: SliceComponentProps<any>) => {
  const { map_image, form_title, map } = slice?.primary;

  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState("");

  const fields: {
    label: string;
    name: keyof FormDataType;
    type?: string;
    placeholder: string;
    textarea?: boolean;
  }[] = [
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = (): string | null => {
    if (!formData.name.trim()) return "Name is required";
    if (!formData.email.trim()) return "Email is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return "Invalid email format";

    if (!formData.message.trim()) return "Message is required";

    return null;
  };

  const showSnackbar = (message: string) => {
    setSnackbar(message);
    setTimeout(() => setSnackbar(""), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const error = validateForm();
    if (error) {
      showSnackbar(error);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          ...formData,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showSnackbar("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        showSnackbar(data.message || "Something went wrong");
      }
    } catch {
      showSnackbar("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.contactForm__wrapper}>
      <div className={styles.contactForm__mapWrapper}>
        {map && (
          <iframe
            className={styles.contactForm__map}
            title="Google Map"
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps?q=${map.latitude},${map.longitude}&z=14&output=embed`}
          />
        )}
      </div>

      <div className={styles.contactForm__card}>
        <div className={styles.contactForm__title}>
          <PrismicRichText field={form_title} />
        </div>

        <form className={styles.contactForm__grid} onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div
              key={field.name}
              className={field.textarea ? styles.contactForm__fullWidth : ""}
            >
              <Input
                {...field}
                value={formData[field.name]}
                onChange={handleChange}
              />
            </div>
          ))}

          <div className={styles.contactForm__buttonWrapper}>
            <button
              className={styles.contactForm__submitButton}
              type="submit"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>

      {snackbar && (
        <div className={styles.contactForm__snackbar}>{snackbar}</div>
      )}
    </section>
  );
};

export default ContactFormSlice;
