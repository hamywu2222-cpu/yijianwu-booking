type PageJsonLdProps = {
  data: Record<string, unknown>;
};

export function PageJsonLd({ data }: PageJsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}