import {defineSchema, defineTable} from "convex/server";
import {v} from "convex/values";

export default defineSchema({
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
});
