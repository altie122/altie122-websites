import { defineCollection, reference } from "astro:content";
import { z } from "astro/zod";
import { glob, file } from "astro/loaders";

const links = defineCollection({
  loader: glob({
    pattern: "**/*.json",
    base: "./src/content/links",
  }),
  schema: ({ image }) =>
    z.object({
      type: z.union([
        z.literal("external"),
        z.literal("internal"),
        z.literal("hidden"),
      ]),
      sameAs: z.boolean().default(true),
      icon: image().optional(),
      title: z.string(),
      url: z.url(),
      description: z.string(),
    }),
});

export const collections = { links };
