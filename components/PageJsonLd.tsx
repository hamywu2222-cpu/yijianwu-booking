type PageJsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export function PageJsonLd({ data }: PageJsonLdProps) {
  const items = Array.isArray(data) ? data : [data];

  return (
    <>
      {items.map((item) => (
        <script
          key={JSON.stringify(item).slice(0, 48)}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}