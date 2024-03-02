"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";

function Dashboard() {
  const tasks = useQuery(api.tasks.getTaskList);
  const addTask = useMutation(api.tasks.addTask);
  return (
    <div>
      {tasks === undefined ? (
        <p>Loading tasks...</p>
      ) : (
        tasks?.map((task) => (
          <div key={task._id}>
            {task.text} <input type="checkbox" checked={task.isCompleted} />
          </div>
        ))
      )}

      <Button onClick={() => addTask({ text: "My New Task" })}>Add</Button>
    </div>
  );
}

export default Dashboard;
