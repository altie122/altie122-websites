import {internalQuery, query} from './_generated/server';
import {authKit} from './auth';
import {v} from 'convex/values';
import type {Doc} from './_generated/dataModel';
import {ReturnBuilder} from '@altie122/utils/api';

const response = new ReturnBuilder('user');

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
        const responseBuilder = response.function('getCurrentUser');
        const authUser = await authKit.getAuthUser(ctx);
        if (!authUser) {
            return responseBuilder.error({
                status: 'Unauthenticated',
                message: 'User is not signed in.',
                statusCode: 'U',
                id: 1,
            });
        }
        const user = await ctx.db.query('users').withIndex('by_authId', q => q.eq('authId', authUser.id)).unique();
        if (!user) {
            return responseBuilder.error({
                status: 'Error',
                message: 'User not found.',
                statusCode: 'N',
                id: 1,
            });
        }
        const returnBadges = user.badges.length === 0 ? false : args.returnBadges ?? false;
        if (!returnBadges) {
            return responseBuilder.success({
                status: 'OK',
                data: user,
                statusCode: 'S',
                id: 1,
            });
        }
        const userBadges: Doc<'badges'>[] = [];
        for (const badgeId of user.badges) {
            const badge = await ctx.db.get('badges', badgeId);
            if (badge) {
                userBadges.push(badge);
            }
        }
        return responseBuilder.success({
            status: 'OK',
            data: {
                ...user,
                badges: userBadges,
            },
            statusCode: 'S',
            id: 2,
        });
    },
});

export const getUserById = query({
    args: {
        id: v.id('users'),
        returnBadges: v.optional(v.boolean()),
    },
    handler: async (ctx, args) => {
        const responseBuilder = response.function('getUserById');
        const user = await ctx.db.get('users', args.id);
        if (!user) {
            return responseBuilder.error({
                status: 'Error',
                message: 'User not found.',
                statusCode: 'N',
                id: 1,
            });
        }
        const returnBadges = user.badges.length === 0 ? false : args.returnBadges ?? false;
        if (!returnBadges) {
            return responseBuilder.success({
                status: 'OK',
                data: user,
                statusCode: 'S',
                id: 1,
            });
        }
        const userBadges: Doc<'badges'>[] = [];
        for (const badgeId of user.badges) {
            const badge = await ctx.db.get('badges', badgeId);
            if (badge) {
                userBadges.push(badge);
            }
        }
        return responseBuilder.success({
            status: 'OK',
            data: {
                ...user,
                badges: userBadges,
            },
            statusCode: 'S',
            id: 2,
        });
    },
});
