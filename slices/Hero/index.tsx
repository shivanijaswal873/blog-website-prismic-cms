import { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";
import { asLink } from "@prismicio/client";
import Image from "next/image";
import Link from "next/link";

export type HeroProps = SliceComponentProps<any>;

const Hero = ({ slice }: HeroProps) => {
  const data = slice.primary;

  return (
    <section className="hero">
      <div className="hero-inner">

        <div className="hero-content">
          {data.featured_label && (
            <span className="hero-label">
              {data.featured_label}
            </span>
          )}

          {data.featured_title && (
            <div className="hero-title">
              <PrismicRichText field={data.featured_title} />
            </div>
          )}

          {data.featured_description && (
            <div className="hero-desc">
              <PrismicRichText field={data.featured_description} />
            </div>
          )}

          {data.featured_button_text && (
            <Link
              href={asLink(data.featured_button_link) || "/"}
              className="hero-btn"
            >
              {data.featured_button_text}
            </Link>
          )}
        </div>

        {data.featured_image?.url && (
          <div className="hero-image">
            <Image
              src={data.featured_image.url}
              alt={data.featured_image.alt || "Hero Image"}
              width={560}
              height={560}
            />
          </div>
        )}

      </div>
    </section>
  );
};

export default Hero;