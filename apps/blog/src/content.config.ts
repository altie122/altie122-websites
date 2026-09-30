import {defineCollection, reference} from 'astro:content';
import {z} from 'astro/zod';
import {glob, file} from 'astro/loaders';

const posts = defineCollection({
    loader: glob({pattern: '**/*.mdx', base: './src/content/posts'}),
    schema: ({image}) => z.object({
        title: z.string(),
        pubDate: z.date(),
        lastUpdated: z.date().optional(),
        description: z.string(),
        authors: z.array(reference('authors')),
        image: z.object({
            cover: image(),
            alt: z.string(),
        }),
        relatedPosts: z.array(reference('posts')).optional(),
        relatedLinks: z.array(z.object({
            title: z.string(),
            url: z.string(),
            icon: z.string().default('/icon.png'),
            description: z.string().optional(),
        })).optional(),
        tags: z.array(z.string()),
        isDraft: z.boolean().optional().default(false),
        isHidden: z.boolean().optional().default(false),
    }),
});

const authors = defineCollection({
    loader: glob({pattern: '**/*.json', base: './src/content/authors'}),
    schema: ({image}) => z.object({
        name: z.string(),
        pfp: image(),
        website: z.object({
            url: z.url(),
            title: z.string(),
        }).optional(),
    }),
});

export const collections = {posts, authors};
