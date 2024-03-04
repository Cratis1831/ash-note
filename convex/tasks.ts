import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tasks").collect();
  },
});

export const addTask = mutation({
  args: { title: v.string(), description: v.string(), userId: v.string() },
  handler: async (ctx, { title, description, userId }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new ConvexError("User not authenticated");
    }
    if (identity.subject !== userId) {
      throw new ConvexError("User not authorized");
    }
    const task = await ctx.db.insert("tasks", {
      title,
      description,
      isCompleted: false,
      userId,
    });
    return task;
  },
});

export const deleteTask = mutation({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const toggleCompleteTask = mutation({
  args: { id: v.id("tasks") },
  handler: async (ctx, { id }) => {
    const task = await ctx.db.get(id);
    if (!task) {
      throw new Error(`No task found with id ${id}`);
    }
    await ctx.db.patch(id, { isCompleted: !task.isCompleted });
  },
});

export const getTaskList = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const tasks = await ctx.db
      .query("tasks")
      .withIndex("by_userId")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .order("desc")
      .collect();
    return tasks;
  },
});
