import { getStructuredDataJsonLd } from "@/lib/structuredData";

export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredDataJsonLd()),
      }}
    />
  );
}