import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tasks").collect();
  },
});

export const addTask = mutation({
  args: { title: v.string(), description: v.string() },
  handler: async (ctx, { title, description }) => {
    const task = await ctx.db.insert("tasks", {
      title,
      description,
      isCompleted: false,
    });
    return task;
  },
});

export const getTaskList = query({
  args: {},
  handler: async (ctx, args) => {
    const tasks = await ctx.db.query("tasks").order("desc").collect();
    return tasks;
  },
});
