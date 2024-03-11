import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tasks: defineTable({
    isCompleted: v.boolean(),
    title: v.string(),
    description: v.string(),
    userId: v.string(),
    slug: v.string(),
    status: v.string(),
    notebook: v.optional(v.string()),
  })
    .index("by_isCompleted", ["isCompleted"])
    .index("by_userId", ["userId"])
    .index("by_slug", ["slug"]),

  // one notebook can hold multiple "tasks" from the "tasks" table, only for the user who created the notebook and the "tasks"
  notebooks: defineTable({
    title: v.string(),
    userId: v.string(),
  }).index("by_userId", ["userId"]),
});
