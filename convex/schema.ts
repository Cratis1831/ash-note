import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tasks: defineTable({
    isCompleted: v.boolean(),
    title: v.string(),
    description: v.string(),
  }).index("by_isCompleted", ["isCompleted"]),
});
