import { MutationCtx, QueryCtx, mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import slugify from "slugify";

const createSlug = (title: string) => {
  return slugify(title, {
    lower: true,
    strict: true,
    remove: /[*+~.()'"!:@]/g,
  });
};

export async function handleAccess(ctx: QueryCtx | MutationCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    return null;
  }

  return identity;
}

export const addTask = mutation({
  args: { title: v.string(), description: v.string(), userId: v.string() },
  handler: async (ctx, { title, description, userId }) => {
    const hasAccess = await handleAccess(ctx);

    if (!hasAccess) {
      return null;
    }

    const task = await ctx.db.insert("tasks", {
      title,
      description,
      isCompleted: false,
      userId,
      slug: createSlug(title),
    });
    return task;
  },
});

export const deleteTask = mutation({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    const hasAccess = await handleAccess(ctx);

    if (!hasAccess) {
      return null;
    }
    await ctx.db.delete(args.id);
  },
});

export const toggleCompleteTask = mutation({
  args: { id: v.id("tasks") },
  handler: async (ctx, { id }) => {
    const hasAccess = await handleAccess(ctx);

    if (!hasAccess) {
      return null;
    }

    const task = await ctx.db.get(id);
    if (!task) {
      throw new Error(`No task found with id ${id}`);
    }
    await ctx.db.patch(id, { isCompleted: !task.isCompleted });
  },
});

export const updateTask = mutation({
  args: {
    id: v.id("tasks"),
    title: v.string(),
    description: v.string(),
    isCompleted: v.boolean(),
  },
  handler: async (ctx, { id, title, description, isCompleted }) => {
    const hasAccess = await handleAccess(ctx);

    if (!hasAccess) {
      return null;
    }
    const task = await ctx.db.get(id);
    if (!task) {
      throw new Error(`No task found with id ${id}`);
    }
    await ctx.db.patch(id, { title, description, isCompleted });
  },
});

export const getTaskList = query({
  args: {},
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const tasks = await ctx.db
      .query("tasks")
      .withIndex("by_userId")
      .filter((q) => q.eq(q.field("userId"), userId))
      .order("desc")
      .collect();
    return tasks;
  },
});

export const getTaskBySlug = query({
  args: { slug: v.string(), userId: v.string() },
  handler: async (ctx, args) => {
    const hasAccess = await handleAccess(ctx);

    if (!hasAccess) {
      return null;
    }

    const task = await ctx.db
      .query("tasks")
      .withIndex("by_userId")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .filter((q) => q.eq(q.field("slug"), args.slug))
      .first();

    if (!task) {
      return null;
    }
    return task;
  },
});

export const getTask = query({
  args: { id: v.id("tasks"), userId: v.string() },
  handler: async (ctx, args) => {
    const hasAccess = await handleAccess(ctx);

    if (!hasAccess) {
      return null;
    }

    const task = await ctx.db
      .query("tasks")
      .withIndex("by_userId")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .filter((q) => q.eq(q.field("_id"), args.id))
      .first();

    if (!task) {
      return null;
    }
    return task;
  },
});
