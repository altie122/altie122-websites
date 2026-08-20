import {query} from './_generated/server';
import {paginationOptsValidator} from 'convex/server';
import {v} from 'convex/values';
import type {Doc, Id} from './_generated/dataModel';
import {ReturnBuilder} from '@altie122/utils/api';

const response = new ReturnBuilder('links');

export const getLinksPage = query({
    handler: async (ctx) => {
        const responseBuilder = response.function('getLinksPage');
        const links = await ctx.db.query('links').filter(q => q.not(q.eq(q.field('type'), 'hidden'))).collect();
        return responseBuilder.success({
            status: 'OK',
            data: links,
            statusCode: 'S',
            id: 1,
        });
    },
});

export const getLinksPagePaginated = query({
    args: {
        paginationOpts: paginationOptsValidator,
    },
    handler: async (ctx, args) => {
        return await ctx.db.query('links').filter(q => q.not(q.eq(q.field('type'), 'hidden'))).paginate(args.paginationOpts);
    },
});

export const getLinkById = query({
    args: {
        id: v.string(),
    },
    handler: async (ctx, args) => {
        let link: Doc<'links'> | null = null;

        async function get_other_id() {
            async function get_alternate_links() {
                let temp: Doc<'links'> | null;
                try {
                    const entry = await ctx.db.query('linksAlternateIds').withIndex('by_alternateId', q => q.eq('id', args.id)).unique();
                    if (entry) {
                        temp = await ctx.db.get('links', entry.link);
                    } else {
                        temp = null;
                    }
                } catch (e) {
                    console.log(e);
                    temp = null;
                }
                return temp;
            }

            let temp: Doc<'links'> | null;
            try {
                temp = await ctx.db.query('links').withIndex('by_mainId', q => q.eq('mainId', args.id)).unique();
                if (!temp) {
                    return await get_alternate_links();
                }
            } catch (e) {
                console.error(e);
                return await get_alternate_links();
            }
            return temp;
        }

        if (args.id.length === 32) {
            try {
                link = await ctx.db.get('links', args.id as Id<'links'>);
                if (!link) {
                    link = await get_other_id();
                }
            } catch (e) {
                console.error(e);
                link = await get_other_id();
            }
        } else {
            link = await get_other_id();
        }
        return link;
    },
});
