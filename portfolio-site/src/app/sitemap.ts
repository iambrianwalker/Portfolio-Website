import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://brianwalker.dev",
      lastModified: new Date(),
    },
    {
      url: "https://brianwalker.dev/about",
      lastModified: new Date(),
    },
    {
      url: "https://brianwalker.dev/projects",
      lastModified: new Date(),
    },
    {
      url: "https://brianwalker.dev/skills",
      lastModified: new Date(),
    },
    {
      url: "https://brianwalker.dev/contact",
      lastModified: new Date(),
    },
  ];
}
