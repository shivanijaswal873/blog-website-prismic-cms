import { PrismicNextLink } from "@prismicio/next";

interface Props {
  label?: string | null;
  field: any;
}

export default function Button({ label, field }: Props) {
  if (!label || !field) return null;

  return (
    <PrismicNextLink field={field} className="btn-primary">
      {label}
    </PrismicNextLink>
  );
}