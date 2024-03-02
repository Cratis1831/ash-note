"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import NoteCard from "./NoteCard";
import { Plus } from "lucide-react";

function Dashboard() {
  const tasks = useQuery(api.tasks.getTaskList);
  const addTask = useMutation(api.tasks.addTask);
  return (
    <div>
      <div className="flex items-center justify-center mx-auto mt-4">
        <Button onClick={() => addTask({ text: "My New Task" })}>
          <Plus className="mr-2" /> Create Note
        </Button>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mx-auto mt-8 p-8">
        {tasks === undefined ? (
          <p>Loading tasks...</p>
        ) : (
          tasks?.map((task) => (
            <div key={task._id} className="">
              <NoteCard
                text={task.text}
                isCompleted={task.isCompleted}
                creationTime={task._creationTime}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;
