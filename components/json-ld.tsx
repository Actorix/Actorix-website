/* Renders structured data. Server component — the JSON ships in the initial
   HTML so crawlers see it without executing JavaScript. */
export default function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // schema objects are built by us in lib/seo.ts, never from user input
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
