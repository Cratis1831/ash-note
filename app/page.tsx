"use client";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export default function Home() {
  const tasks = useQuery(api.tasks.getTaskList);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        {tasks?.map((task) => (
          <div key={task._id}>
            {task.text} <input type="checkbox" checked={task.isCompleted} />
          </div>
        ))}
      </div>
    </main>
  );
}
