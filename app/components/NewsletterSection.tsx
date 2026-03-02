"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/prismicio";
import { PrismicRichText } from "@prismicio/react";
import styles from "../common-style/components/Newsletter.module.scss";
import Button from "./common/Button";

export default function Newsletter() {
  const [newsletter, setNewsletter] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const client = createClient();
        const data = await client.getSingle("newsletter_settings");
        setNewsletter(data);
      } catch {
        setNewsletter(null);
      }
    };

    fetchData();
  }, []);

  if (!newsletter) return null;

  const {
    title,
    placeholder,
    button_label,
    description,
    top_wave_image,
    bottom_wave_imag,
  } = newsletter.data;


  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const sendEmail = async () => {
    const trimmedEmail = email.trim();

    if (!isValidEmail(trimmedEmail)) {
      showSnackbar("Please enter a valid email");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showSnackbar("Email Sent Successfully");
        setEmail("");
      } else {
        showSnackbar(data.message || "Something went wrong");
      }
    } catch {
      showSnackbar("Server error");
    } finally {
      setLoading(false);
    }
  };

  const showSnackbar = (message: string) => {
    setSnackbar(message);
    setTimeout(() => setSnackbar(""), 3000);
  };

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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendEmail()}
            placeholder={placeholder || "Your Email"}
            className={styles.input}
          />

          <Button
            label={loading ? "Sending..." : button_label || "Get started"}
            variant="primary"
            className={styles.button}
            onClick={sendEmail}
          />
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

      {snackbar && (
        <div className={styles.snackbar}>
          {snackbar}
        </div>
      )}
    </section>
  );
}