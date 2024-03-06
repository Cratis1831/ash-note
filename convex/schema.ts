import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tasks: defineTable({
    isCompleted: v.boolean(),
    title: v.string(),
    description: v.string(),
    userId: v.string(),
    slug: v.string(),
  })
    .index("by_isCompleted", ["isCompleted"])
    .index("by_userId", ["userId"])
    .index("by_slug", ["slug"]),
});
