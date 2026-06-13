import type { Metadata } from "next";

export const siteConfig = {
  title: "Brian Walker | Software Developer",
  description:
    "Portfolio for Brian Walker, a Computer Science student and software developer focused on modern web apps, AWS, and thoughtful product experiences.",
  url: "https://brianwalker.dev",
  keywords: ["Brian Walker", "Software Developer", "Computer Science Student", "AWS", "Portfolio"],
};

export function buildMetadata({
  title,
  description,
  path = "",
}: {
  title?: string;
  description?: string;
  path?: string;
} = {}): Metadata {
  const fullTitle = title ? `${title} | Brian Walker` : siteConfig.title;
  const fullDescription = description ?? siteConfig.description;
  const canonicalUrl = `${siteConfig.url}${path}`;

  return {
    title: fullTitle,
    description: fullDescription,
    keywords: siteConfig.keywords,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url: canonicalUrl,
      siteName: "Brian Walker Portfolio",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: fullDescription,
    },
  };
}
