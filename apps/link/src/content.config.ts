import {defineCollection} from "astro:content";
import {z} from "astro/zod";
import {glob} from "astro/loaders";

interface LinkData {
    type: "external" | "internal" | "hidden";
    idOverride?: string;
    sameAs?: boolean;
    title: string;
    url: string;
    description: string;
    icon?: string;
}

interface GenerateLinkIdOptions {
    entry: string
    base: URL
    data: Record<string, unknown>
}

function generateLinkId(options: GenerateLinkIdOptions) {
    const id = options.entry;
    const data = options.data as unknown as LinkData;
    let finalId: string;
    if (data.idOverride) {
        finalId = data.idOverride;
    } else {
        const idAsArray = id.split(".");
        idAsArray.pop();
        finalId = idAsArray.join(".");
    }
    console.log(`Generated Id: ${finalId} for file ${id} (${data.title})`);
    return finalId;
}

const links = defineCollection({
    loader: glob({
        pattern: "**/*.json",
        base: "./src/content/links",
        generateId: generateLinkId,
    }),
    schema: ({image}) =>
        z.object({
            type: z.union([
                z.literal("external"),
                z.literal("internal"),
                z.literal("hidden"),
            ]),
            idOverride: z.string().min(1).optional(),
            sameAs: z.boolean().default(true),
            icon: image().optional(),
            title: z.string(),
            url: z.url(),
            description: z.string(),
        }),
});

export const collections = {links};
