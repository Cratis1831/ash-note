import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const addNotebook = mutation({
  args: {
    title: v.string(),
    userId: v.string(),
  },
  handler: async (ctx, { title, userId }) => {
    const task = await ctx.db.insert("notebooks", {
      title,
      userId,
    });
    return task;
  },
});

export const getNotebookCounts = query({
  args: {},
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const tasks = await ctx.db
      .query("tasks")

      .filter((q) => q.eq(q.field("userId"), userId))
      .collect();

    return tasks.length;
  },
});

export const getNotebooks = query({
  args: {},
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const notebooks = await ctx.db
      .query("notebooks")
      .withIndex("by_userId")
      .filter((q) => q.eq(q.field("userId"), userId))
      .order("desc")
      .collect();
    return notebooks;
  },
});
