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
      if (!query?.trim()) {
        setResults([]);
        return;
      }

      try {
        setLoading(true);

        const response = await client.getAllByType("blog", {
          filters: [prismic?.filter?.fulltext("my.blog.title", query)],
        });

        setResults(response as Blog[]);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e?.key === "Escape") onClose();
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
    <div className={styles.searchModal__overlay} onClick={handleOutsideClick}>
      <div
        className={styles.searchModal__modal}
        ref={modalRef}
        onClick={(e) => e?.stopPropagation()}
      >
        <div className={styles.searchModal__header}>
          {(data?.title || data?.subtitle) && (
            <div className={styles.searchModal__headerContent}>
              {data?.title && (
                <h2 className={styles.searchModal__title}>{data?.title}</h2>
              )}

              {data?.subtitle && (
                <p className={styles.searchModal__subtitle}>{data?.subtitle}</p>
              )}
            </div>
          )}

          <FiX className={styles.searchModal__closeIcon} onClick={onClose} />
        </div>

        <div className={styles.searchModal__searchBox}>
          <FiSearch className={styles.searchModal__searchIcon} />

          <input
            className={styles.searchModal__searchInput}
            type="text"
            placeholder={data?.placeholder || "Search..."}
            value={query}
            onChange={(e) => setQuery(e?.target?.value)}
            autoFocus
          />
        </div>

        <div className={styles.searchModal__results}>
          {loading && <p>Searching...</p>}

          {!loading && query && results?.length > 0 && (
            <>
              <p className={styles.searchModal__resultCount}>
                {results.length} result{results.length !== 1 && "s"} found
              </p>

              {results?.map(
                (blog) =>
                  blog?.data?.title && (
                    <Link
                      key={blog?.id}
                      href={`/blog/${blog?.uid}`}
                      className={styles.searchModal__resultItem}
                      onClick={onClose}
                    >
                      {blog?.data?.title}
                    </Link>
                  ),
              )}
            </>
          )}

          {!loading && query && results?.length === 0 && (
            <div className={styles.searchModal__emptyState}>
              {data?.empty_title && (
                <h4 className={styles.searchModal__emptyTitle}>
                  {data?.empty_title}
                </h4>
              )}

              {data?.empty_description && (
                <p className={styles.searchModal__emptyText}>
                  {data?.empty_description}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
