"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FiX, FiSearch } from "react-icons/fi";
import styles from "../common-style/components/SearchModal.module.scss";
import { createClient } from "@/prismicio";
import * as prismic from "@prismicio/client";

interface SearchSettings {
  data: {
    title: string;
    subtitle: string;
    placeholder: string;
    empty_title: string;
    empty_description: string;
  };
}

interface Blog {
  id: string;
  uid: string;
  data: {
    title: string;
  };
}

interface SearchModalProps {
  searchSettings?: SearchSettings;
  onClose: () => void;
}

export default function SearchModal({
  searchSettings,
  onClose,
}: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const client = createClient();

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      try {
        setLoading(true);

        const response = await client.getAllByType("blog", {
          filters: [prismic.filter.fulltext("my.blog.title", query)],
        });

        setResults(response as Blog[]);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!searchSettings) return null;

  const { data } = searchSettings;

  return (
    <div className={styles.overlay} onClick={handleOutsideClick}>
      <div
        className={styles.modal}
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>{data.title}</h2>
            <p className={styles.subtitle}>{data.subtitle}</p>
          </div>

          <FiX className={styles.closeIcon} onClick={onClose} />
        </div>

        <div className={styles.searchBox}>
          <FiSearch className={styles.searchIcon} />
          <input
            className={styles.searchInput}
            type="text"
            placeholder={data.placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </div>

        <div className={styles.results}>
          {loading && <p>Searching...</p>}

          {!loading && query && results.length > 0 && (
            <>
              <p className={styles.resultCount}>
                {results.length} result
                {results.length !== 1 } found
              </p>

              {results.map((blog) => (
                <Link
                  key={blog.id}
                  href={`/blog/${blog.uid}`}
                  className={styles.resultItem}
                  onClick={onClose}
                >
                  {blog.data.title}
                </Link>
              ))}
            </>
          )}

          {!loading && query && results.length === 0 && (
            <div className={styles.emptyState}>
              <h4 className={styles.emptyTitle}>{data.empty_title}</h4>
              <p className={styles.emptyText}>{data.empty_description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
