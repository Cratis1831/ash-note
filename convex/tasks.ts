import { query } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tasks").collect();
  },
});

// Return the last 100 tasks in a given task list.
export const getTaskList = query({
  args: {},
  handler: async (ctx, args) => {
    const tasks = await ctx.db.query("tasks").order("desc").collect();
    return tasks;
  },
});
