import { createFileRoute } from "@tanstack/react-router";

import { ContactSection } from "@/components/site-chrome";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact iTechLounge | Discuss your project" },
      {
        name: "description",
        content:
          "Tell iTechLounge what you want to improve or build. Start with the business problem — no technical specification needed.",
      },
      { property: "og:title", content: "Contact iTechLounge" },
      { property: "og:description", content: "Start a conversation about your project." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://itechlounge.co.uk/contact" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "keywords", content: "contact iTechLounge, software development quote, project enquiry, digital agency contact" },
    ],
    links: [{ rel: "canonical", href: "https://itechlounge.co.uk/contact" }],
  }),
  component: () => <ContactSection full />,
});
