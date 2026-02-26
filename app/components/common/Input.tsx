"use client";
import styles from "./Input.module.scss";

interface InputProps {
  label?: string;
  type?: string;
  name: string;
  placeholder?: string;
  textarea?: boolean;
}

export default function Input({
  label,
  type = "text",
  name,
  placeholder,
  textarea = false,
}: InputProps) {
  return (
    <div className={styles.inputGroup}>
      {label && (
        <label className={styles.inputLabel} htmlFor={name}>
          {label}
        </label>
      )}

      {textarea ? (
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          className={styles.textareaField}
          rows={5}
        />
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          placeholder={placeholder}
          className={styles.inputField}
        />
      )}
    </div>
  );
}
