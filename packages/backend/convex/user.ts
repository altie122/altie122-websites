import {internalQuery, query} from './_generated/server';
import {authKit} from './auth';
import {v} from 'convex/values';
import type {Doc} from './_generated/dataModel';

export const getCurrentUserInternal = internalQuery({
    args: {},
    handler: async (ctx, _args) => {
        const authUser = await authKit.getAuthUser(ctx);
        if (!authUser) {
            throw new Error('User is not signed in.');
        }
        const user = await ctx.db.query('users').withIndex('by_authId', q => q.eq('authId', authUser.id)).unique();
        if (!user) {
            throw new Error('User not found.');
        }
        return user;
    },
});

export const getCurrentUser = query({
    args: {
        returnBadges: v.optional(v.boolean()),
    },
    handler: async (ctx, args) => {
        const authUser = await authKit.getAuthUser(ctx);
        if (!authUser) {
            throw new Error('User not authenticated!');
        }
        const user = await ctx.db.query('users').withIndex('by_authId', q => q.eq('authId', authUser.id)).unique();
        if (!user) {
            throw new Error('User not found!');
        }
        const returnBadges = user.badges.length === 0 ? false : args.returnBadges ?? false;
        if (!returnBadges) {
            return user;
        }
        const userBadges: Doc<'badges'>[] = [];
        for (const badgeId of user.badges) {
            const badge = await ctx.db.get('badges', badgeId);
            if (badge) {
                userBadges.push(badge);
            }
        }
        return {
            ...user,
            userBadges,
        };
    },
});

export const getUserById = query({
    args: {
        id: v.id('users'),
        returnBadges: v.optional(v.boolean()),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db.get('users', args.id);
        if (!user) {
            throw new Error('User not found!');
        }
        const returnBadges = user.badges.length === 0 ? false : args.returnBadges ?? false;
        if (!returnBadges) {
            return user;
        }
        const userBadges: Doc<'badges'>[] = [];
        for (const badgeId of user.badges) {
            const badge = await ctx.db.get('badges', badgeId);
            if (badge) {
                userBadges.push(badge);
            }
        }
        return {
            ...user,
            userBadges,
        };
    },
});
