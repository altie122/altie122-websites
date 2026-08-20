import {defineSchema, defineTable} from "convex/server";
import {v} from "convex/values";

export default defineSchema({
    users: defineTable({
        authId: v.string(),
        username: v.string(),
        email: v.string(),
        role: v.union(v.literal("User"), v.literal("Mod"), v.literal("Admin"), v.literal("RootAdmin")),
        pfp: v.string(),
        badges: v.array(v.id("badges")),
    })
        .index("by_authId", ["authId"]),
    links: defineTable({
        type: v.union(v.literal("external"), v.literal("internal"), v.literal("hidden")),
        mainId: v.string(),
        sameAs: v.boolean(),
        icon: v.optional(v.string()),
        title: v.string(),
        url: v.string(),
        description: v.string(),
    })
        .index("by_mainId", ["mainId"])
        .index("by_type", ["type"]),
    linksAlternateIds: defineTable({
        link: v.id("links"),
        id: v.string(),
    })
        .index("by_link", ["link"])
        .index("by_alternateId", ["id"]),
    blogPosts: defineTable({
        title: v.string(),
        pubDate: v.number(),
        lastUpdated: v.number(),
        description: v.string(),
    }),
    badges: defineTable({
        icon: v.string(),
        title: v.string(),
        description: v.string(),
    }),
});
