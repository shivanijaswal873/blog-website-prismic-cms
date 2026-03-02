"use client";
import React from "react";
import styles from "./Input.module.scss";

interface InputProps {
  label?: string;
  type?: string;
  name: string;
  placeholder?: string;
  textarea?: boolean;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export default function Input({
  label,
  type = "text",
  name,
  placeholder,
  textarea = false,
  value,
  onChange,
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
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          placeholder={placeholder}
          className={styles.inputField}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
}